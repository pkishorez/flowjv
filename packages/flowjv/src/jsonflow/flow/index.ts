import { IObjectType, validateObjectType } from "./composite/object";
import { IFlowConfig, IPayload } from "./helper";

export type IFlowSchema<
	A = any,
	B = any,
	C = any,
	D = any,
	E = any
> = IObjectType<A, B, C, D, E>;

export const validateJSONFlow = <IData = any, IContext = any>(
	schema: IObjectType,
	payload: IPayload<IData, IContext>,
	config: IFlowConfig
) => {
	return validateObjectType(schema, { ...payload, refPath: [] }, config);
};
