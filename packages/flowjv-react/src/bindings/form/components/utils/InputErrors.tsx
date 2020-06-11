import React from "react";
import { AnimatePresence } from "framer-motion";
import { AnimateHeight } from "./Animate";

export const ErrorUI = ({ errors }: { errors: string[] }) => {
	return (
		<AnimatePresence>
			{errors.map((v, i) => (
				<AnimateHeight key={i} isVisible animateOnMount>
					<div className="text-xs mt-1 text-red-700">{v}</div>
				</AnimateHeight>
			))}
		</AnimatePresence>
	);
};
