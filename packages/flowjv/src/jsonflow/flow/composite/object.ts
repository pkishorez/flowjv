import { IFlowConfig, IPayload, IValidationResult } from "../helper";
import { IKeyPath } from "../../../helper/immutable";
import { ISimpleType, validateSimpleType } from "../simple";
import { IIfConditionType, validateIfCondition } from "../logic/if";
import { ISwitchType, validateSwitchCondition } from "../logic/switch";
import { IArrayType, validateArrayType } from "./array";

export type IObjectCondition<
	IData = {},
	IContext = {},
	A = {},
	B = {},
	C = {},
	D = {},
	E = {},
	F = {}
> =
	| IIfConditionType<IData, IContext, A, B, C, D, E, F>
	| ISwitchType<IData, IContext, A, B, C, D, E, F>;
export type IObjectProperty<
	IData = {},
	IContext = {},
	A = {},
	B = {},
	C = {},
	D = {},
	E = {},
	F = {}
> = (
	| ISimpleType<IData, IContext, A, B, C, D, E>
	| IObjectType<IData, IContext, A, B, C, D, E, F>
	| IArrayType<IData, IContext, A, B, C, D, E, F>
) & {
	key: string;
};

export type IObjectPropertyAndCondition<
	IData = {},
	IContext = {},
	A = {},
	B = {},
	C = {},
	D = {},
	E = {},
	F = {}
> =
	| IObjectCondition<IData, IContext, A, B, C, D, E>
	| IObjectProperty<IData, IContext, A, B, C, D, E>;

export type IObjectType<
	IData = {},
	IContext = {},
	A = {},
	B = {},
	C = {},
	D = {},
	E = {},
	F = {}
> = {
	type: "object";
	properties: (
		| IObjectProperty<IData, IContext, A, B, C, D, E, F>
		| IObjectCondition<IData, IContext, A, B, C, D, E, F>
	)[];
};

export type IObjectPayload = IPayload & {
	refPath: IKeyPath;
};

export function validateObjectType(
	schema: IObjectType,
	payload: IObjectPayload,
	config: IFlowConfig
): IValidationResult {
	return validateObjectProperties(schema.properties, payload, config);
}

export function validateObjectProperties(
	properties: IObjectType["properties"],
	payload: IObjectPayload,
	config: IFlowConfig
): IValidationResult {
	let errors: IValidationResult["errors"] = [];

	for (const property of properties) {
		switch (property.type) {
			case "object": {
				const refPath = [...payload.refPath, property.key];
				const result = validateObjectType(
					property,
					{ ...payload, refPath },
					config
				);
				errors = [...errors, ...result.errors];
				break;
			}
			case "if": {
				const result = validateIfCondition(property, payload, config);
				errors = [...errors, ...result.errors];
				break;
			}
			case "switch": {
				const result = validateSwitchCondition(
					property,
					payload,
					config
				);
				errors = [...errors, ...result.errors];
				break;
			}
			case "array": {
				const refPath = [...payload.refPath, property.key];
				const result = validateArrayType(
					property,
					{ ...payload, refPath },
					config
				);
				errors = [...errors, ...result.errors];
				break;
			}
			default: {
				const refPath = [...payload.refPath, property.key];
				const result = validateSimpleType(
					property,
					{ ...payload, refPath },
					config
				);
				!result.isValid &&
					errors.push({ key: refPath, msgs: result.errors });
				if (!config.aggressive) {
					break;
				}
			}
		}
	}
	return { isValid: errors.length === 0, errors, payload };
}
