import React, { useRef } from "react";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { IsValid, setupFlowJV } from "flowjv-react";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import Checkbox from "@material-ui/core/Checkbox";
import {
	Button,
	ButtonProps,
	FormControlLabel,
	FormLabel,
	InputLabel,
	Radio,
	RadioGroup,
} from "@material-ui/core";

function Wrapper({ children, style }: any) {
	const count = useRef(0);
	count.current++;
	return (
		<div style={{ marginTop: 10, position: "relative", ...style }}>
			{children}
			<div
				style={{
					position: "absolute",
					right: "0px",
					top: "0px",
					backgroundColor: "gray",
					color: "white",
					padding: "2px 7px",
					borderRadius: 5,
				}}
			>
				{count.current}
			</div>
		</div>
	);
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
				<Wrapper style={{ marginTop: 15 }}>
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
								value={value ?? ""}
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
									style={{ padding: "0px 9px" }}
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

export function SubmitButton(props: ButtonProps) {
	return (
		<IsValid>
			{({ isValid }) => (
				<Button
					{...props}
					color={isValid ? "primary" : "default"}
					variant="contained"
					className={"block w-full mt-5 focus:outline-none"}
					type="submit"
				>
					Submit
				</Button>
			)}
		</IsValid>
	);
}
