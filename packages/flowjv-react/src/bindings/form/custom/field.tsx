import { useContext } from "react";
import { formContext } from "../index";

export const Field = ({ refPath }: { refPath: string }) => {
	const context = useContext(formContext);
	return context.renderAtom(refPath.split("."));
};
