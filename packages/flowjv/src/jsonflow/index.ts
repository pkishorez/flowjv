import { IJSONExpressionData } from "../jsonexpression/index";
import { IObjectFlow, execObjectFlow } from "./blocks/object";
import { IKeyPath } from "../helper/immutable";

export type IFlowSchema = IObjectFlow;

export const validateJSONFlow = <IData, IContext>(
	flow: IFlowSchema,
	{
		data,
		context,
	}: {
		data?: IData;
		context?: IContext;
	},
	options?: IFlowOptions
) => {
	return execJSONFlow(flow, { data, context, refPath: [] }, options);
};

export interface IFlowReturnType {
	isValid: boolean;
	errors: {
		msgs: string[];
		refPath: IKeyPath;
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
	options: IFlowOptions = {
		typeCheck: true,
		aggressive: false,
		enforceSchema: true,
	}
): IFlowReturnType => {
	switch (flow.type) {
		case "object":
			return execObjectFlow(flow, data, options);
		default:
			return { isValid: true, errors: [] };
	}
};
