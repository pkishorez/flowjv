import {
	IExpression,
	execJSONExpression,
	IJSONExpressionData,
} from "../../../jsonlogic";
import { IFlowReturnType, IFlowContext, IFlowOptions } from "../../index";

export interface IValidation {
	logic: IExpression;
	err: string;
}
export type IAtom = (
	| {
			type: "string" | "number" | "boolean";
			uiType?: "number" | "text" | "password";
			label?: string;
	  }
	| {
			type: "enum";
			uiType?: "select" | "radio";
			label?: string;
			items: { label?: string; value: any }[];
	  }
	| {
			type: "custom";
	  }
) & { isRequired?: boolean; validations?: IValidation[] };

export const execPrimitiveFlow = <IData, IContext>(
	flow: IAtom,
	data: IJSONExpressionData<IData, IContext>,
	flowContext: IFlowContext,
	options?: IFlowOptions
): IFlowReturnType => {
	let validations = flow.validations || [];
	let errorMsgs: string[] = [];

	if (options?.typeCheck) {
		switch (flow.type) {
			case "boolean":
			case "number":
			case "string": {
				if (data.ref && typeof data.ref !== flow.type) {
					errorMsgs.push(
						`TypeError: value for key ${flowContext.refPath.join(
							"."
						)} is expected to be of type ${flow.type}`
					);
				}
				break;
			}
			case "enum": {
				if (data.ref && !flow.items.find((v) => v.value === data.ref)) {
					errorMsgs.push(
						`EnumError: value for key ${flowContext.refPath.join(
							"."
						)} should be one of the enum defined.`
					);
				}
				break;
			}
		}
	}
	if (flow.isRequired) {
		switch (flow.type) {
			case "boolean":
			case "number":
			case "string":
			case "enum": {
				if (data.ref === undefined) {
					errorMsgs.push(`Value is required.`);
				}
				break;
			}
		}
	}

	switch (flow.type) {
		case "enum":
		case "boolean":
		case "number":
		case "string":
		case "custom": {
			errorMsgs.push(
				...(validations
					.map(({ logic, err }) => {
						const result = !!execJSONExpression(logic, data);
						return result ? null : err || "Error";
					})
					.filter((v) => v !== null) as string[])
			);
			break;
		}
	}
	return {
		errors: [{ msgs: errorMsgs, refPath: flowContext.refPath }],
		isValid: errorMsgs.length === 0,
	};
};
