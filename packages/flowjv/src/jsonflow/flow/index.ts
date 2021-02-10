import { IObjectType, validateObjectType } from "./composite/object";
import { IFlowConfig, IPayload } from "./helper";

export type IFlowSchema<
	IData = {},
	IContext = {},
	A = {},
	B = {},
	C = {},
	D = {},
	E = {}
> = IObjectType<IData, IContext, A, B, C, D, E>;

export const validateJSONFlow = (
	schema: IFlowSchema,
	payload: IPayload,
	config: IFlowConfig
) => {
	return validateObjectType(schema, { ...payload, refPath: [] }, config);
};
