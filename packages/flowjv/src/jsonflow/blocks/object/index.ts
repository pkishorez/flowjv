import { IJSONExpressionData } from "../../../jsonexpression";
import { IFlowReturnType, IFlowOptions } from "../../index";
import { IAtom, execPrimitiveFlow } from "../flowatoms";
import {
	ifLogic,
	switchLogic,
	IObjectIfBlock,
	IObjectSwitchBlock,
} from "./logic";
export { IObjectIfBlock, IObjectSwitchBlock } from "./logic";

export type IObjectProperty = (IAtom | IObjectFlow) & {
	key: string;
};
export type IObjectFlow = {
	type: "object";
	properties: (IObjectProperty | IObjectIfBlock | IObjectSwitchBlock)[];
};

export const execObjectFlow = <IData, IContext>(
	objectFlow: IObjectFlow,
	data: IJSONExpressionData<IData, IContext>,
	options?: IFlowOptions
): IFlowReturnType => {
	const { properties } = objectFlow;
	const returnValue: IFlowReturnType = { errors: [], isValid: true };
	const updateResult = (result: IFlowReturnType) => {
		returnValue.isValid = !result.isValid ? false : returnValue.isValid;
		returnValue.errors.push(...result.errors);
		return returnValue;
	};
	const shouldReturnResult = (result: IFlowReturnType) =>
		!result.isValid && !options?.aggressive;
	for (let config of properties) {
		switch (config.type) {
			case "switch": {
				const flow = switchLogic(config, data, options);
				if (flow) {
					const result = execObjectFlow(
						{ type: "object", properties: flow },
						data,
						options
					);
					if (shouldReturnResult(updateResult(result))) {
						return returnValue;
					}
				}
				break;
			}
			case "if": {
				const flow = ifLogic(config, data, options);
				if (flow) {
					const result = execObjectFlow(
						{ type: "object", properties: flow },
						data,
						options
					);
					if (shouldReturnResult(updateResult(result))) {
						return returnValue;
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
						if (shouldReturnResult(updateResult(result))) {
							return returnValue;
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
						if (shouldReturnResult(updateResult(result))) {
							return returnValue;
						}
					}
				}
			}
		}
	}
	return returnValue;
};
