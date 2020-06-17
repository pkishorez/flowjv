import { useContext } from "react";
import { formContext } from "../index";
import { IUIElementConfig } from "../config";

export const Field = ({
	refPath,
	render,
}: {
	refPath: string;
	render?: (props: IUIElementConfig) => JSX.Element | null;
}) => {
	const context = useContext(formContext);
	const { errors, success, value } = context.getValue(refPath);
	if (render) {
		return render({
			errors,
			success,
			value,
			onChange: (v) => context.setValue(refPath, v),
			setTouch: () => context.setTouch(refPath),
		});
	}
	return context.renderAtom(refPath.split("."));
};
