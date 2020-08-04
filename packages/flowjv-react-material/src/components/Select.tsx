import React from "react";
import {
	FormControl,
	InputLabel,
	Select as MUISelect,
	MenuItem,
	Box,
	makeStyles,
} from "@material-ui/core";
const useStyles = makeStyles({
	formControl: {
		width: "100%",
	},
});

export const Select = ({
	value,
	onChange,
	label,
	options,
	success,
	errors,
	onFocus,
}: {
	value: any;
	onChange: any;
	label: string;
	options: { label?: string; value: string }[];
	errors: string[];
	success?: boolean;
	onFocus?: any;
}) => {
	const styles = useStyles();
	return (
		<Box pt={2}>
			<FormControl variant="filled" className={styles.formControl}>
				<InputLabel>{label}</InputLabel>
				<MUISelect
					value={value || ""}
					onChange={onChange}
					variant="filled"
				>
					{options.map((option) => (
						<MenuItem key={option.value} value={option.value}>
							{option.label || option.value}
						</MenuItem>
					))}
				</MUISelect>
			</FormControl>
		</Box>
	);
};
