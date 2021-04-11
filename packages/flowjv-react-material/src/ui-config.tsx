import React from "react";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { setupFlowJV } from "flowjv-react";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import Checkbox from "@material-ui/core/Checkbox";
import {
	FormControlLabel,
	FormLabel,
	InputLabel,
	Radio,
	RadioGroup,
} from "@material-ui/core";
import { UI } from "./type";
import { ArrayUI } from "./components/array";

export const { FlowJVForm, flowSchema } = setupFlowJV<
	UI.StringUI,
	UI.NumberUI,
	UI.BooleanUI,
	UI.EnumUI,
	UI.CustomUI,
	UI.ArrayUI
>((props) => {
	switch (props.type) {
		case "propertyWrapper": {
			return (
				<div style={{ marginTop: 15, position: "relative" }}>
					{props.children}
				</div>
			);
		}
		case "array": {
			return <ArrayUI config={props} />;
		}
		case "simple": {
			const {
				schema,
				errors,
				value,
				setValue,
				onTouch,
				touched,
				path,
				registerRef: register,
			} = props;
			switch (schema.type) {
				case "string": {
					return (
						<TextField
							fullWidth
							autoFocus={schema.ui?.autoFocus}
							variant="filled"
							label={schema.label}
							error={touched ? !!errors.length : false}
							helperText={touched && errors.join("\n")}
							type={schema.ui?.type ?? "text"}
							placeholder={schema.label ?? path.join(".")}
							value={value ?? ""}
							onChange={(e) => setValue(path, e.target.value)}
							onFocus={() => onTouch(true)}
							inputRef={(r) => {
								register({
									setFocus: () => r?.focus(),
								});
							}}
						/>
					);
				}
				case "number": {
					return (
						<TextField
							fullWidth
							autoFocus={schema.ui?.autoFocus}
							variant="filled"
							label={schema.label}
							error={touched ? !!errors.length : false}
							helperText={touched && errors.join("\n")}
							type="number"
							placeholder={path.join(".")}
							value={value ?? ""}
							onChange={(e) => setValue(path, e.target.value)}
							onFocus={() => onTouch(true)}
							ref={(r) => {
								register({
									setFocus: () => r?.focus(),
								});
							}}
						/>
					);
				}
				case "enum": {
					const id = `select-${path.join(".")}`;
					return schema.ui?.type === "select" ? (
						<FormControl
							key="select"
							variant="filled"
							error={touched ? !!errors.length : false}
							style={{ display: "block" }}
						>
							<InputLabel id={id}>{schema.label}</InputLabel>
							<Select
								fullWidth
								labelId={id}
								autoFocus={schema.ui?.autoFocus}
								value={value ?? ""}
								onFocus={() => onTouch(true)}
								onChange={(e) => {
									setValue(path, e.target.value);
								}}
								inputRef={(r) =>
									register({
										setFocus: () => r?.focus(),
									})
								}
							>
								{schema.items.map(({ value, label }) => (
									<MenuItem key={value} value={value}>
										{label ?? value}
									</MenuItem>
								))}
							</Select>
							{touched && (
								<FormHelperText>
									{errors.join("\n")}
								</FormHelperText>
							)}
						</FormControl>
					) : schema.ui?.type ? (
						<FormControl key="radio" component="fieldset">
							{schema.label && (
								<FormLabel component="legend">
									{schema.label}
								</FormLabel>
							)}
							<RadioGroup
								value={value ?? ""}
								onChange={(e) => setValue(path, e.target.value)}
							>
								{schema.items.map(({ value, label }, i) => (
									<FormControlLabel
										key={value}
										value={value}
										control={
											<Radio
												autoFocus={
													i === 0 &&
													schema.ui?.autoFocus
												}
											/>
										}
										label={label}
									/>
								))}
							</RadioGroup>
						</FormControl>
					) : null;
				}
				case "boolean": {
					return (
						<FormControl error={touched ? !!errors.length : false}>
							<FormControlLabel
								control={
									<Checkbox
										style={{ padding: "0px 9px" }}
										autoFocus={schema.ui?.autoFocus}
										onFocus={() => onTouch(true)}
										checked={value ?? false}
										onChange={(e) =>
											setValue(path, e.target.checked)
										}
										ref={(r) => {
											register({
												setFocus: () => r?.focus(),
											});
										}}
									/>
								}
								label={schema.label}
							/>
							{touched && !!errors.length && (
								<FormHelperText color="red">
									{errors.join("\n")}
								</FormHelperText>
							)}
						</FormControl>
					);
				}
			}
		}
	}
	return null;
});
