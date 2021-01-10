import { IFlowSchema } from "./flow";
import { IObjectType } from "./flow/composite/object";
import { uniqueId } from "./flow/helper";
import { IIfConditionType } from "./flow/logic/if";
import { ISwitchType } from "./flow/logic/switch";
import { ISimpleType } from "./flow/simple";

type IAtom = IObjectType | ISimpleType | IIfConditionType | ISwitchType;
type IBlock = IAtom & {
	blockId: string;
};

export function compileSchema(schema: IFlowSchema) {
	const blockMap = compileBlock(schema).reduce(
		(acc, v) => ({ ...acc, [v.blockId]: v }),
		{}
	);
}

function compileBlock(block: IAtom): IBlock[] {
	const blocks: IBlock[] = [];
	switch (block.type) {
		case "object":
			blocks.push({ ...block, blockId: uniqueId() });
			block.properties.forEach((prop) =>
				blocks.push(...compileBlock(prop))
			);
			break;
		case "if":
			blocks.push(...compileBlock(block.true));
			break;
		case "switch":
			for (const c of Object.keys(block.cases)) {
				blocks.push(...compileBlock(block.cases[c]));
			}
			break;
		default:
			blocks.push({ ...block, blockId: uniqueId() });
			break;
	}
	return blocks;
}
