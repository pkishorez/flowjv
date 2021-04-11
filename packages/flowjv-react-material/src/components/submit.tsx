import { Button, ButtonProps } from "@material-ui/core";
import { IsValid } from "flowjv-react";
import React from "react";

export function SubmitButton(props: ButtonProps) {
	return (
		<IsValid>
			{({ isValid }) => (
				<Button
					{...props}
					disableRipple={!isValid}
					disableElevation
					color={isValid ? "primary" : "default"}
					variant="contained"
					className={"block w-full mt-5 focus:outline-none"}
					type="submit"
				>
					Submit
				</Button>
			)}
		</IsValid>
	);
}
