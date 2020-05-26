import React, { useState, useRef, useEffect } from "react";
import { IFlowSchema, execJSONExpression, IValidation } from "flowjv";
import get from "lodash/get";
import set from "lodash/set";
import cloneDeep from "lodash/cloneDeep";
import { defaultConfig } from "./config";
import unset from "lodash/unset";
import { RadioGroup } from "./components/Radio";

interface IFlowJVProps<IContext> {
	schema: IFlowSchema;
	defaultValue?: any;
	context?: IContext;
	className?: string;
	value?: any;
	onChange?: (value: any) => void;
	onSubmit?: (value: any) => void;
	formProps?: React.DetailedHTMLProps<
		React.FormHTMLAttributes<HTMLFormElement>,
		HTMLFormElement
	>;
}

export const setupFlowJV = (Config = defaultConfig) => {
	return function <IContext = any>({
		schema,
		defaultValue,
		context,
		value,
		onChange,
		onSubmit,
		formProps,
	}: IFlowJVProps<IContext>) {
		const [formValue, _setFormValue] = useState(defaultValue);
		const [touchMap, _setTouchMap] = useState<any>({});

		// Using ref of value to avoid async nature of JS error.
		const valueRef = useRef<any>(value);
		useEffect(() => {
			valueRef.current = value;
		}, [value]);
		const setTouch = (refPath: string) => {
			_setTouchMap({ ...touchMap, [refPath]: true });
		};
		const setValue = (key: string, v: any) => {
			if (value) {
				const clonedValue = cloneDeep(valueRef.current);
				const newValue = set(clonedValue, key, v);
				valueRef.current = newValue;
				onChange?.(newValue);
				console.log("SET VLAUE ", JSON.stringify(newValue));
			} else {
				_setFormValue(set(formValue, key, v));
			}
		};
		const unsetValue = (key: string) => {
			if (value) {
				const clonedValue = cloneDeep(valueRef.current);
				unset(clonedValue, key);
				valueRef.current = clonedValue;
				onChange?.(cloneDeep(clonedValue));
				console.log(JSON.stringify(clonedValue));
			} else {
				unset(formValue, key);
				_setFormValue(cloneDeep(formValue));
			}
		};
		const getValue = (key: string = "", def = "") => {
			if (key === "") {
				return value ? valueRef.current : formValue;
			}
			return value
				? get(valueRef.current, key, def)
				: get(formValue, key, def);
		};
		function render(schema: IFlowSchema, ref: string[] = []) {
			switch (schema.type) {
				case "object": {
					// Loop over all the elements.
					return schema.properties.map((objconfig) => {
						switch (objconfig.type) {
							case "if": {
								const cond = !!execJSONExpression(
									objconfig.cond,
									{
										data: getValue(),
										context,
										ref: getValue(ref.join(".")),
									}
								);
								const flow = cond
									? objconfig.true
									: objconfig.false;
								if (flow) {
									return render(
										{ type: "object", properties: flow },
										ref
									);
								}
								break;
							}
							default: {
								return render(objconfig, [
									...ref,
									objconfig.key,
								]);
							}
						}
					});
				}
			}
			const validate = (validations: IValidation[], refValue: any) =>
				(
					validations?.map(({ logic, err }) =>
						!!execJSONExpression(logic, {
							data: getValue(),
							context,
							ref: refValue,
						})
							? null
							: err || null
					) || []
				).filter((v) => v !== null) as string[];
			const refValue = getValue(ref.join(""));
			const refPath = ref.join(".");
			const touched = touchMap[refPath];

			let validations = schema.validations || [];
			switch (schema.type) {
				case "enum":
				case "boolean":
				case "number":
				case "string": {
					// Render the components here!
					const errors = validate(validations || [], refValue);
					return (
						<Config
							key={refPath}
							schema={schema}
							ui={{
								label: schema.label,
								errors: touched ? errors : [],
								success: touched ? !errors.length : false,
								value: getValue(refPath),
								onChange: (v) => {
									setValue(refPath, v);
								},
								onUnmount: () => {
									unsetValue(refPath);
								},
								setTouch: () => {
									setTouch(refPath);
								},
							}}
						/>
					);
				}
			}
		}
		return (
			<form
				{...formProps}
				onSubmit={() => {
					onSubmit?.(valueRef.current);
				}}
			>
				{render(schema)}
			</form>
		);
	};
};
