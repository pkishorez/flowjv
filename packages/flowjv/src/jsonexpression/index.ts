import { get, IKeyPath } from "../helper/immutable";
import { helper } from "./helper";

export type IExpression<IData = any, IContext = any> =
	| number
	| string
	| boolean
	| IOperation<IData, IContext>
	| IFunctionExectution<IData, IContext>;

type IFunctionExectution<IData, IContext> = ({
	data,
	context,
	ref,
}: {
	data: Partial<IData>;
	context: IContext;
	ref: any;
}) => any;
type IMin2ElemArray<T> = [T, T, ...T[]];
export type IOperation<IData = any, IContext = any> =
	| IDataAccessOperation<IData, IContext>
	| ITernaryOperation
	| INegationOperation
	| ILogicalOperation
	| IComparisonOperation
	| INumberOperation
	| IStringOperation;

export type IDataAccessOperation<IData, IContext> =
	| ["$data", string, string?]
	| ["$context", string, string?]
	| ["$ref"];

export type ITernaryOperation = ["?:", [IExpression, IExpression, IExpression]];
export type INegationOperation = ["!", IExpression];

export type ILogicalOperation =
	| ["enum", IExpression, IExpression[]]
	| ["===", IMin2ElemArray<IExpression>]
	| ["!==", IMin2ElemArray<IExpression>]
	| ["||", IMin2ElemArray<IExpression>]
	| ["&&", IMin2ElemArray<IExpression>];

export type IComparisonOperation =
	| [">", IMin2ElemArray<IExpression>]
	| [">=", IMin2ElemArray<IExpression>]
	| ["<", IMin2ElemArray<IExpression>]
	| ["<=", IMin2ElemArray<IExpression>];

export type INumberOperation =
	| ["+", IMin2ElemArray<IExpression>]
	| ["-", IMin2ElemArray<IExpression>]
	| ["*", IMin2ElemArray<IExpression>]
	| ["/", IMin2ElemArray<IExpression>]
	| ["%", IMin2ElemArray<IExpression>];

export type IStringOperation =
	| ["str:fmt:email", IExpression]
	| ["str:len", IExpression];

export interface IJSONExpressionData<IData, IContext> {
	data?: IData;
	context?: IContext;
	refPath?: IKeyPath;
}

type IJSONExpressionReturnType = string | number | boolean | null;
export const execJSONExpression = <IData = any, IContext = any>(
	logic: IExpression<IData, IContext>,
	data: IJSONExpressionData<IData, IContext>
): IJSONExpressionReturnType => {
	data.refPath = data.refPath || [];
	if (
		typeof logic === "number" ||
		typeof logic === "string" ||
		typeof logic === "boolean"
	) {
		return logic;
	}
	if (typeof logic === "function") {
		return logic({
			data: data.data as Partial<IData>,
			context: data.context as IContext,
			ref: get(data.data, data.refPath),
		});
	}
	switch (logic[0]) {
		// Data Access Operation.
		case "$ref": {
			return get(data.data, data.refPath);
		}
		case "$context":
			const [_, key, defaultValue] = logic;
			const refPath = key.split(".");
			return get(data.context, refPath, defaultValue);
		case "$data": {
			const [_, key, defaultValue] = logic;
			const refPath = key.split(".");
			return get(data.data, refPath, defaultValue);
		}

		// Logical operators
		case "!": {
			return !execJSONExpression(logic[1], data);
		}
		case "?:": {
			const [cond, case1, case2] = logic[1];
			if (execJSONExpression(cond, data)) {
				return execJSONExpression(case1, data);
			}
			return execJSONExpression(case2, data);
		}

		case "enum": {
			const [_, val, enums] = logic;
			const value = execJSONExpression(val, data);
			const enumValues = new Set(
				enums.map((v) => execJSONExpression(v, data))
			);
			if (enumValues.has(value)) {
				return true;
			}
			return false;
		}

		// ASSERT CHAIN OPS
		case "===":
		case "!==":
		case ">":
		case ">=":
		case "<":
		case "<=":
			const assertChainOp = {
				"===": (a: any, b: any) => a === b,
				"!==": (a: any, b: any) => a !== b,
				">": (a: any, b: any) => a > b,
				">=": (a: any, b: any) => a >= b,
				"<": (a: any, b: any) => a < b,
				"<=": (a: any, b: any) => a <= b,
			};
			return helper.assertChainOp(
				logic[1].map((logic) => execJSONExpression(logic, data)),
				assertChainOp[logic[0]]
			);

		// CHAIN OPS
		case "||":
		case "&&":
		case "+":
		case "-":
		case "*":
		case "/":
		case "%": {
			const chainOp = {
				"||": (a: any, b: any) => a || b,
				"&&": (a: any, b: any) => a && b,
				"+": (a: any, b: any) => a + b,
				"-": (a: any, b: any) => a - b,
				"*": (a: any, b: any) => a * b,
				"/": (a: any, b: any) => a / b,
				"%": (a: any, b: any) => a % b,
			};
			return helper.chainOp(
				logic[1].map((logic) => execJSONExpression(logic, data)),
				chainOp[logic[0]]
			);
		}

		// String operations.
		case "str:fmt:email": {
			const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
			const value = execJSONExpression(logic[1], data);
			if (typeof value === "string") return regex.test(value);
			else return false;
		}
		case "str:len": {
			const value = execJSONExpression(logic[1], data);
			if (typeof value !== "string") {
				return 0;
			}
			return value.length;
		}
	}
};
