import { IFlowConfig, IPayload, IValidationResult } from "../helper";
import { IKeyPath, unset } from "../../../helper/immutable";
import {
	IObjectPropertyAndCondition,
	validateObjectProperties,
} from "../composite/object";
import { execJSONExpression, IJSONExpression } from "../../../jsonexpression";

export type IIfConditionType<
	IData = {},
	IContext = {},
	A = {},
	B = {},
	C = {},
	D = {},
	E = {},
	F = {}
> = {
	type: "if";
	cond: IJSONExpression<IData, IContext>;
	true: IObjectPropertyAndCondition<IData, IContext, A, B, C, D, E, F>[];
	false?: IObjectPropertyAndCondition<IData, IContext, A, B, C, D, E, F>[];
};

export type IIfPayload = IPayload & { refPath: IKeyPath };

export function validateIfCondition(
	schema: IIfConditionType,
	payload: IIfPayload,
	config: IFlowConfig
): IValidationResult {
	const cond = execJSONExpression(schema.cond, payload);

	if (config.normalize) {
		schema[cond ? "false" : "true"]?.map((prop) => {
			if (prop.type === "if" || prop.type === "switch") {
				validateObjectProperties([prop], payload, config);
			} else {
				payload.data = unset(payload.data, [
					...payload.refPath,
					prop.key,
				]);
			}
		});
	}
	if (!!cond) {
		// execute true object.
		return validateObjectProperties(schema.true, payload, config);
	}
	if (schema.false) {
		return validateObjectProperties(schema.false, payload, config);
	}
	return { isValid: true, errors: [], payload };
}
