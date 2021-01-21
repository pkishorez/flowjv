import { IObjectType, validateObjectType } from "./composite/object";
import { IFlowConfig, IPayload } from "./helper";
import { IIfConditionType } from "./logic/if";
import { ISwitchType } from "./logic/switch";
import { ISimpleType } from "./simple";

export type IFlowSchema = IObjectType;
export type IFlowAtom =
	| IObjectType
	| IIfConditionType
	| ISwitchType
	| ISimpleType;

export const validateJSONFlow = <IData = any, IContext = any>(
	schema: IObjectType,
	payload: IPayload<IData, IContext>,
	config: IFlowConfig
) => {
	return validateObjectType(schema, { ...payload, refPath: [] }, config);
};
