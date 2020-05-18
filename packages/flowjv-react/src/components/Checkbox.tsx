import React, { useContext, useState } from "react";
import cx from "classnames";

interface ICheckboxProps {
	label?: string;
	className?: string;
	value: boolean;
	error?: boolean;
	success?: boolean;
	onChange: React.DetailedHTMLProps<
		React.InputHTMLAttributes<HTMLInputElement>,
		HTMLInputElement
	>["onChange"];
	inputProps?: React.DetailedHTMLProps<
		React.InputHTMLAttributes<HTMLInputElement>,
		HTMLInputElement
	>["onChange"];
}
export const Checkbox = ({
	className,
	label = "",
	inputProps,
	onChange,
	value,
	error,
	success,
}: ICheckboxProps) => {
	return (
		<label className={cx("mb-2 flex items-center p-2", className)}>
			<input
				{...inputProps}
				type="checkbox"
				className={cx(
					"outline-none border-2 border-solid border-gray-300 pr-2 text-gray-800"
				)}
				checked={value}
				onChange={onChange}
			/>
			<span
				className={cx("ml-2 flex-grow select-none", {
					"text-red-700": !!error,
					"text-green-700": success,
				})}
			>
				{label}
			</span>
		</label>
	);
};
Checkbox.displayName = "Checkbox";
