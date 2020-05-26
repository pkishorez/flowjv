import React, { useEffect } from "react";
import cx from "classnames";

interface ICheckboxProps
	extends React.DetailedHTMLProps<
		React.InputHTMLAttributes<HTMLInputElement>,
		HTMLInputElement
	> {
	errors: string[];
	success?: boolean;
	label?: string;
	onUnmount?: any;
	onMount?: any;
}
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
	useEffect(() => {
		onMount?.();
		return onUnmount;
	}, []);
	return (
		<label className={cx("mt-3 flex items-center p-2", className)}>
			<input
				{...props}
				type="checkbox"
				className={cx(
					"outline-none border-2 border-solid border-gray-300 pr-2 text-gray-800"
				)}
				checked={!!value}
			/>
			<span
				className={cx("ml-2 flex-grow select-none", {
					"text-red-700": !!errors.length,
					"text-green-700": success,
				})}
			>
				{label}
			</span>
			<div>{errors.join(".")}</div>
		</label>
	);
};
Checkbox.displayName = "Checkbox";
