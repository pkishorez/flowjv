import {
	IExpression,
	execJSONExpression,
	IJSONExpressionData,
} from "../jsonlogic/index";
import get from "lodash/get";

type IAtomFlow = {
	type: "text" | "number" | "boolean";
	validations?: { logic: IExpression; err?: string }[];
};
type IObjectFlow = {
	type: "object";
	properties: { key: string; value: IJSONFlow; ignoreKey?: IExpression }[];
};
export type IJSONFlow =
	| IAtomFlow
	| IObjectFlow
	| { type: "if"; cond: [IExpression, IJSONFlow, IJSONFlow?] }
	| {
			type: "switch";
			cond: IExpression;
			flowMap: {
				[key: string]: IJSONFlow;
			};
	  };

export const execJSONFlow = <IData, IContext>(
	flow: IJSONFlow,
	data?: IData,
	context?: IContext
) => {
	return _execJSONFlow(flow, { data, context, ref: data });
};
const _execJSONFlow = <IData, IContext>(
	flow: IJSONFlow,
	data: IJSONExpressionData<IData, IContext>
): { isValid: boolean; errors: string[] | null } => {
	switch (flow.type) {
		case "number":
		case "text":
		case "boolean": {
			const { validations = [] } = flow;
			const errors = validations
				.map(({ logic, err }) => {
					const result = !!execJSONExpression(logic, data);
					return result ? null : err || "Error";
				})
				.filter((v) => v !== null) as string[];
			return {
				errors: errors.length > 0 ? errors : null,
				isValid: errors.length === 0,
			};
		}
		case "object": {
			const { properties } = flow;
			for (let {
				key,
				value: keyFlow,
				ignoreKey: ignoreKeyLogic,
			} of properties) {
				const ignoreKey = ignoreKeyLogic
					? execJSONExpression(ignoreKeyLogic, data)
					: false;
				if (ignoreKey) {
					// ignore key.
					continue;
				}
				const result = _execJSONFlow(keyFlow, {
					...data,
					ref: get(data.ref, key),
				});
				if (!result.isValid) {
					return result;
				}
			}
			break;
		}
		case "if": {
			const {
				cond: [expression, case1, case2],
			} = flow;
			if (execJSONExpression(expression, data)) {
				return _execJSONFlow(case1, data);
			}
			if (case2) {
				return _execJSONFlow(case2, data);
			}
		}
	}
	return { errors: null, isValid: true };
};
