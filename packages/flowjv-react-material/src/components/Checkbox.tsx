import React, { useEffect } from "react";
import cx from "classnames";
import { ErrorUI } from "./utils/InputErrors";
import { FormControlLabel, Box } from "@material-ui/core";
import MUICheckbox, { CheckboxProps } from "@material-ui/core/Checkbox";

type ICheckboxProps = CheckboxProps & {
	value?: boolean;
	errors: string[];
	success?: boolean;
	label?: string;
	onUnmount?: any;
	onMount?: any;
	onChange?: any;
};
export const Checkbox = ({
	errors,
	success,
	value,
	label,
	onUnmount,
	onMount,
	className,
	...props
}: ICheckboxProps) => {
	return (
		<Box pt={2}>
			<FormControlLabel
				control={<MUICheckbox {...props} checked={value} />}
				label={label}
			/>
			<ErrorUI errors={errors} mt={-0.5} />
		</Box>
	);
};
Checkbox.displayName = "Checkbox";
