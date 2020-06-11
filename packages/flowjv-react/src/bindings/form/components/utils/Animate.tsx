import React from "react";
import { motion } from "framer-motion";
import cx from "classnames";

interface IAnimateHeightProps {
	isVisible?: boolean;
	children?: any;
	animateOnMount?: boolean;
	className?: string;
}
export const AnimateHeight = ({
	isVisible,
	children,
	animateOnMount,
	className,
}: IAnimateHeightProps) => {
	return (
		<motion.div
			initial={animateOnMount ? "close" : isVisible ? "open" : "close"}
			animate={isVisible ? "open" : "close"}
			exit="close"
			className={cx("origin-top overflow-hidden", className)}
			variants={{
				open: {
					opacity: 1,
					height: "auto",
				},
				close: {
					opacity: 0,
					height: 0,
				},
			}}
		>
			{children}
		</motion.div>
	);
};
