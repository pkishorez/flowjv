import { ErrorMsgs, executeValidations } from "../helper";
import type { IFlowConfig, IPayload, IValidation } from "../helper";
import type { IKeyPath } from "../../../helper/immutable";
import { get } from "../../../helper/immutable";

export interface ISimpleCommon<IData = {}, IContext = {}> {
	isRequired?: boolean;
	validations?: IValidation<IData, IContext>[];
	errMsgs?: {
		type?: string;
		required?: string;
	};
}

export type ISimpleStringType<
	IData = {},
	IContext = {},
	uiType = {}
> = uiType & {
	type: "string";
	label?: string;
} & ISimpleCommon<IData, IContext>;

export type ISimpleNumberType<
	IData = {},
	IContext = {},
	uiType = {}
> = uiType & {
	type: "number";
	label?: string;
} & ISimpleCommon<IData, IContext>;

export type ISimpleBooleanType<
	IData = {},
	IContext = {},
	uiType = {}
> = uiType & {
	type: "boolean";
	label?: string;
} & ISimpleCommon<IData, IContext>;

export type ISimpleEnumType<IData = {}, IContext = {}, uiType = {}> = uiType & {
	type: "enum";
	label?: string;
	items: { label?: string; value: any }[];
} & ISimpleCommon<IData, IContext>;

export type ISimpleCustomType<
	IData = {},
	IContext = {},
	uiType = {}
> = uiType & {
	type: "custom";
} & ISimpleCommon<IData, IContext>;

export type ISimpleType<
	IData = {},
	IContext = {},
	stringUI = {},
	numberUI = {},
	booleanUI = {},
	enumUI = {},
	customUI = {}
> =
	| ISimpleStringType<IData, IContext, stringUI>
	| ISimpleNumberType<IData, IContext, numberUI>
	| ISimpleBooleanType<IData, IContext, booleanUI>
	| ISimpleEnumType<IData, IContext, enumUI>
	| ISimpleCustomType<IData, IContext, customUI>;

export type ISimplePayload = IPayload & { refPath: IKeyPath };

export function validateSimpleType(
	schema: ISimpleType,
	payload: ISimplePayload,
	config: IFlowConfig
): { isValid: boolean; errors: string[] } {
	const value = get(payload.data, payload.refPath);
	const errors: string[] = [];

	// Required check
	const isRequiredError = schema.isRequired
		? get(payload.data, payload.refPath) === undefined
		: false;

	isRequiredError &&
		errors.push(schema.errMsgs?.required ?? ErrorMsgs.required);

	// Type check
	if (config.typeCheck) {
		let typeError: string | false | undefined;
		switch (schema.type) {
			case "string":
			case "number":
			case "boolean":
				const type = typeof value;
				typeError =
					value !== undefined &&
					config.typeCheck &&
					type !== schema.type &&
					(schema.errMsgs?.type ?? ErrorMsgs.type);
				break;
			case "enum":
				typeError =
					value !== undefined &&
					schema.items.findIndex((v) => v.value === value) === -1 &&
					(schema.errMsgs?.type ?? ErrorMsgs.type);
		}
		typeError && errors.push(typeError);
	}

	// Validations
	schema.validations &&
		errors.push(...executeValidations(schema.validations, payload));
	return {
		isValid: errors.length === 0,
		errors,
	};
}
