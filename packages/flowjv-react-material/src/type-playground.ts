import { IFlowSchema } from "flowjv";
import { UI } from "./type";

export type IUIFlowSchema = IFlowSchema<
	{},
	{},
	UI.StringUI,
	UI.NumberUI,
	UI.BooleanUI,
	UI.EnumUI,
	UI.CustomUI,
	UI.ArrayUI
>;
