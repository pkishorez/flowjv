import {
	IExpression,
	IJSONExpressionData,
	execJSONExpression,
} from "../../jsonlogic";
import { IJSONFlow, IJSONFlowReturnType, execJSONFlow } from "../index";
import get from "lodash/get";
import { IFlowContext } from "../index";
import { IPrimitiveFlow, execPrimitiveFlow } from "./primitive";

type IObjectProperty =
	| ((IPrimitiveFlow | IObjectFlow) & {
			key: string;
			ignoreKey?: IExpression;
	  })
	| {
			type: "if";
			cond: IExpression;
			true: IObjectProperty[];
			false?: IObjectProperty[];
	  };
export type IObjectFlow = {
	type: "object";
	properties: IObjectProperty[];
};

export const execObjectFlow = <IData, IContext>(
	flow: IObjectFlow,
	data: IJSONExpressionData<IData, IContext>,
	flowContext: IFlowContext
): IJSONFlowReturnType => {
	const { properties } = flow;
	for (let config of properties) {
		if (config.type === "if") {
			const cond = !!execJSONExpression(config.cond, data);
			const flow = cond ? config.true : config.false;
			if (flow) {
				const result = execObjectFlow(
					{ type: "object", properties: flow },
					data,
					flowContext
				);
				if (!result.isValid) {
					return result;
				}
			}
			continue;
		}
		const { ignoreKey, key } = config;
		if (ignoreKey) {
			const ignore = !!execJSONExpression(ignoreKey, data);
			if (ignore) continue;
		}
		const refPath = [...flowContext.refPath, key];
		switch (config.type) {
			case "object": {
				return execObjectFlow(config, data, {
					...flowContext,
					refPath,
				});
			}

			// Default specifies a primitive value type!
			default: {
				const result = execPrimitiveFlow(
					config,
					{ ...data, ref: get(data.data, key) },
					{
						...flowContext,
						refPath,
					}
				);
				if (!result.isValid) {
					return result;
				}
				break;
			}
		}
	}
	return { errors: null, isValid: true, refPath: flowContext.refPath };
};
