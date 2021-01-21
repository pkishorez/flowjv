import { IJSONExpression } from "../..";
import { IKeyPath } from "../../helper/immutable";
import { execJSONExpression } from "../../jsonexpression";
import { ISimplePayload } from "./simple";

export interface IValidation {
	logic: IJSONExpression;
	err: string;
}
export interface IValidationResult {
	isValid: boolean;
	errors: { key: IKeyPath; msgs: string[] }[];
}

export interface IPayload<IData = any, IContext = any> {
	data: IData;
	context?: IContext;
}

export interface IFlowConfig {
	aggressive?: boolean;
	typeCheck?: boolean;
	enforseSchema?: boolean;
}

// Error Messages
export const ErrorMsgs = {
	required: `Value is required`,
	type: `Type of value expected does not match`,
};

// Execute Validations
export function executeValidation(
	validation: IValidation,
	payload: ISimplePayload
) {
	const result = execJSONExpression(validation.logic, payload);
	return !result ? validation.err : null;
}
export function executeValidations(
	validations: IValidation[],
	payload: ISimplePayload
) {
	return validations
		.map((validation) => executeValidation(validation, payload))
		.filter((v) => v !== null) as string[];
}

let _id = 0;
export function uniqueId(prefix = "") {
	return `${prefix}${_id++}`;
}
