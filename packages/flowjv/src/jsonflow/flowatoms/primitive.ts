import {
	IExpression,
	execJSONExpression,
	IJSONExpressionData,
} from "../../jsonlogic";
import { IJSONFlowReturnType, IFlowContext } from "../index";

export interface IValidation {
	logic: IExpression;
	err?: string;
}
export type IPrimitiveFlow =
	| {
			type: "string" | "number" | "boolean";
			uiType?: "number" | "text" | "password";
			label?: string;
			validations?: IValidation[];
	  }
	| {
			type: "enum";
			uiType?: "select" | "radio";
			label?: string;
			err?: string;
			items: { label?: string; value: any }[];
			validations?: IValidation[];
	  };

export const execPrimitiveFlow = <IData, IContext>(
	flow: IPrimitiveFlow,
	data: IJSONExpressionData<IData, IContext>,
	flowContext: IFlowContext
): IJSONFlowReturnType => {
	let validations = flow.validations || [];
	switch (flow.type) {
		case "enum":
		case "boolean":
		case "number":
		case "string": {
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
