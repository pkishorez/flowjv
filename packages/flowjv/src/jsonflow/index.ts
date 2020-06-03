import { IJSONExpressionData } from "../jsonlogic/index";
import { IObjectFlow, execObjectFlow } from "./flowatoms/object";
import { IPrimitiveFlow, execPrimitiveFlow } from "./flowatoms/primitive";
import { IArrayFlow } from "./flowatoms/array";

export type IFlowSchema = IPrimitiveFlow | IObjectFlow | IArrayFlow;

export const validateJSONFlow = <IData, IContext>(
	flow: IFlowSchema,
	{
		data,
		context,
		options,
	}: {
		data?: IData;
		context?: IContext;
		options?: IFlowOptions;
	}
) => {
	return execJSONFlow(
		flow,
		{ data, context, ref: data },
		{ refPath: [] },
		options
	);
};

export interface IFlowContext {
	refPath: string[];
}
export interface IFlowReturnType {
	isValid: boolean;
	errors: {
		msgs: string[];
		refPath: string[];
	}[];
}

export interface IFlowOptions {
	aggressive?: boolean;
}
export const execJSONFlow = <IData, IContext>(
	flow: IFlowSchema,
	data: IJSONExpressionData<IData, IContext>,
	flowContext: IFlowContext,
	options?: IFlowOptions
): IFlowReturnType => {
	switch (flow.type) {
		case "string":
		case "number":
		case "enum":
		case "boolean":
			return execPrimitiveFlow(flow, data, flowContext);
		case "object":
			return execObjectFlow(flow, data, flowContext, options);
		case "array":
			throw new Error("TODO");
	}
	return { isValid: true, errors: [] };
};
