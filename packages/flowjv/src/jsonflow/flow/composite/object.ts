import { IFlowConfig, IPayload, IValidationResult } from "../helper";
import { IKeyPath } from "../../../helper/immutable";
import { ISimpleType, validateSimpleType } from "../simple";
import { IIfConditionType, validateIfCondition } from "../logic/if";
import { ISwitchType, validateSwitchCondition } from "../logic/switch";

export type IObjectCondition = IIfConditionType | ISwitchType;
export type IObjectProperty = (ISimpleType | IObjectType) & {
	key: string;
};

export type IObjectType = {
	type: "object";
	properties: (IObjectProperty | IObjectCondition)[];
};

export type IObjectPayload<IData, IContext> = IPayload<IData, IContext> & {
	refPath: IKeyPath;
};

export function validateObjectType<IData = any, IContext = any>(
	schema: IObjectType,
	payload: IObjectPayload<IData, IContext>,
	config: IFlowConfig
): IValidationResult {
	return validateObjectProperties(schema.properties, payload, config);
}

export function validateObjectProperties<IData = any, IContext = any>(
	properties: IObjectType["properties"],
	payload: IObjectPayload<IData, IContext>,
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
	return { isValid: errors.length === 0, errors };
}
