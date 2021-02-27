import { IObjectType, validateObjectType } from "./composite/object";
import { IFlowConfig, IPayload } from "./helper";

export type IFlowSchema<
	IData = {},
	IContext = {},
	A = {},
	B = {},
	C = {},
	D = {},
	E = {},
	F = {}
> = IObjectType<IData, IContext, A, B, C, D, E, F>;

export const validateJSONFlow = (
	schema: IFlowSchema,
	payload: IPayload,
	config: IFlowConfig
) => {
	return validateObjectType(schema, { ...payload, refPath: [] }, config);
};
