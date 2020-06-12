import React from "react";
import { IFlowSchema, execJSONExpression, validateJSONFlow } from "flowjv";
import { gett, sett, unsett } from "./utils";
import { IUIConfig } from "./config";

interface IFlowJVProps {
	schema: IFlowSchema;
	defaultValue?: any;
	context?: any;
	className?: string;
	value?: any;
	onChange?: (v: { isValid: boolean; value: any }) => void;
	onSubmit?: (value: { value: any; isValid: boolean }) => void;
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
export const setupFlowJV = (Config: IUIConfig) => {
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

		getValue(key = "") {
			if (this.props.value) {
				return gett(this.props.value, key);
			}
			return gett(this.state.value, key);
		}
		setValue(key, value) {
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
		}
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
		renderFlow = (schema: IFlowSchema, ref: string[]) => {
			const refPath = ref.join(".");
			switch (schema.type) {
				case "object": {
					// Loop over all the elements.
					return schema.properties.map((objconfig) => {
						switch (objconfig.type) {
							case "if": {
								const cond = !!execJSONExpression(
									objconfig.cond,
									{
										data: this.getValue(),
										context: this.props.context,
										ref: this.getValue(ref.join(".")),
									}
								);
								const flow = cond
									? objconfig.true
									: objconfig.false;
								return (
									<Config
										key={refPath + "$if"}
										schema={{ type: "conditionWrapper" }}
										ui={{
											errors: [],
											success: false,
											// className: "ml-10",
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
								break;
							}
							case "switch": {
								const cond = execJSONExpression(
									objconfig.cond,
									{
										data: this.getValue(),
										context: this.props.context,
										ref: this.getValue(ref.join(".")),
									}
								) as any;
								const flow = objconfig.cases[cond];
								if (flow) {
									return this.renderFlow(
										{ type: "object", properties: flow },
										ref
									);
								}
								break;
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
				case "array": {
					return <h3>Not implemented yet.</h3>;
				}
			}

			const touched = !!this.state.touchMap[refPath];

			switch (schema.type) {
				case "enum":
				case "boolean":
				case "number":
				case "string": {
					// Render the components here!
					const errors = this.state.errorMap[refPath] || [];
					return (
						<Config
							key={refPath}
							schema={schema}
							ui={{
								className: "pt-3",
								label: schema.label,
								errors: touched ? errors : [],
								success: touched ? !errors.length : false,
								value: this.getValue(refPath),
								onChange: (v) => {
									this.setValue(refPath, v);
								},
								onUnmount: this.unsetValue(refPath),
								setTouch: this.setTouch(refPath),
							}}
						/>
					);
				}
			}
		};
		render() {
			const { formProps, schema } = this.props;
			return (
				<form
					{...formProps}
					onSubmit={(e) => {
						e.preventDefault();
						this.touchAll();
						this.validate(this.getValue(), () => {
							this.props.onSubmit?.({
								value: this.getValue(),
								isValid: this.state.isValid,
							});
						});
					}}
				>
					{this.renderFlow(schema, [])}
					{this.props.children}
				</form>
			);
		}
	};
};
