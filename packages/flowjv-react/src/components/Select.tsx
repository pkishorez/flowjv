import React, { useEffect } from "react";
import cx from "classnames";

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
	useEffect(() => {
		return onUnmount;
	}, []);
	return (
		<label className="mt-3 block flex flex-col">
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
			{hasErrors ? (
				<div>
					{errors?.map((err, i) => (
						<div key={i} className="text-xs mt-1 text-red-700">
							{err}
						</div>
					))}
				</div>
			) : null}
		</label>
	);
};
