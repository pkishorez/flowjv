import { IFlowConfig, IPayload, IValidationResult } from "../helper";
import { IKeyPath } from "../../../helper/immutable";
import {
	IObjectCondition,
	IObjectProperty,
	validateObjectProperties,
} from "../composite/object";
import {
	execJSONExpression,
	IExpression as IJSONExpression,
} from "../../../jsonexpression";

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
	true: (
		| IObjectProperty<IData, IContext, A, B, C, D, E, F>
		| IObjectCondition<IData, IContext, A, B, C, D, E, F>
	)[];
	false?: (
		| IObjectProperty<IData, IContext, A, B, C, D, E, F>
		| IObjectCondition<IData, IContext, A, B, C, D, E, F>
	)[];
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
		return validateObjectProperties(schema.true, payload, config);
	}
	if (schema.false) {
		return validateObjectProperties(schema.false, payload, config);
	}
	return { isValid: true, errors: [] };
}
