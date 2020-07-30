import { IJSONExpressionData } from "../../jsonexpression";
import { IFlowReturnType } from "../index";
import { IFlowSchema } from "../..";

export type IArrayFlow = {
	type: "array";
	itemSchema: IFlowSchema;
	minLen?: number;
	maxLen?: number;
};
export const execArrayFlow = <IData, IContext>(
	flow: IArrayFlow,
	data: IJSONExpressionData<IData, IContext>
): IFlowReturnType => {
	return { isValid: true, errors: [] };
};
