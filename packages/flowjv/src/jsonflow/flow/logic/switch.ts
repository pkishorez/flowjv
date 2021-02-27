import { IFlowConfig, IPayload, IValidationResult } from "../helper";
import { IKeyPath } from "../../../helper/immutable";
import { IObjectProperty, validateObjectProperties } from "../composite/object";
import {
	execJSONExpression,
	IExpression as IJSONExpression,
} from "../../../jsonexpression";

export type ISwitchType<
	IData = {},
	IContext = {},
	A = {},
	B = {},
	C = {},
	D = {},
	E = {},
	F = {}
> = {
	type: "switch";
	blockId?: string;
	switch: IJSONExpression<IData, IContext>;
	cases: {
		[key: string]: IObjectProperty<IData, IContext, A, B, C, D, E, F>[];
	};
};

export type ISwitchPayload = IPayload & { refPath: IKeyPath };

export function validateSwitchCondition(
	schema: ISwitchType,
	payload: ISwitchPayload,
	config: IFlowConfig
): IValidationResult {
	const result = execJSONExpression(schema.switch, payload);
	if (schema.cases[result as any]) {
		return validateObjectProperties(
			schema.cases[result as string],
			payload,
			config
		);
	}
	return { isValid: true, errors: [] };
}
