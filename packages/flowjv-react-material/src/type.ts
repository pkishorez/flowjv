import { IFlowSchema } from "flowjv";

export type IUIFlowSchema = IFlowSchema<
	{
		uiType?: "password" | "text";
	},
	{},
	{},
	{ uiType?: "radio" | "select" },
	{},
	{
		minLength?: number;
		maxLength?: number;
		length?: number;
	}
>;
