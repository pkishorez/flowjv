import {
	IExpression,
	execJSONExpression,
	IJSONExpressionData,
} from "../../jsonlogic";
import { IJSONFlowReturnType, IFlowContext } from "../index";

export type IPrimitiveFlow = {
	type: "string" | "number" | "boolean";
	validations?: { logic: IExpression; err?: string }[];
};

export const execPrimitiveFlow = <IData, IContext>(
	flow: IPrimitiveFlow,
	data: IJSONExpressionData<IData, IContext>,
	flowContext: IFlowContext
): IJSONFlowReturnType => {
	switch (flow.type) {
		case "boolean":
		case "number":
		case "string": {
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
				refPath: flowContext.refPath,
			};
		}
	}
};
