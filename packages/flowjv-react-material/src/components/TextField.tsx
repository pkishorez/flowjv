import React from "react";
import { ErrorUI } from "./utils/InputErrors";
import Box from "@material-ui/core/Box";
import MUITextField, { TextFieldProps } from "@material-ui/core/TextField";

type IInputProps = TextFieldProps & {
	errors: string[];
	success?: boolean;
	label?: string;
	onUnmount?: any;
	onMount?: any;
};

export const TextField = ({
	errors,
	success,
	className,
	label,
	value = "",
	onUnmount,
	onMount,
	color,
	size,
	...props
}: IInputProps) => {
	const hasErrors = errors.length;
	return (
		<Box pt={2}>
			<MUITextField
				color={"secondary"}
				fullWidth
				{...props}
				error={!!hasErrors}
				label={label}
				variant="filled"
			/>
			<ErrorUI errors={errors} />
		</Box>
	);
};
