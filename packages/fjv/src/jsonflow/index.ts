import {
	IExpression,
	execJSONExpression,
	IJSONExpressionData,
} from "../jsonlogic/index";
import get from "lodash/get";
export type IJSONFlow =
	| ["text" | "number" | "boolean", ...{ logic: IExpression; err?: string }[]]
	| ["object", ...[string, { type: IJSONFlow; ignoreKey?: IExpression }][]]
	| ["if", IExpression, IJSONFlow, IJSONFlow?]
	| [
			"switch",
			IExpression,
			{
				[key: string]: IJSONFlow;
			}
	  ];

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
	switch (flow[0]) {
		case "number":
		case "text":
		case "boolean": {
			const [_, ...validations] = flow;
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
			const [_, ...objectFlow] = flow;
			for (let [
				key,
				{ type: keyFlow, ignoreKey: keyLogic },
			] of objectFlow) {
				const ignoreKey = keyLogic
					? execJSONExpression(keyLogic, data)
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
			const [_, cond, case1, case2] = flow;
			if (execJSONExpression(cond, data)) {
				return _execJSONFlow(case1, data);
			}
			if (case2) {
				return _execJSONFlow(case2, data);
			}
		}
	}
	return { errors: null, isValid: true };
};
