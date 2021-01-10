import { IFlowConfig, IPayload, IValidationResult } from "../helper";
import { IKeyPath } from "../../../helper/immutable";
import { ISimpleType, validateSimpleType } from "../simple";
import { IIfConditionType, validateIfCondition } from "../logic/if";
import { ISwitchType, validateSwitchCondition } from "../logic/switch";

type IObjectProperty = (
	| ISimpleType
	| IObjectType
	| IIfConditionType
	| ISwitchType
) & {
	key: string;
};
export type IObjectType = {
	type: "object";
	properties: IObjectProperty[];
};

export type IObjectPayload<IData, IContext> = IPayload<IData, IContext> & {
	refPath: IKeyPath;
};

export function validateObjectType<IData = any, IContext = any>(
	schema: IObjectType,
	payload: IObjectPayload<IData, IContext>,
	config: IFlowConfig
): IValidationResult {
	let errors: IValidationResult["errors"] = [];
	for (const property of schema.properties) {
		const refPath = [...payload.refPath, property.key];
		switch (property.type) {
			case "object": {
				const result = validateObjectType(
					property,
					{ ...payload, refPath },
					config
				);
				errors = [...errors, ...result.errors];
				break;
			}
			case "if": {
				const result = validateIfCondition(
					property,
					{ ...payload, refPath },
					config
				);
				errors = [...errors, ...result.errors];
				break;
			}
			case "switch": {
				const result = validateSwitchCondition(
					property,
					{ ...payload, refPath },
					config
				);
				errors = [...errors, ...result.errors];
				break;
			}
			default: {
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
