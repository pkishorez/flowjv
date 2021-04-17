import { IFlowConfig, IPayload, IValidationResult } from "../helper";
import { IKeyPath, unset } from "../../../helper/immutable";
import {
	IObjectPropertyAndCondition,
	validateObjectProperties,
} from "../composite/object";
import { execJSONExpression, IJSONExpression } from "../../../jsonexpression";

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
		[key: string]: IObjectPropertyAndCondition<
			IData,
			IContext,
			A,
			B,
			C,
			D,
			E,
			F
		>[];
	};
};

export type ISwitchPayload = IPayload & { refPath: IKeyPath };

export function validateSwitchCondition(
	schema: ISwitchType,
	payload: ISwitchPayload,
	config: IFlowConfig
): IValidationResult {
	const result = execJSONExpression(schema.switch, payload);

	if (config.normalize) {
		Object.keys(schema.cases).forEach((case_) => {
			if (case_ !== result) {
				schema.cases[case_].forEach((prop) => {
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
		});
	}
	if (schema.cases[result as any]) {
		return validateObjectProperties(
			schema.cases[result as string],
			payload,
			config
		);
	}
	return { isValid: true, errors: [], payload };
}
