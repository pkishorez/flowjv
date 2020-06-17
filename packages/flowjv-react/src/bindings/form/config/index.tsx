import { IAtom } from "flowjv";

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
export type IUISchema = IAtom | { type: "conditionWrapper"; animKey?: string };
export type IFormUIConfigFunc = (obj: {
	schema: IUISchema;
	ui: IUIElementConfig;
	children?: any;
}) => JSX.Element | null;
