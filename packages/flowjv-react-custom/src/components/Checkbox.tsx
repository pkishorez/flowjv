import React, { useEffect } from "react";
import cx from "classnames";
import { ErrorUI } from "./utils/InputErrors";

type ICheckboxProps = React.DetailedHTMLProps<
	React.InputHTMLAttributes<HTMLInputElement>,
	HTMLInputElement
> & {
	value?: boolean;
	errors: string[];
	success?: boolean;
	label?: string;
	onUnmount?: any;
	onMount?: any;
};
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
	return (
		<label>
			<div className={cx(className, "pt-3")}>
				<div className={cx("flex items-center px-2 pb-0")}>
					<div
						className={cx("fjv-input", {
							error: !!errors.length,
							success: !!success,
						})}
					>
						<input
							{...props}
							className="w-4 h-4 checkbox"
							type="checkbox"
							checked={!!value}
						/>
						<div className="mark">
							<span className="content">✓</span>
						</div>
					</div>
					<span
						className={cx("ml-2 flex-grow text-sm select-none", {
							"text-error": !!errors.length,
							"text-success": !!success,
							"text-primary": !(!!errors.length || !!success),
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
