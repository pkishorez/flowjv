import { Paper, Popper } from "@material-ui/core";
import cx from "classnames";
import React, { useEffect, useRef, useState } from "react";

export const Dropdown = ({
	button,
	children,
}: {
	button: any;
	children: any;
}) => {
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const dropdownClick = useRef(false);
	useEffect(() => {
		const func = () => {
			if (!dropdownClick.current) {
				setAnchorEl(null);
			}
			dropdownClick.current = false;
		};
		window.addEventListener("click", func);
		return () => window.removeEventListener("click", func);
	}, []);
	return (
		<div>
			<div
				onClick={(e) => {
					dropdownClick.current = true;
					setAnchorEl(anchorEl ? null : e.currentTarget);
				}}
			>
				{button}
			</div>
			<div
				className={cx(
					"fixed top-0 left-0 right-0 bottom-0 z-10",
					"bg-gray-900 bg-opacity-40",
					"transition-opacity duration-300",
					{
						"opacity-0 pointer-events-none": !Boolean(anchorEl),
						"opacity-100": Boolean(anchorEl),
					}
				)}
			/>
			<Popper
				open={Boolean(anchorEl)}
				anchorEl={anchorEl}
				className="z-20"
				placement="bottom-end"
			>
				<Paper>{children}</Paper>
			</Popper>
		</div>
	);
};
