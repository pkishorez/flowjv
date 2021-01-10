import { IFlowConfig, IPayload, IValidationResult } from "../helper";
import { IKeyPath } from "../../../helper/immutable";
import { IJSONExpression } from "../../..";
import { IObjectType, validateObjectType } from "../composite/object";
import { execJSONExpression } from "../../../jsonexpression";

export type IIfConditionType = {
	type: "if";
	cond: IJSONExpression;
	true: IObjectType;
	false?: IObjectType;
};

export type IIfPayload = IPayload & { refPath: IKeyPath };

export function validateIfCondition(
	schema: IIfConditionType,
	payload: IIfPayload,
	config: IFlowConfig
): IValidationResult {
	const cond = execJSONExpression(schema.cond, payload);
	if (!!cond) {
		// execute true object.
		return validateObjectType(schema.true, payload, config);
	}
	if (schema.false) {
		return validateObjectType(schema.false, payload, config);
	}
	return { isValid: true, errors: [] };
}
