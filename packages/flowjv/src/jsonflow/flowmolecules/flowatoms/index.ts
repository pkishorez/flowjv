import {
	IExpression,
	execJSONExpression,
	IJSONExpressionData,
} from "../../../jsonlogic";
import { IFlowReturnType, IFlowContext } from "../../index";

export interface IValidation {
	logic: IExpression;
	err: string;
}
export type IAtom =
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
	flow: IAtom,
	data: IJSONExpressionData<IData, IContext>,
	flowContext: IFlowContext
): IFlowReturnType => {
	let validations = flow.validations || [];
	let errorMsgs: string[] = [];
	switch (flow.type) {
		case "enum":
		case "boolean":
		case "number":
		case "string": {
			errorMsgs = [
				...errorMsgs,
				...(validations
					.map(({ logic, err }) => {
						const result = !!execJSONExpression(logic, data);
						return result ? null : err || "Error";
					})
					.filter((v) => v !== null) as string[]),
			];
		}
	}
	return {
		errors: [{ msgs: errorMsgs, refPath: flowContext.refPath }],
		isValid: errorMsgs.length === 0,
	};
};
