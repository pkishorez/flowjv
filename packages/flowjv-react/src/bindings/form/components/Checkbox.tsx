import React, { useEffect } from "react";
import cx from "classnames";
import { ErrorUI } from "./utils/InputErrors";

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
		<label>
			<div className={className}>
				<div className={cx("flex items-center px-2 pb-0")}>
					<div className="fjv-checkbox">
						<input {...props} type="checkbox" checked={!!value} />
						<div className="mark"></div>
					</div>
					<span
						className={cx("ml-2 flex-grow select-none", {
							"text-red-700": !!errors.length,
							"text-green-700": success,
						})}
					>
						{label}
					</span>
				</div>

				<ErrorUI errors={errors} />
			</div>
		</label>
	);
};
Checkbox.displayName = "Checkbox";
