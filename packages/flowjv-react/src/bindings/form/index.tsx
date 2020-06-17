import React from "react";
import {
	IFlowSchema,
	execJSONExpression,
	validateJSONFlow,
	IAtom,
} from "flowjv";
import { gett, sett, unsett } from "./utils";
import { IFormUIConfigFunc } from "./config";
import { lookup } from "flowjv";
import {
	IObjectIfBlock,
	IObjectSwitchBlock,
} from "flowjv/dist/jsonflow/blocks/object";
import cx from "classnames";

interface IFlowJVProps {
	schema: IFlowSchema;
	defaultValue?: any;
	context?: any;
	className?: string;
	value?: any;
	onChange?: (v: { isValid: boolean; value: any }) => void;
	onSubmit?: (value: { value: any; isValid: boolean }) => void;
	customUI?: boolean;
	formProps?: React.DetailedHTMLProps<
		React.FormHTMLAttributes<HTMLFormElement>,
		HTMLFormElement
	>;
}

interface IFlowJVState {
	value: any;
	isValid: boolean;
	touchMap: {
		[id: string]: boolean;
	};
	errorMap: {
		[id: string]: string[];
	};
}

interface IFormFieldValue {
	value: any;
	errors: string[];
	success: boolean;
}
export const formContext = React.createContext<{
	setValue: (refPath: string, value: any) => void;
	setTouch: (refPath: string) => void;
	getValue: (refPath: string) => IFormFieldValue;
	getContext: () => { data: any; context: any; schema: IFlowSchema };
	renderAtom: (ref: string[]) => null | JSX.Element;
	renderBlockById: (blockId: string) => null | JSX.Element;
}>({} as any);

