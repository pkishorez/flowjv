import { get, IKeyPath } from "../helper/immutable";
import { execOperation, IOperation } from "./operations";

export type IExpression<IData = any, IContext = any> =
	| number
	| string
	| boolean
	| IFunctionExectution<IData, IContext>
	| IOperation;

type IFunctionExectution<IData, IContext> = ({
	data,
	context,
	ref,
}: {
	data: Partial<IData>;
	context: IContext;
	ref: any;
}) => any;
export type IMin2ElemArray<T> = [T, T, ...T[]];
export interface IJSONExpressionData<IData, IContext> {
	data?: IData;
	context?: IContext;
	refPath?: IKeyPath;
}

export type IJSONExpressionReturnType = string | number | boolean | null;
export const execJSONExpression = <IData = any, IContext = any>(
	expression: IExpression<IData, IContext>,
	data: IJSONExpressionData<IData, IContext>
): IJSONExpressionReturnType => {
	if (
		typeof expression === "number" ||
		typeof expression === "string" ||
		typeof expression === "boolean"
	) {
		return expression;
	}
	if (typeof expression === "function") {
		return expression({
			data: data.data as Partial<IData>,
			context: data.context as IContext,
			ref: get(data.data, data.refPath || []),
		});
	}
	// Execute Operation!
	return execOperation(expression, data);
};
