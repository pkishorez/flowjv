import React, { useState } from "react";
import { IJSONFlow, execJSONExpression } from "flowjv";
import get from "lodash/get";
import set from "lodash/set";
import deepClone from "lodash/cloneDeep";
import { defaultConfig, IConfig } from "./config";

interface IFlowJVProps<IContext> {
	schema: IJSONFlow;
	defaultValue: any;
	context?: IContext;
	className?: string;
}

export const setupFlowJV = (config: IConfig = defaultConfig) => {
	return function <IContext = any>({
		schema,
		defaultValue,
		context,
	}: IFlowJVProps<IContext>) {
		const [formValue, setFormValue] = useState(defaultValue);
		const [touchMap, _setTouchMap] = useState<any>({});
		const setTouch = (refPath: string) => {
			_setTouchMap({ ...touchMap, [refPath]: true });
		};
		function render(schema: IJSONFlow, ref: string[] = []) {
			switch (schema.type) {
				case "object": {
					// Loop over all the elements.
					return schema.properties.map((v) => {
						switch (v.type) {
							default: {
								return render(v, [...ref, v.key]);
							}
						}
					});
				}
				case "boolean":
				case "number":
				case "string": {
					// Render the components here!

					const refValue = get(formValue, ref.join("."));
					const errors = (
						schema.validations?.map(({ logic, err }) =>
							!!execJSONExpression(logic, {
								data: formValue,
								context,
								ref: refValue,
							})
								? null
								: err || null
						) || []
					).filter((v) => v !== null) as string[];
					const refPath = ref.join(".");
					const touched = touchMap[refPath];
					const Component = config.string;
					return (
						<Component
							key={refPath}
							label={schema.label}
							errors={touched ? errors : []}
							success={touched ? !errors.length : false}
							type="text"
							value={get(formValue, refPath, "")}
							onFocus={(e) => setTouch(refPath)}
							onChange={(e) => {
								const value = set(
									deepClone(formValue),
									refPath,
									e.target.value
								);
								setTouch(refPath);
								setFormValue(value);
							}}
						/>
					);
				}
			}
		}
		return <div>{render(schema)}</div>;
	};
};
