import { get, IKeyPath } from "../helper/immutable";

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
	| ["enum", IExpression, IMin2ElemArray<IExpression>]
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
		case "!": {
			return !execJSONExpression(logic[1], data);
		}

		// Logical operators
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
		case "===": {
			return helper.assertChainOp(
				helper.mapExpToValue(logic[1], data),
				(v1, v2) => v1 === v2
			);
		}
		case "!==": {
			return helper.assertChainOp(
				helper.mapExpToValue(logic[1], data),
				(v1, v2) => v1 !== v2
			);
		}
		case ">": {
			return helper.assertChainOp(
				helper.mapExpToValue(logic[1], data),
				(v1, v2) => v1 > v2
			);
		}
		case ">=": {
			return helper.assertChainOp(
				helper.mapExpToValue(logic[1], data),
				(v1, v2) => v1 >= v2
			);
		}
		case "<": {
			return helper.assertChainOp(
				helper.mapExpToValue(logic[1], data),
				(v1, v2) => v1 < v2
			);
		}
		case "<=": {
			return helper.assertChainOp(
				helper.mapExpToValue(logic[1], data),
				(v1, v2) => v1 <= v2
			);
		}

		// CHAIN OPS
		case "||": {
			return helper.chainOp(
				helper.mapExpToValue(logic[1], data),
				(v1, v2) => v1 || v2
			);
		}
		case "&&": {
			return helper.chainOp(
				helper.mapExpToValue(logic[1], data),
				(v1, v2) => v1 && v2
			);
		}
		case "+": {
			return helper.chainOp(
				helper.mapExpToValue(logic[1], data),
				(v1, v2) => v1 + v2
			);
		}
		case "-": {
			return helper.chainOp(
				helper.mapExpToValue(logic[1], data),
				(v1, v2) => v1 - v2
			);
		}
		case "*": {
			return helper.chainOp(
				helper.mapExpToValue(logic[1], data),
				(v1, v2) => v1 * v2
			);
		}
		case "/": {
			return helper.chainOp(
				helper.mapExpToValue(logic[1], data),
				(v1, v2) => v1 / v2
			);
		}
		case "%": {
			return helper.chainOp(
				helper.mapExpToValue(logic[1], data),
				(v1, v2) => v1 % v2
			);
		}
		case "str:fmt:email": {
			const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
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

const helper = {
	mapExpToValue: (exps: IExpression[], data: any) => {
		return exps.map((exp) => execJSONExpression(exp, data));
	},
	chainOp: (values: any[], operation: (v1: any, v2: any) => any) => {
		return values.reduce(
			(agg, v, i) => (i === 0 ? agg : operation(agg, v)),
			values[0]
		);
	},
	assertChainOp: (
		values: any[],
		operation: (v1: any, v2: any) => boolean
	) => {
		for (let i = 1; i < values.length; i++) {
			if (!operation(values[i - 1], values[i])) {
				return false;
			}
		}
		return true;
	},
};

export function getDependencies(expr: IExpression) {
	const dependsOn: { data: string[]; context: string[] } = {
		data: [],
		context: [],
	};
	if (
		typeof expr === "number" ||
		typeof expr === "string" ||
		typeof expr === "boolean" ||
		typeof expr === "function"
	) {
		return dependsOn;
	}
	switch (expr[0]) {
		case "$context":
			dependsOn.context.push(expr[1]);
			break;
		case "$data":
			dependsOn.data.push(expr[1]);
			break;
		// string
		case "str:len":
		case "str:fmt:email":
			const result = getDependencies(expr[1]);
		default:
			break;
	}
	return dependsOn;
}
