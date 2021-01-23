import { IKeyPath } from "../../helper/immutable";
import { IFlowSchema } from "../flow";
import { IObjectProperty, IObjectType } from "../flow/composite/object";
import { IIfConditionType } from "../flow/logic/if";
import { ISwitchType } from "../flow/logic/switch";
import { ISimpleType } from "../flow/simple";

type IBlock = IIfConditionType | ISwitchType;
export function getSchemaByPath(
	schema: IFlowSchema | IObjectType,
	path: IKeyPath
): IObjectType | ISimpleType | null {
	let walk: typeof schema | IObjectType | null = schema;
	for (const key of path) {
		if (walk?.type !== "object") return null;
		walk = walk.properties.find((prop) => {
			if (prop.type === "if" || prop.type === "switch") return false;
			return prop.key === key;
		}) as any;
		if (!walk) walk = null;
	}
	return walk;
}

export function getSchemaAtBlock(schema: IFlowSchema, blockId: string) {
	function walk(
		schema: IObjectType | IIfConditionType | ISwitchType,
		key: IKeyPath
	): IBlock | null {
		switch (schema.type) {
			case "object": {
				for (const property of schema.properties) {
					switch (property.type) {
						case "object": {
							const result = walk(property, [
								...key,
								property.key,
							]);
							if (result) return result;
							break;
						}
						case "if":
						case "switch": {
							const result = walk(property, key);
							if (result) return result;
							break;
						}
					}
				}
				break;
			}
			case "if": {
				if (schema.blockId === blockId) return schema;
				const trueResult = walk(
					{ type: "object", properties: schema.true },
					key
				);
				if (trueResult) return trueResult;
				if (!schema.false) {
					break;
				}
				return walk({ type: "object", properties: schema.false }, key);
			}
			case "switch": {
				if (schema.blockId === blockId) return schema;
				for (const c of Object.keys(schema.cases)) {
					const result = walk(
						{ type: "object", properties: schema.cases[c] },
						key
					);
					if (result) return result;
				}
				break;
			}
		}
		return null;
	}
	return walk(schema, []);
}
