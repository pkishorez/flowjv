import {
	ErrorMsgs,
	executeValidations,
	IFlowConfig,
	IPayload,
	IValidation,
} from "../helper";
import { IExpression } from "flowjv/src/jsonexpression";
import { get, IKeyPath } from "../../../helper/immutable";

interface ISimpleCommon {
	isRequired?: boolean;
	readOnly?: IExpression;
	validations?: IValidation[];
	errMsgs?: {
		type?: string;
		required?: string;
	};
}

export type ISimpleType<
	IStringUI = any,
	INumberUI = any,
	IBooleanUI = any,
	IEnumUI = any,
	ICustomUI = any
> = (
	| ({
			type: "string";
			label?: string;
	  } & { ui?: IStringUI })
	| ({
			type: "number";
			label?: string;
	  } & { ui?: INumberUI })
	| ({
			type: "boolean";
			label?: string;
	  } & { ui?: IBooleanUI })
	| ({
			type: "enum";
			label?: string;
			items: { label?: string; value: any }[];
	  } & { ui?: IEnumUI })
	| ({
			type: "custom";
	  } & { ui?: ICustomUI })
) &
	ISimpleCommon;

export type ISimplePayload = IPayload & { refPath: IKeyPath };

export function validateSimpleType(
	schema: ISimpleType,
	payload: ISimplePayload,
	config: IFlowConfig
): { isValid: boolean; errors: string[] } {
	const value = get(payload.data, payload.refPath);
	const errors: string[] = [];

	// Required check
	const isRequiredError =
		(schema.isRequired && schema.type === "enum"
			? schema.items.find(
					(v) => v.value === get(payload.data, payload.refPath)
			  ) === undefined
			: get(payload.data, payload.refPath) === undefined) &&
		schema.errMsgs?.required;

	isRequiredError && errors.push(isRequiredError);

	// Type check
	if (config.typeCheck) {
		let typeError: string | false | undefined;
		switch (schema.type) {
			case "string":
			case "number":
			case "boolean":
				const type = typeof value;
				typeError =
					config.typeCheck &&
					type !== schema.type &&
					(schema.errMsgs?.type || ErrorMsgs.type);
				break;
			case "enum":
				typeError =
					!Array.isArray(value) &&
					(schema.errMsgs?.type || ErrorMsgs.type);
		}
		typeError && errors.push(typeError);
	}

	// Validations
	schema.validations &&
		errors.push(...executeValidations(schema.validations, payload));
	console.log("ERRORS : ", value, errors);
	return {
		isValid: errors.length === 0,
		errors,
	};
}
