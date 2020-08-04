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
		<label className={cx("fjv-select flex flex-col", className, "pt-3")}>
			<div className="text-sm">{label}</div>
			<select
				value={value}
				{...props}
				className={cx(
					"outline-none border-0 border-b-2 border-solid px-2 py-4 mt-1 text-xs flex-grow",
					{
						"border-error focus:border-error": hasErrors,
						"border-success focus:border-success": success,
						"border-gray-400 focus:border-gray-900": !hasErrors,
					}
				)}
			>
				<option value={"none"}>Select</option>
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
