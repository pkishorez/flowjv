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
import { getDependencies } from "../jsonexpression";

type ICondPath = {
	expr: IJSONExpression;
	value: string | boolean | number;
}[];
interface IBlockDetails {
	condPath: ICondPath;
	schema: ISimpleType;
	deps: ReturnType<typeof getDependencies>;
}
export interface IBlocks {
	[path: string]:
		| { items: IBlockDetails[] | undefined; deps: IBlockDetails["deps"] }
		| undefined;
}
export function compileSchema(schema: IFlowSchema): IBlocks {
	const blocks: IBlocks = {};

	function combineDependencies(
		d1: IBlockDetails["deps"],
		d2: IBlockDetails["deps"]
	) {
		return d1 && d2
			? {
					data: [...d2?.data, ...d1.data],
					context: [...d2?.context, ...d1.context],
			  }
			: null;
	}
	function compile(
		schema: IObjectType | IIfConditionType | ISwitchType | ISimpleType,
		condPath: ICondPath,
		dataPath: IKeyPath,
		deps: IBlockDetails["deps"]
	) {
		function compileProperty(
			prop: IObjectPropertyAndCondition,
			condPath: ICondPath,
			dataPath: IKeyPath,
			deps: IBlockDetails["deps"]
		) {
			switch (prop.type) {
				case "if": {
					compile(prop, condPath, dataPath, deps);
					break;
				}
				case "switch": {
					compile(prop, condPath, dataPath, deps);
					break;
				}
				case "object": {
					for (const p of prop.properties) {
						compileProperty(
							p,
							condPath,
							[...dataPath, prop.key],
							deps
						);
					}
					break;
				}
				default: {
					compile(prop, condPath, [...dataPath, prop.key], deps);
					break;
				}
			}
		}
		switch (schema.type) {
			case "object": {
				for (const prop of schema.properties) {
					compileProperty(prop, condPath, dataPath, deps);
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
						dataPath,
						combineDependencies(deps, getDependencies(schema.cond))
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
						dataPath,
						combineDependencies(deps, getDependencies(schema.cond))
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
							dataPath,
							combineDependencies(
								deps,
								getDependencies(schema.switch)
							)
						);
					});
				});
				break;
			}
			default: {
				const path = dataPath.join(".");
				if (!blocks[path]) {
					blocks[path] = {
						items: [],
						deps: { data: [], context: [] },
					};
				}
				const allDeps =
					schema.validations?.reduce(
						(agg, v) =>
							combineDependencies(agg, getDependencies(v.logic)),
						deps
					) ?? deps;
				blocks[path]?.items?.push({ condPath, schema, deps: allDeps });
				break;
			}
		}
	}
	compile(schema, [], [], { data: [], context: [] });

	return Object.entries(blocks).reduce(
		(agg, [key, value]) => ({
			...agg,
			[key]: {
				items: value?.items,
				deps: value?.items?.reduce(
					(agg, v) => combineDependencies(agg, v.deps),
					<IBlockDetails["deps"]>{ data: [], context: [] }
				),
			},
		}),
		{}
	);
}