export const setupFlowJV = (Config: IFormUIConfigFunc) => {
	return class extends React.Component<IFlowJVProps, IFlowJVState> {
		refSet: Set<string> = new Set();
		constructor(props) {
			super(props);
			this.state = {
				value: this.props.defaultValue,
				isValid: false,
				touchMap: {},
				errorMap: {},
			};
		}
		componentDidMount() {
			this.validate(this.getValue(), () => {
				this.props.onChange?.({
					value: this.getValue(),
					isValid: this.state.isValid,
				});
			});
		}

		getValue = (key = "") => {
			if (this.props.value) {
				return gett(this.props.value, key);
			}
			return gett(this.state.value, key);
		};
		setValue = (key, value) => {
			if (this.props.value) {
				const newvalue = sett(this.props.value, key, value);
				this.validate(newvalue, () => {
					this.props.onChange?.({
						value: newvalue,
						isValid: this.state.isValid,
					});
				});
			} else {
				const newvalue = sett(this.state.value, key, value);
				this.setState({
					value: newvalue,
				});
				this.validate(this.state.value, () =>
					this.props.onChange?.({
						value: newvalue,
						isValid: this.state.isValid,
					})
				);
			}
		};
		unsetValue = (key: string) => () => {
			if (this.props.value) {
				this.props.onChange?.({
					value: unsett(this.props.value, key),
					isValid: this.state.isValid,
				});
			} else {
				this.setState({
					value: unsett(this.state.value, key),
				});
			}
		};
		setTouch = (refPath: string) => {
			this.refSet.add(refPath);
			return () => {
				if (!this.state.touchMap[refPath]) {
					this.setState((state) => ({
						touchMap: {
							...state.touchMap,
							[refPath]: true,
						},
					}));
					this.validate(
						this.props.value ? this.props.value : this.state.value
					);
				}
			};
		};
		touchAll = () => {
			this.setState({
				touchMap: Array.from(this.refSet).reduce(
					(agg, v) => ({ ...agg, [v]: true }),
					{}
				),
			});
		};
		validate = (value: any, func?: () => void) => {
			const result = validateJSONFlow(this.props.schema, {
				context: this.props.context,
				data: value,
				options: { aggressive: true },
			});
			if (!result.isValid) {
				const errorMap = result.errors.reduce(
					(agg, v) => ({ ...agg, [v.refPath.join(".")]: v.msgs }),
					{}
				);
				this.setState(
					{
						isValid: false,
						errorMap,
					},
					func
				);
			} else {
				this.setState(
					{
						isValid: true,
						errorMap: {},
					},
					func
				);
			}
		};

		getContext = () => {
			return {
				data: this.getValue(),
				context: this.props.context,
				schema: this.props.schema,
			};
		};
		getRefPathValue = (refPath: string): IFormFieldValue => {
			let value;
			if (this.props.value) {
				value = gett(this.props.value, refPath);
			} else {
				value = gett(this.state.value, refPath);
			}
			const isTouched = this.state.touchMap[refPath];
			const errors = this.state.errorMap[refPath] || [];
			return {
				value,
				errors: isTouched ? errors : [],
				success: isTouched ? errors.length === 0 : false,
			};
		};
		renderAtom = (ref: string[]) => {
			const refPath = ref.join(".");
			const schema = lookup.atom(this.props.schema, ref);
			if (schema === null) return null;
			const { errors, success, value } = this.getRefPathValue(refPath);
			return (
				<Config
					key={refPath}
					schema={schema}
					ui={{
						className: "pt-3",
						label: schema.label,
						errors,
						success,
						value,
						onChange: (v) => {
							this.setValue(refPath, v);
						},
						onUnmount: this.unsetValue(refPath),
						setTouch: this.setTouch(refPath),
					}}
				/>
			);
		};
		renderBlockBySchema = (
			schema: IObjectIfBlock | IObjectSwitchBlock,
			ref: string[]
		) => {
			const refPath = ref.join(".");
			switch (schema.type) {
				case "if": {
					const cond = !!execJSONExpression(schema.cond, {
						data: this.getValue(),
						context: this.props.context,
						ref: this.getValue(refPath),
					});
					const flow = cond ? schema.true : schema.false;
					return (
						<Config
							key={refPath + "$if"}
							schema={{ type: "conditionWrapper", animKey: "if" }}
							ui={{
								errors: [],
								success: false,
							}}
						>
							{flow &&
								this.renderFlow(
									{
										type: "object",
										properties: flow,
									},
									ref
								)}
						</Config>
					);
				}
				case "switch": {
					const cond = execJSONExpression(schema.cond, {
						data: this.getValue(),
						context: this.props.context,
						ref: this.getValue(ref.join(".")),
					}) as any;
					const flow = schema.cases[cond];
					return (
						<Config
							key={`${refPath}.$case`}
							schema={{ type: "conditionWrapper", animKey: cond }}
							ui={{
								errors: [],
								success: false,
							}}
						>
							{flow &&
								this.renderFlow(
									{ type: "object", properties: flow },
									ref
								)}
						</Config>
					);
				}
			}
			return null;
		};
		renderBlockById = (blockId: string) => {
			const { block, ref } = lookup.block(this.props.schema, blockId);
			if (!block) {
				return null;
			}
			return this.renderBlockBySchema(block, ref);
		};
		renderFlow = (schema: IFlowSchema | IAtom, ref: string[]) => {
			switch (schema.type) {
				case "object": {
					// Loop over all the elements.
					return schema.properties.map((objconfig) => {
						switch (objconfig.type) {
							case "if":
							case "switch": {
								return this.renderBlockBySchema(objconfig, ref);
							}
							default: {
								return this.renderFlow(objconfig, [
									...ref,
									objconfig.key,
								]);
							}
						}
					});
				}
			}

			switch (schema.type) {
				case "enum":
				case "boolean":
				case "number":
				case "string": {
					return this.renderAtom(ref);
				}
			}
		};
		render() {
			const { formProps, schema, className } = this.props;
			return (
				<formContext.Provider
					value={{
						renderAtom: this.renderAtom,
						renderBlockById: this.renderBlockById,
						getValue: this.getRefPathValue,
						getContext: this.getContext,
						setValue: this.setValue,
						setTouch: this.setTouch,
					}}
				>
					<form
						{...formProps}
						className={cx(className, "ke-flowjv-form")}
						onSubmit={(e) => {
							e.preventDefault();
							this.touchAll();
							const value = this.getValue();
							this.validate(value, () => {
								this.props.onSubmit?.({
									value,
									isValid: this.state.isValid,
								});
							});
						}}
					>
						{this.props.customUI
							? null
							: this.renderFlow(schema, [])}
						{this.props.children}
					</form>
				</formContext.Provider>
			);
		}
	};
};
