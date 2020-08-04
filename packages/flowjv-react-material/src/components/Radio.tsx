import React, { forwardRef, useState, useEffect } from "react";
import cx from "classnames";
import {
	FormControl,
	FormLabel,
	FormControlLabel,
	Box,
} from "@material-ui/core";
import Radio, { RadioProps } from "@material-ui/core/Radio";

import MUIRadioGroup from "@material-ui/core/RadioGroup";
import { ErrorUI } from "./utils/InputErrors";

interface IRadioGroupProps {
	value?: string;
	className?: string;
	onChange?: (v: string) => any;
	options: { label?: string; value: string }[];
	label?: string;
	errors: string[];
	success?: boolean;
	onFocus?: any;
}
export const RadioGroup = ({
	value,
	options,
	onChange,
	label,
	success,
	errors,
	onFocus,
}: IRadioGroupProps) => {
	const change = (e) => {
		onChange?.(e.target.value);
	};
	return (
		<Box pt={2}>
			<FormControl component="fieldset">
				<FormLabel component="legend">{label}</FormLabel>
				<MUIRadioGroup value={value} onChange={change}>
					{options.map((option) => (
						<FormControlLabel
							key={option.value}
							value={option.value}
							label={option.label || option.value}
							control={<Radio />}
						/>
					))}
				</MUIRadioGroup>
			</FormControl>
			<ErrorUI errors={errors} />
		</Box>
	);
};
