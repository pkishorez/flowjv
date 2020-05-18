import React, { forwardRef, useState } from "react";
import cx from "classnames";

interface IRadioProps {
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => any;
	value?: any;
	checked?: boolean;
	name?: string;
	className?: string;
}
export const Radio = forwardRef<any, IRadioProps>(
	({ onChange, value, checked, name, className }, ref) => {
		return (
			<input
				name={name}
				type="radio"
				className={cx(
					"outline-none border-2 border-solid border-gray-300 pr-2 text-gray-800",
					className
				)}
				value={value}
				checked={checked}
				ref={ref}
				onChange={onChange}
			/>
		);
	}
);

interface IRadioGroupProps {
	value?: string;
	className?: string;
	onChange?: (v: string) => any;
	options: { label?: string; value: string }[];
	inputProps?: IRadioProps;
}
export const RadioGroup = ({
	value,
	className,
	options,
	onChange,
}: IRadioGroupProps) => {
	const change = (e) => {
		const v = e.target.value;
		onChange && onChange(v);
	};
	return (
		<div>
			{options.map(({ label, value: v }, i) => (
				<label
					className={cx("flex items-center p-2 w-full", className)}
					key={i}
				>
					<Radio value={v} onChange={change} checked={value === v} />
					<span className={cx("ml-2 flex-grow select-none", {})}>
						{label}
					</span>
				</label>
			))}
		</div>
	);
};
