import { IFlowSchema } from "./index";
import { IJSONExpression } from "..";
import { IKeyPath } from "../helper/immutable";
import {
	IObjectPropertyAndCondition,
	IObjectType,
} from "./flow/composite/object";
import { IIfConditionType } from "./flow/logic/if";
import { ISwitchType } from "./flow/logic/switch";
import { ISimpleType } from "./flow/simple";

type ICondPath = {
	expr: IJSONExpression;
	value: string | boolean | number;
}[];
interface IBlockDetails {
	condPath: ICondPath;
	schema: ISimpleType;
}
export interface IBlocks {
	[path: string]: IBlockDetails[] | undefined;
}
export function compileSchema(schema: IFlowSchema): IBlocks {
	const blocks: IBlocks = {};

	function compile(
		schema: IObjectType | IIfConditionType | ISwitchType | ISimpleType,
		condPath: ICondPath,
		dataPath: IKeyPath
	) {
		function compileProperty(
			prop: IObjectPropertyAndCondition,
			condPath: ICondPath,
			dataPath: IKeyPath
		) {
			switch (prop.type) {
				case "if": {
					compile(prop, condPath, dataPath);
					break;
				}
				case "switch": {
					compile(prop, condPath, dataPath);
					break;
				}
				case "object": {
					prop.properties.forEach((v) =>
						compile(v, condPath, [...dataPath, prop.key])
					);
					break;
				}
				default: {
					compile(prop, condPath, [...dataPath, prop.key]);
					break;
				}
			}
		}
		switch (schema.type) {
			case "object": {
				for (const prop of schema.properties) {
					compileProperty(prop, condPath, dataPath);
				}
				break;
			}
			case "if": {
				schema.true.forEach((prop) =>
					compileProperty(
						prop,
						[
							...condPath,
							{
								expr: schema.cond,
								value: true,
							},
						],
						dataPath
					)
				);
				schema.false?.forEach((prop) =>
					compileProperty(
						prop,
						[
							...condPath,
							{
								expr: schema.cond,
								value: false,
							},
						],
						dataPath
					)
				);
				break;
			}
			case "switch": {
				Object.entries(schema.cases).forEach(([key, value]) => {
					value.forEach((prop) => {
						compile(
							prop,
							[...condPath, { expr: schema.switch, value: key }],
							dataPath
						);
					});
				});
				break;
			}
			default: {
				const path = dataPath.join(".");
				if (!blocks[path]) {
					blocks[path] = [];
				}
				blocks[path]?.push({ condPath, schema });
				break;
			}
		}
	}
	compile(schema, [], []);
	return blocks;
}
