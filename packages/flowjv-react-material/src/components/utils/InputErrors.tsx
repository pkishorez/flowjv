import React from "react";
import { AnimatePresence } from "framer-motion";
import { AnimateHeight } from "./Animate";
import { Typography, Box } from "@material-ui/core";

export const ErrorUI = ({
	errors,
	mt = 0.5,
}: {
	errors: string[];
	mt?: number;
}) => {
	return (
		<AnimatePresence>
			{errors.map((v, i) => (
				<AnimateHeight key={i} isVisible animateOnMount>
					<Box mt={mt}>
						<Typography color="error" style={{ fontSize: "0.9em" }}>
							{v}
						</Typography>
					</Box>
				</AnimateHeight>
			))}
		</AnimatePresence>
	);
};
