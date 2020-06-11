import { IPrimitiveFlow } from "flowjv";

export interface IUIElementConfig {
	errors: string[];
	success: boolean;
	label?: string;
	value?: any;
	onChange?: (value: any) => void;
	setTouch?: () => void;
	onUnmount?: () => void;
	className?: string;
	children?: any;
}
export type IUIConfig = (obj: {
	schema: IPrimitiveFlow | { type: "conditionWrapper" };
	ui: IUIElementConfig;
	children?: any;
}) => JSX.Element;
