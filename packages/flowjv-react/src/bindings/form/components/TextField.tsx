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
	return (
		<label>
			<div className={cx("flex flex-col", className)}>
				<div
					className={cx({
						"text-error": hasErrors && !readOnly,
						"text-success": success && !readOnly,
						"text-primary": !(success || hasErrors),
					})}
				>
					{label}
				</div>
				<input
					spellCheck="false"
					value={value}
					{...props}
					style={{
						...props.style,
						borderBottomWidth: "var(--border-width)",
					}}
					className={cx(
						"outline-none border-b border-solid pt-0 flex-grow bg-transparent",
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
				<ErrorUI errors={errors} />
			</div>
		</label>
	);
};
