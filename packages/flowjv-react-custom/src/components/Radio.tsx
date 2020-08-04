import React, { forwardRef, useState, useEffect } from "react";
import cx from "classnames";

interface IRadioProps {
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => any;
	value?: any;
	checked?: boolean;
	name?: string;
	className?: string;
	errors: string[];
	success?: boolean;
	onFocus?: (e: React.ChangeEvent<HTMLInputElement>) => any;
}
export const Radio = forwardRef<any, IRadioProps>(
	(
		{ onChange, value, checked, name, className, onFocus, errors, success },
		ref
	) => {
		return (
			<div
				className={cx("fjv-input", {
					success: !!success,
					error: !!errors.length,
				})}
			>
				<input
					type="radio"
					checked={checked}
					name={name}
					className={cx(
						"radio",
						"outline-none border-2 border-solid border-gray-300 pr-2 w-4 h-4",
						className
					)}
					value={value}
					ref={ref}
					onChange={onChange}
					onFocus={onFocus}
				/>
				<div className="mark">
					<div className="content"></div>
				</div>
			</div>
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
	errors: string[];
	success?: boolean;
	onFocus?: any;
}
export const RadioGroup = ({
	value,
	className,
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
		<div className={cx("pt-3", className)}>
			<label>
				<div
					className={cx("text-sm", {
						"text-success": success,
						"text-error": !!errors.length,
						"text-primary": !(success || !!errors.length),
					})}
				>
					{label}
				</div>
				{options.map(({ label, value: v }, i) => (
					<label
						className={cx(
							"flex items-center py-1 px-2",
							i === 0 ? "" : "mt-1"
						)}
						onFocus={onFocus}
						key={i}
					>
						<Radio
							value={v}
							onChange={change}
							errors={errors}
							success={success}
							checked={value === v}
						/>
						<span
							className={cx("ml-2 flex-grow select-none", {
								"text-success": value === v,
								"text-primary": value !== v,
							})}
						>
							{label}
						</span>
					</label>
				))}
			</label>
		</div>
	);
};
