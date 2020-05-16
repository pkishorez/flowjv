import {
	IExpression,
	IJSONExpressionData,
	execJSONExpression,
} from "../../jsonlogic";
import { IJSONFlow, IJSONFlowReturnType, execJSONFlow } from "../index";
import get from "lodash/get";
import { IFlowContext } from "../index";

type IObjectProperty = {
	key: string;
	value: IJSONFlow;
	ignoreKey?: IExpression;
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
		const { key, value, ignoreKey } = config;
		if (ignoreKey) {
			const ignore = !!execJSONExpression(ignoreKey, data);
			if (ignore) continue;
		}
		const nestedRef = get(data.ref, key);
		const result = execJSONFlow(
			value,
			{ ...data, ref: nestedRef },
			{ ...flowContext, refPath: [...flowContext.refPath, key] }
		);

		// Return error if any.
		if (!result.isValid) {
			return result;
		}
	}
	return { errors: null, isValid: true, refPath: flowContext.refPath };
};
