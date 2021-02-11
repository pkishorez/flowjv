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

function Wrapper({ children }: any) {
	return <div style={{ marginTop: 10 }}>{children}</div>;
}
export const { FlowJVForm, flowSchema } = setupFlowJV<
	{
		uiType?: "password" | "text";
	},
	{},
	{},
	{ uiType?: "radio" | "select" },
	{}
>(({ schema, errors, value, setValue, onTouch, touched, path }) => {
	switch (schema.type) {
		case "string": {
			return (
				<Wrapper>
					<TextField
						fullWidth
						variant="filled"
						label={schema.label}
						error={touched ? !!errors.length : false}
						helperText={touched && errors.join("\n")}
						type={schema.uiType ?? "text"}
						placeholder={path.join(".")}
						value={value ?? ""}
						onChange={(e) => setValue(path, e.target.value)}
						onFocus={() => onTouch(true)}
					/>
				</Wrapper>
			);
		}
		case "number": {
			return (
				<Wrapper>
					<TextField
						fullWidth
						variant="filled"
						label={schema.label}
						error={touched ? !!errors.length : false}
						helperText={touched && errors.join("\n")}
						type="number"
						placeholder={path.join(".")}
						value={value ?? ""}
						onChange={(e) => setValue(path, e.target.value)}
						onFocus={() => onTouch(true)}
					/>
				</Wrapper>
			);
		}
		case "enum": {
			const id = `select-+${path.join(".")}`;
			const { uiType = "select" } = schema;
			return (
				<Wrapper>
					{uiType === "select" && (
						<FormControl
							key="select"
							variant="filled"
							error={touched ? !!errors.length : false}
							style={{ display: "block" }}
						>
							<InputLabel id={id}>Age</InputLabel>
							<Select
								fullWidth
								labelId={id}
								value={value ?? ""}
								onFocus={() => onTouch(true)}
								onChange={(e) => {
									setValue(path, e.target.value);
								}}
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
					)}
					{uiType === "radio" && (
						<FormControl key="radio" component="fieldset">
							{schema.label && (
								<FormLabel component="legend">
									{schema.label}
								</FormLabel>
							)}
							<RadioGroup
								value={value}
								onChange={(e) => setValue(path, e.target.value)}
							>
								{schema.items.map(({ value, label }) => (
									<FormControlLabel
										key={value}
										value={value}
										control={<Radio />}
										label={label}
									/>
								))}
							</RadioGroup>
						</FormControl>
					)}
				</Wrapper>
			);
		}
		case "boolean": {
			return (
				<Wrapper>
					<FormControl error={touched ? !!errors.length : false}>
						<FormControlLabel
							control={
								<Checkbox
									onFocus={() => onTouch(true)}
									checked={value ?? false}
									onChange={(e) =>
										setValue(path, e.target.checked)
									}
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
				</Wrapper>
			);
		}
	}
	return null;
});
