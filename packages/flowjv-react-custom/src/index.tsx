import React, { useEffect, useRef } from "react";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { AutoFlow, IsValid, setupFlowJV } from "flowjv-react";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import Checkbox from "@material-ui/core/Checkbox";
import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from "@material-ui/icons/Add";
import {
	IconButton,
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
		<div style={{ marginTop: 15, position: "relative", ...style }}>
			{children}
			{/* <div
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
			</div> */}
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
	{},
	{
		minLength?: number;
		maxLength?: number;
		length?: number;
	}
>((props) => {
	switch (props.schemaType) {
		case "array": {
			const {
				path,
				value = [],
				insertAtIndex,
				deleteAtIndex,
				uniqueIndexes,
				schema: { minLength, maxLength, length, ...schema },
			} = props;
			return (
				<div
					style={{
						marginTop: 20,
					}}
				>
					{schema.label && (
						<FormLabel
							style={{ display: "flex", alignItems: "center" }}
						>
							{schema.label}{" "}
						</FormLabel>
					)}
					<div
						style={{
							// marginLeft: 10,
							padding: 10,
							backgroundColor: "rgba(0,0,0,0.03)",
						}}
					>
						{value.map((_, i) => (
							<div
								style={{
									display: "flex",
									alignItems: "center",
								}}
								key={uniqueIndexes[i] ?? i}
							>
								<div
									style={{
										flexGrow: 1,
									}}
								>
									<AutoFlow path={[...path, i]} />
								</div>
								{length === value.length
									? null
									: (minLength === undefined ||
											value.length > minLength) && (
											<IconButton
												size="medium"
												style={{ marginTop: -10 }}
												onClick={() => deleteAtIndex(i)}
											>
												<DeleteIcon
													style={{ fontSize: 18 }}
												/>
											</IconButton>
									  )}
							</div>
						))}
						{length === value.length ? null : (
							<div
								style={{
									display: "flex",
									flexDirection: "column",
									marginTop: 10,
								}}
							>
								{(maxLength === undefined ||
									value.length < maxLength) && (
									<Button
										size="medium"
										variant="outlined"
										onClick={() =>
											insertAtIndex(value.length)
										}
									>
										Add <AddIcon style={{ fontSize: 10 }} />
									</Button>
								)}
							</div>
						)}
					</div>
				</div>
			);
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
						<Wrapper>
							<TextField
								fullWidth
								variant="filled"
								label={schema.label}
								error={touched ? !!errors.length : false}
								helperText={touched && errors.join("\n")}
								type={schema.uiType ?? "text"}
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
								ref={(r) => {
									register({
										setFocus: () => r?.focus(),
									});
								}}
							/>
							{touched && (
								<FormHelperText>
									{errors.join("\n")}
								</FormHelperText>
							)}
						</Wrapper>
					);
				}
				case "enum": {
					const id = `select-${path.join(".")}`;
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
									<InputLabel id={id}>
										{schema.label}
									</InputLabel>
									<Select
										fullWidth
										labelId={id}
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
										{schema.items.map(
											({ value, label }) => (
												<MenuItem
													key={value}
													value={value}
												>
													{label ?? value}
												</MenuItem>
											)
										)}
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
										onChange={(e) =>
											setValue(path, e.target.value)
										}
									>
										{schema.items.map(
											({ value, label }) => (
												<FormControlLabel
													key={value}
													value={value}
													control={<Radio />}
													label={label}
												/>
											)
										)}
									</RadioGroup>
								</FormControl>
							)}
						</Wrapper>
					);
				}
				case "boolean": {
					return (
						<Wrapper>
							<FormControl
								error={touched ? !!errors.length : false}
							>
								<FormControlLabel
									control={
										<Checkbox
											style={{ padding: "0px 9px" }}
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
						</Wrapper>
					);
				}
			}
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
					disableRipple={!isValid}
					disableElevation
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
