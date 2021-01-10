import { IObjectType, validateObjectType } from "./composite/object";
import { IFlowConfig, IPayload } from "./helper";

export type IFlowSchema = IObjectType;

export const validateJSONFlow = <IData = any, IContext = any>(
	schema: IObjectType,
	payload: IPayload<IData, IContext>,
	config: IFlowConfig
) => {
	return validateObjectType(schema, { ...payload, refPath: [] }, config);
};

export const flowSchema = (flowSchema: IFlowSchema) =>
	flowSchema as IFlowSchema;
