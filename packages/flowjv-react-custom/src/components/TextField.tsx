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
	const hasErrors = !!errors.length;
	return (
		<div className={cx(className, "pt-3")}>
			<label
				className={cx("fjv-textfield", {
					success: success,
					error: hasErrors,
					"opacity-50": readOnly,
				})}
			>
				<input
					{...props}
					style={{
						...props.style,
					}}
					value={value}
					placeholder="This is a placeholder!"
					readOnly={readOnly}
					className={cx(
						"outline-none border-0 border-b-2 border-solid bg-transparent",
						{
							"border-error focus:border-error":
								hasErrors && !readOnly,
							"border-success focus:border-success":
								success && !readOnly,
							"border-gray-400 focus:border-gray-900":
								!(hasErrors || success) && !readOnly,
							"cursor-default text-gray-600 pointer-events-none focus:border-gray-400": readOnly,
						}
					)}
				/>
				<span className="label">{label}</span>
			</label>
			<ErrorUI errors={errors} />
		</div>
	);
};
