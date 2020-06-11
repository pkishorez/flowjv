import React from "react";
import { TextField } from "./components/TextField";
import { Checkbox } from "./components/Checkbox";
import { SelectField } from "./components/Select";
import { RadioGroup } from "./components/Radio";
import { IUIConfig } from "./config";
import { AnimatePresence } from "framer-motion";
import { AnimateHeight } from "./components/utils/Animate";

export const defaultConfig: IUIConfig = ({
	schema,
	ui: { setTouch, onChange, ...ui },
	children,
}) => {
	switch (schema.type) {
		case "string":
		case "number": {
			let { uiType } = schema;
			uiType = uiType || (schema.type === "number" ? "number" : "text");
			return (
				<TextField
					type={uiType}
					onFocus={setTouch}
					onChange={(e) => onChange?.(e.target.value)}
					{...ui}
				/>
			);
		}
		case "boolean": {
			return (
				<Checkbox
					{...ui}
					onFocus={setTouch}
					onChange={(e) => onChange?.(e.target.checked)}
				/>
			);
		}
		case "enum": {
			const { uiType = "select" } = schema;
			switch (uiType) {
				case "radio": {
					return (
						<RadioGroup
							{...ui}
							inputProps={{
								onFocus: setTouch,
							}}
							onFocus={setTouch}
							onChange={(v) => onChange?.(v)}
							options={schema.items}
						/>
					);
				}
				case "select": {
					return (
						<SelectField
							{...ui}
							label={schema.label}
							onFocus={setTouch}
							onChange={(e) => onChange?.(e.target.value)}
							options={schema.items}
						/>
					);
				}
			}
		}
		case "conditionWrapper": {
			return (
				<AnimatePresence>
					{children && (
						<AnimateHeight animateOnMount isVisible>
							{children}
						</AnimateHeight>
					)}
				</AnimatePresence>
			);
		}
	}
};
