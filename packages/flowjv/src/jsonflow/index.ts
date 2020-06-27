import { IJSONExpressionData } from "../jsonlogic/index";
import { IObjectFlow, execObjectFlow } from "./blocks/object";

export type IFlowSchema = IObjectFlow;

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
	enforceSchema?: boolean;
	typeCheck?: boolean;
}
export const execJSONFlow = <IData, IContext>(
	flow: IFlowSchema,
	data: IJSONExpressionData<IData, IContext>,
	flowContext: IFlowContext,
	options: IFlowOptions = {
		typeCheck: true,
		aggressive: false,
		enforceSchema: true,
	}
): IFlowReturnType => {
	switch (flow.type) {
		case "object":
			return execObjectFlow(flow, data, flowContext, options);
	}
	return { isValid: true, errors: [] };
};
