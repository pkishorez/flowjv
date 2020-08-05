import {
	IExpression,
	execJSONExpression,
	IJSONExpressionData,
} from "../../../jsonexpression";
import { IFlowReturnType, IFlowContext, IFlowOptions } from "../../index";
import get from "lodash/get";

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
) & {
	isRequired?: boolean;
	readOnly?: IExpression;
	validations?: IValidation[];
	errTypeMsg?: string;
	errRequiredMsg?: string;
};

export const execPrimitiveFlow = <IData, IContext>(
	flow: IAtom,
	data: IJSONExpressionData<IData, IContext>,
	options?: IFlowOptions
): IFlowReturnType => {
	let validations = flow.validations || [];
	let errorMsgs: string[] = [];

	const ref = get(data.data, data.refPath?.join(".") || "");
	if (options?.typeCheck) {
		switch (flow.type) {
			case "boolean":
			case "number":
			case "string": {
				if (ref && typeof ref !== flow.type) {
					errorMsgs.push(
						flow.errTypeMsg ||
							`TypeError: value for key ${data.refPath?.join(
								"."
							)} is expected to be of type ${flow.type}`
					);
				}
				break;
			}
			case "enum": {
				if (ref && !flow.items.find((v) => v.value === ref)) {
					errorMsgs.push(
						flow.errTypeMsg ||
							`EnumError: value for key ${data.refPath?.join(
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
				if (ref == null) {
					errorMsgs.push(flow.errRequiredMsg || `Value is required.`);
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
		errors: [{ msgs: errorMsgs, refPath: data.refPath || [] }],
		isValid: errorMsgs.length === 0,
	};
};
