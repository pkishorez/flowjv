import {
	IExpression,
	IJSONExpressionData,
	execJSONExpression,
} from "../../jsonlogic";
import { IFlowReturnType, IFlowOptions } from "../index";
import get from "lodash/get";
import unset from "lodash/unset";
import { IFlowContext } from "../index";
import { IAtom, execPrimitiveFlow } from "./flowatoms";

export type IObjectIfBlock = {
	type: "if";
	blockId?: string;
	cond: IExpression;
	true: IObjectProperty[];
	false?: IObjectProperty[];
};
export type IObjectSwitchBlock = {
	type: "switch";
	blockId?: string;
	cond: IExpression;
	cases: {
		[key: string]: IObjectProperty[];
	};
};

type IObjectProperty = (IAtom | IObjectFlow) & {
	key: string;
	ignoreKey?: IExpression;
};
export type IObjectFlow = {
	type: "object";
	properties: (IObjectProperty | IObjectIfBlock | IObjectSwitchBlock)[];
};

export const execObjectFlow = <IData, IContext>(
	flow: IObjectFlow,
	data: IJSONExpressionData<IData, IContext>,
	flowContext: IFlowContext,
	options?: IFlowOptions
): IFlowReturnType => {
	const { properties } = flow;
	let errorStore: IFlowReturnType = { errors: [], isValid: true };
	for (let config of properties) {
		if (config.type === "switch") {
			const cond = execJSONExpression(config.cond, data) as string;
			if (options?.enforceSchema) {
				// Delete keys of other cases.
				for (const v of Object.keys(config.cases)) {
					if (v !== cond) {
						config.cases[v].forEach((prop) =>
							unset(data.data, [...flowContext.refPath, prop.key])
						);
					}
				}
			}
			const flow = config.cases[cond];
			if (flow) {
				const result = execObjectFlow(
					{ type: "object", properties: flow },
					data,
					flowContext,
					options
				);
				if (!result.isValid) {
					if (options?.aggressive) {
						errorStore = {
							isValid: false,
							errors: [...errorStore.errors, ...result.errors],
						};
					} else {
						return result;
					}
				}
			}
			continue;
		}
		if (config.type === "if") {
			const cond = !!execJSONExpression(config.cond, data);
			if (options?.enforceSchema) {
				if (cond) {
					// delete false fields.
					config.false?.forEach((v) => {
						unset(
							data.data,
							[...flowContext.refPath, v.key].join(".")
						);
					});
				} else {
					// delete true fields.
					config.true.forEach((v) => {
						unset(
							data.data,
							[...flowContext.refPath, v.key].join(".")
						);
					});
				}
			}
			const flow = cond ? config.true : config.false;
			if (flow) {
				const result = execObjectFlow(
					{ type: "object", properties: flow },
					data,
					flowContext,
					options
				);
				if (!result.isValid) {
					if (options?.aggressive) {
						errorStore = {
							isValid: false,
							errors: [...errorStore.errors, ...result.errors],
						};
					} else {
						return result;
					}
				}
			}
			continue;
		}

		const { ignoreKey, key } = config;
		const newRefPath = [...flowContext.refPath, key];
		if (ignoreKey) {
			const ignore = !!execJSONExpression(ignoreKey, data);
			if (ignore) {
				if (options?.enforceSchema) {
					unset(data.data, newRefPath);
				}
				continue;
			}
		}
		switch (config.type) {
			case "object": {
				const result = execObjectFlow(
					config,
					{ ...data, ref: get(data.data, newRefPath) },
					{
						...flowContext,
						refPath: newRefPath,
					},
					options
				);
				if (!result.isValid) {
					if (options?.aggressive) {
						errorStore = {
							isValid: false,
							errors: [...errorStore.errors, ...result.errors],
						};
					} else {
						return result;
					}
				}
				break;
			}

			// Default specifies a primitive value type!
			default: {
				const result = execPrimitiveFlow(
					config,
					{ ...data, ref: get(data.data, newRefPath) },
					{
						...flowContext,
						refPath: newRefPath,
					},
					options
				);
				if (!result.isValid) {
					if (options?.aggressive) {
						// If aggressive, collect all errors!
						errorStore = {
							isValid: false,
							errors: [...errorStore.errors, ...result.errors],
						};
					} else {
						return result;
					}
				}
			}
		}
	}
	return errorStore;
};
