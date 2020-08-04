import React from "react";
import { TextField } from "./components/TextField";
import { Checkbox } from "./components/Checkbox";
import { IFormUIConfigFunc } from "flowjv-react";
import { AnimatePresence } from "framer-motion";
import { AnimateHeight } from "./components/utils/Animate";
import { RadioGroup } from "./components/Radio";
import { Select } from "./components/Select";

export const config: IFormUIConfigFunc = ({
	schema,
	ui: { setTouch, onChange, ...ui },
	children,
}: any) => {
	switch (schema.type) {
		case "string":
		case "number": {
			let { uiType } = schema;
			uiType = uiType || (schema.type === "number" ? "number" : "text");
			return (
				<TextField
					label={schema.label}
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
					label={schema.label}
					onFocus={setTouch}
					onChange={(e) => onChange?.(e.target.checked)}
					{...ui}
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
							label={schema.label}
							onFocus={setTouch}
							onChange={(v) => onChange?.(v)}
							options={schema.items}
						/>
					);
				}
				case "select": {
					return (
						<Select
							{...ui}
							label={schema.label || "No Label"}
							value={ui.value}
							onChange={(e) => onChange?.(e.target.value)}
							onFocus={setTouch}
							options={schema.items}
						/>
					);
				}
				default:
					return null;
			}
		}
		case "conditionWrapper": {
			return (
				<AnimatePresence exitBeforeEnter>
					{children && (
						<AnimateHeight
							key={schema.animKey}
							animateOnMount
							isVisible
						>
							{children}
						</AnimateHeight>
					)}
				</AnimatePresence>
			);
		}
		case "custom": {
			return null;
		}
		default: {
			return null;
		}
	}
};
