import { IKeyPath } from "../helper/immutable";
import { IFlowSchema } from "./flow";
import { IObjectType } from "./flow/composite/object";
import { IIfConditionType } from "./flow/logic/if";
import { ISwitchType } from "./flow/logic/switch";
import { ISimpleType } from "./flow/simple";

type IBlockExtension = {
	blockId: string;
};
type IAtom =
	| IObjectType<IBlockExtension>
	| ISimpleType<IBlockExtension>
	| IIfConditionType<IBlockExtension>
	| ISwitchType<IBlockExtension>;
export type IBlock = IAtom;

export function compileSchema(schema: IFlowSchema, key: IKeyPath = []) {
	let blocks: IBlock[] = [];
	switch (schema.type) {
		case "object":
			break;

		default:
			break;
	}
}
