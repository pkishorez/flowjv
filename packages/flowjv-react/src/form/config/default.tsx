import React from "react";
import { TextField } from "../ui/custom/components/TextField";
import { Checkbox } from "../ui/custom/components/Checkbox";
import { SelectField } from "../ui/custom/components/Select";
import { RadioGroup } from "../ui/custom/components/Radio";
import { IFormUIConfigFunc } from ".";
import { AnimatePresence } from "framer-motion";
import { AnimateHeight } from "../ui/custom/components/utils/Animate";

export const defaultConfig: IFormUIConfigFunc = ({
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
					{...ui}
					label={schema.label}
					onFocus={setTouch}
					checked={ui.value}
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
							label={schema.label}
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
