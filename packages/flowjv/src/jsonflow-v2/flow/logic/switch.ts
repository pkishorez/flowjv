import { IFlowConfig, IPayload, IValidationResult } from "../helper";
import { IKeyPath } from "../../../helper/immutable";
import { IJSONExpression } from "../../..";
import { IObjectType, validateObjectType } from "../composite/object";
import { execJSONExpression } from "../../../jsonexpression";

export type ISwitchType = {
	type: "switch";
	switch: IJSONExpression;
	cases: {
		[key: string]: IObjectType;
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
		return validateObjectType(schema.cases[result as any], payload, config);
	}
	return { isValid: true, errors: [] };
}
