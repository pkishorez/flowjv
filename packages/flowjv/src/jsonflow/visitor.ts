import { IFlowSchema } from ".";
import { IAtom } from "./blocks/flowatoms";
import {
	IObjectIfBlock,
	IObjectSwitchBlock,
	IObjectFlow,
} from "./blocks/object";

export const lookup = {
	atom(fschema: IFlowSchema, path: string[]): IAtom | null {
		for (let atom of traverse(fschema)) {
			if (
				atom.type === "primitive" &&
				atom.ref.join(".") === path.join(".")
			) {
				return atom.schema;
			}
		}
		return null;
	},
	block(
		fschema: IFlowSchema,
		blockId: string
	): { block: IObjectIfBlock | IObjectSwitchBlock | null; ref: string[] } {
		for (let atom of traverse(fschema)) {
			if (atom.type === "block" && blockId === atom.blockId) {
				return { block: atom.schema, ref: atom.ref };
			}
		}
		return { block: null, ref: [] };
	},
};

type ITraverseGenerator = Generator<
	| { type: "primitive"; ref: string[]; schema: IAtom }
	| {
			type: "block";
			blockId?: string;
			ref: string[];
			schema: IObjectIfBlock | IObjectSwitchBlock;
	  },
	void,
	any
>;
export function* traverse(flowSchema: IFlowSchema): ITraverseGenerator {
	function* traverseProperties(
		properties: IObjectFlow["properties"],
		ref: string[]
	): ITraverseGenerator {
		for (let v of properties) {
			switch (v.type) {
				case "object": {
					yield* traverseProperties(v.properties, [...ref, v.key]);
					break;
				}
				case "if": {
					yield { type: "block", schema: v, blockId: v.blockId, ref };
					yield* traverseProperties(v.true, ref);
					v.false && (yield* traverseProperties(v.false, ref));
					break;
				}
				case "switch": {
					yield { type: "block", schema: v, blockId: v.blockId, ref };
					for (let value of Object.values(v.cases)) {
						yield* traverseProperties(value, ref);
					}
					break;
				}
				default: {
					yield {
						type: "primitive",
						ref: [...ref, v.key],
						schema: v,
					};
					break;
				}
			}
		}
		return;
	}
	yield* traverseProperties(flowSchema.properties, []);
}
