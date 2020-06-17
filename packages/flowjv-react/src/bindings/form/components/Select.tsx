import React, { useEffect } from "react";
import cx from "classnames";
import { ErrorUI } from "./utils/InputErrors";

type IInputProps = React.DetailedHTMLProps<
	React.SelectHTMLAttributes<HTMLSelectElement>,
	HTMLSelectElement
> & {
	options: { label?: string; value: string }[];
	errors: string[];
	value?: string | number;
	success?: boolean;
	label?: string;
	onUnmount?: any;
	onMount?: any;
};

export const SelectField = ({
	errors,
	success,
	options,
	className,
	label,
	value = "",
	onUnmount,
	onMount,
	...props
}: IInputProps) => {
	const hasErrors = errors.length;
	return (
		<label className={cx("flex flex-col", className)}>
			<div className="text-lg">{label}</div>
			<select
				value={value}
				{...props}
				className={cx(
					"outline-none border-b-2 border-solid p-3 mt-2 text-xs flex-grow",
					{
						"border-red-700 focus:border-red-700": hasErrors,
						"border-green-700 focus:border-green-700": success,
						"border-gray-400 focus:border-gray-900": !hasErrors,
					},
					className
				)}
			>
				<option value={undefined}>Select</option>
				{options.map((v, i) => (
					<option value={v.value} key={i}>
						{v.label || v.value}
					</option>
				))}
			</select>
			<ErrorUI errors={errors} />
		</label>
	);
};
