import React from "react";
import { TextField } from "./components/TextField";
import { IPrimitiveFlow } from "flowjv";
import { Checkbox } from "./components/Checkbox";
import { SelectField } from "./components/Select";

export interface IUIConfig {
	errors: string[];
	success?: boolean;
	label?: string;
	value: any;
	onChange: (value: any) => void;
	setTouch: () => void;
	onUnmount: () => void;
}
export const defaultConfig = ({
	schema,
	ui: { setTouch, onChange, ...ui },
}: {
	schema: IPrimitiveFlow;
	ui: IUIConfig;
}) => {
	switch (schema.type) {
		case "string": {
			return (
				<TextField
					{...ui}
					type="text"
					onFocus={setTouch}
					onChange={(e) => onChange(e.target.value)}
				/>
			);
		}
		case "number": {
			return (
				<TextField
					type="number"
					onChange={(e) => onChange(e.target.value)}
					onFocus={setTouch}
					{...ui}
				/>
			);
		}
		case "boolean": {
			return (
				<Checkbox
					{...ui}
					onFocus={setTouch}
					onChange={(e) => onChange(e.target.checked)}
				/>
			);
		}
		case "enum": {
			return (
				<SelectField
					{...ui}
					onFocus={setTouch}
					onChange={(e) => onChange(e.target.value)}
					options={schema.items}
				/>
			);
		}
	}
};
