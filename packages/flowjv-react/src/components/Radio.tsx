import React, { forwardRef, useState, useEffect } from "react";
import cx from "classnames";

interface IRadioProps {
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => any;
	value?: any;
	checked?: boolean;
	name?: string;
	className?: string;
	onFocus?: (e: React.ChangeEvent<HTMLInputElement>) => any;
}
export const Radio = forwardRef<any, IRadioProps>(
	({ onChange, value, checked, name, className, onFocus }, ref) => {
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
				onFocus={onFocus}
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
	onUnmount?: any;
	onMount?: any;
	label?: string;
}
export const RadioGroup = ({
	value,
	className,
	options,
	onChange,
	label,
	onUnmount,
	onMount,
}: IRadioGroupProps) => {
	useEffect(() => {
		onMount?.();
		return onUnmount;
	}, []);
	const change = (e) => {
		onChange?.(e.target.value);
	};
	return (
		<div className="mt-3">
			<div className="text-lg">{label}</div>
			{options.map(({ label, value: v }, i) => (
				<label
					className={cx("flex items-center py-1 px-2", className)}
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
