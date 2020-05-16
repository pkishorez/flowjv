import { IJSONExpressionData } from "../jsonlogic/index";
import { IObjectFlow, execObjectFlow } from "./flowatoms/object";
import { IPrimitiveFlow, execPrimitiveFlow } from "./flowatoms/primitive";

export type IJSONFlow = IPrimitiveFlow | IObjectFlow;

export const validateJSONFlow = <IData, IContext>(
	flow: IJSONFlow,
	{
		data,
		context,
	}: {
		data?: IData;
		context?: IContext;
	}
) => {
	return execJSONFlow(flow, { data, context, ref: data }, { refPath: [] });
};

export interface IFlowContext {
	refPath: string[];
}
export interface IJSONFlowReturnType {
	isValid: boolean;
	errors: string[] | null;
	refPath: string[];
}
export const execJSONFlow = <IData, IContext>(
	flow: IJSONFlow,
	data: IJSONExpressionData<IData, IContext>,
	flowContext: IFlowContext
): IJSONFlowReturnType => {
	switch (flow.type) {
		case "string":
		case "number":
		case "boolean":
			return execPrimitiveFlow(flow, data, flowContext);
		case "object":
			return execObjectFlow(flow, data, flowContext);
	}
};
