import {
	IExpression,
	IJSONExpressionData,
	execJSONExpression,
} from "../../../jsonexpression";
import { IFlowReturnType, IFlowOptions } from "../../index";
import unset from "lodash/unset";
import { IAtom, execPrimitiveFlow } from "../flowatoms";

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

export type IObjectProperty = (IAtom | IObjectFlow) & {
	key: string;
};
export type IObjectFlow = {
	type: "object";
	properties: (IObjectProperty | IObjectIfBlock | IObjectSwitchBlock)[];
};

export const execObjectFlow = <IData, IContext>(
	flow: IObjectFlow,
	data: IJSONExpressionData<IData, IContext>,
	options?: IFlowOptions
): IFlowReturnType => {
	const { properties } = flow;
	let errorStore: IFlowReturnType = { errors: [], isValid: true };
	for (let config of properties) {
		switch (config.type) {
			case "switch": {
				const cond = execJSONExpression(config.cond, data) as string;
				if (options?.enforceSchema) {
					// Delete keys of other cases.
					for (const v of Object.keys(config.cases)) {
						if (v !== cond) {
							config.cases[v].forEach((prop) =>
								unset(data.data, [...data.refPath, prop.key])
							);
						}
					}
				}
				const flow = config.cases[cond];
				if (flow) {
					const result = execObjectFlow(
						{ type: "object", properties: flow },
						data,
						options
					);
					if (!result.isValid) {
						if (options?.aggressive) {
							errorStore = {
								isValid: false,
								errors: [
									...errorStore.errors,
									...result.errors,
								],
							};
						} else {
							return result;
						}
					}
				}
				break;
			}
			case "if": {
				const cond = !!execJSONExpression(config.cond, data);
				if (options?.enforceSchema) {
					if (cond) {
						// delete false fields.
						config.false?.forEach((v) => {
							unset(
								data.data,
								[...data.refPath, v.key].join(".")
							);
						});
					} else {
						// delete true fields.
						config.true.forEach((v) => {
							unset(
								data.data,
								[...data.refPath, v.key].join(".")
							);
						});
					}
				}
				const flow = cond ? config.true : config.false;
				if (flow) {
					const result = execObjectFlow(
						{ type: "object", properties: flow },
						data,
						options
					);
					if (!result.isValid) {
						if (options?.aggressive) {
							errorStore = {
								isValid: false,
								errors: [
									...errorStore.errors,
									...result.errors,
								],
							};
						} else {
							return result;
						}
					}
				}
				break;
			}
			default: {
				const { key } = config;
				const newRefPath = [...data.refPath, key];
				switch (config.type) {
					case "object": {
						const result = execObjectFlow(
							config,
							{ ...data, refPath: newRefPath },
							options
						);
						if (!result.isValid) {
							if (options?.aggressive) {
								errorStore = {
									isValid: false,
									errors: [
										...errorStore.errors,
										...result.errors,
									],
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
							{ ...data, refPath: newRefPath },
							options
						);
						if (!result.isValid) {
							if (options?.aggressive) {
								// If aggressive, collect all errors!
								errorStore = {
									isValid: false,
									errors: [
										...errorStore.errors,
										...result.errors,
									],
								};
							} else {
								return result;
							}
						}
					}
				}
			}
		}
	}
	return errorStore;
};
