import React, { forwardRef, useEffect } from "react";
import cx from "classnames";
import { ErrorUI } from "./utils/InputErrors";

type IInputProps = React.DetailedHTMLProps<
	React.InputHTMLAttributes<HTMLInputElement>,
	HTMLInputElement
> & {
	errors: string[];
	success?: boolean;
	label?: string;
	onUnmount?: any;
	onMount?: any;
};

export const TextField = ({
	errors,
	success,
	className,
	readOnly,
	label,
	value = "",
	onUnmount,
	onMount,
	...props
}: IInputProps) => {
	const hasErrors = errors.length;
	useEffect(() => {
		onMount?.();
		return onUnmount;
	}, []);
	return (
		<label className={cx("block flex flex-col", className)}>
			<div
				className={cx("text-lg", {
					"text-red-700": hasErrors && !readOnly,
					"text-green-800": success && !readOnly,
				})}
			>
				{label}
			</div>
			<input
				value={value}
				{...props}
				className={cx(
					"outline-none border-b-2 border-solid pt-0 pb-1 text-xs flex-grow bg-transparent",
					{
						"border-red-700 focus:border-red-700":
							hasErrors && !readOnly,
						"border-green-700 focus:border-green-700":
							success && !readOnly,
						"border-gray-400 focus:border-gray-900":
							!hasErrors && !readOnly,
						"cursor-default text-gray-600 pointer-events-none focus:border-gray-400": readOnly,
					}
				)}
			/>
			<ErrorUI errors={errors} />
		</label>
	);
};
