import { IJSONExpression } from "..";
import { get, IKeyPath } from "../helper/immutable";

export type IExpression<IData = any, IContext = any> =
	| number
	| string
	| boolean
	| IOperation<IData, IContext>
	| IFunctionExectution<IData, IContext>
	| {
			func: IFunctionExectution<IData, IContext>;
			deps: { data?: string[]; context?: string[] };
	  };

type IFunctionExectution<IData, IContext> = ({
	data,
	context,
	ref,
}: {
	data: Partial<IData>;
	context: IContext;
	ref: any;
}) => any;

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
export type ITernaryOperation = ["?:", IExpression, IExpression, IExpression];

export type INegationOperation = ["!", IExpression];

export type ILogicalOperation =
	| ["enum", IExpression, ...IExpression[]]
	| ["===", IExpression, IExpression, ...IExpression[]]
	| ["!==", IExpression, IExpression, ...IExpression[]]
	| ["||", IExpression, IExpression, ...IExpression[]]
	| ["&&", IExpression, IExpression, ...IExpression[]];

export type IComparisonOperation =
	| [">", IExpression, IExpression, ...IExpression[]]
	| [">=", IExpression, IExpression, ...IExpression[]]
	| ["<", IExpression, IExpression, ...IExpression[]]
	| ["<=", IExpression, IExpression, ...IExpression[]];

export type INumberOperation =
	| ["+", IExpression, IExpression, ...IExpression[]]
	| ["-", IExpression, IExpression, ...IExpression[]]
	| ["*", IExpression, IExpression, ...IExpression[]]
	| ["/", IExpression, IExpression, ...IExpression[]]
	| ["%", IExpression, IExpression, ...IExpression[]];

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
	if (!Array.isArray(logic) && typeof logic === "object") {
		return logic.func({
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
			const [_, arg] = logic;
			return !execJSONExpression(arg, data);
		}

		// Logical operators
		case "?:": {
			const [_, cond, case1, case2] = logic;
			if (execJSONExpression(cond, data)) {
				return execJSONExpression(case1, data);
			}
			return execJSONExpression(case2, data);
		}

		case "enum": {
			const [_, val, ...enums] = logic;
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
			const [_, ...args] = logic;
			return helper.assertChainOp(
				helper.mapExpToValue(args, data),
				(v1, v2) => v1 === v2
			);
		}
		case "!==": {
			const [_, ...args] = logic;
			return helper.assertChainOp(
				helper.mapExpToValue(args, data),
				(v1, v2) => v1 !== v2
			);
		}
		case ">": {
			const [_, ...args] = logic;
			return helper.assertChainOp(
				helper.mapExpToValue(args, data),
				(v1, v2) => v1 > v2
			);
		}
		case ">=": {
			const [_, ...args] = logic;

			return helper.assertChainOp(
				helper.mapExpToValue(args, data),
				(v1, v2) => v1 >= v2
			);
		}
		case "<": {
			const [_, ...args] = logic;
			return helper.assertChainOp(
				helper.mapExpToValue(args, data),
				(v1, v2) => v1 < v2
			);
		}
		case "<=": {
			const [_, ...args] = logic;
			return helper.assertChainOp(
				helper.mapExpToValue(args, data),
				(v1, v2) => v1 <= v2
			);
		}

		// CHAIN OPS
		case "||": {
			const [_, ...args] = logic;
			return helper.chainOp(
				helper.mapExpToValue(args, data),
				(v1, v2) => v1 || v2
			);
		}
		case "&&": {
			const [_, ...args] = logic;
			return helper.chainOp(
				helper.mapExpToValue(args, data),
				(v1, v2) => v1 && v2
			);
		}
		case "+": {
			const [_, ...args] = logic;
			return helper.chainOp(
				helper.mapExpToValue(args, data),
				(v1, v2) => v1 + v2
			);
		}
		case "-": {
			const [_, ...args] = logic;
			return helper.chainOp(
				helper.mapExpToValue(args, data),
				(v1, v2) => v1 - v2
			);
		}
		case "*": {
			const [_, ...args] = logic;
			return helper.chainOp(
				helper.mapExpToValue(args, data),
				(v1, v2) => v1 * v2
			);
		}
		case "/": {
			const [_, ...args] = logic;
			return helper.chainOp(
				helper.mapExpToValue(args, data),
				(v1, v2) => v1 / v2
			);
		}
		case "%": {
			const [_, ...args] = logic;
			return helper.chainOp(
				helper.mapExpToValue(args, data),
				(v1, v2) => v1 % v2
			);
		}
		case "str:fmt:email": {
			const [_, arg] = logic;
			const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
			const value = execJSONExpression(arg, data);
			if (typeof value === "string") return regex.test(value);
			else return false;
		}
		case "str:len": {
			const [_, arg] = logic;
			const value = execJSONExpression(arg, data);
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

// If getDependencies return null, it means it dependencies cannot be determined.
export type IDependsOn = string[];
export function getDependencies(expr: IExpression): IDependsOn | null {
	const dependsOn: IDependsOn = [];
	if (
		typeof expr === "number" ||
		typeof expr === "string" ||
		typeof expr === "boolean"
	) {
		return dependsOn;
	}
	if (typeof expr === "function") {
		return null;
	}
	if (!Array.isArray(expr) && typeof expr === "object") {
		return expr.deps?.data ?? [];
	}
	// Logic for dependencies goes here.
	switch (expr[0]) {
		case "$data": {
			return [expr[1]];
		}
	}

	let [_, ...args] = expr;
	for (const arg of args) {
		if (
			typeof arg === "number" ||
			typeof arg === "string" ||
			typeof arg === "boolean" ||
			typeof arg === "undefined"
		) {
			continue;
		}
		if (typeof arg === "function") {
			return null;
		}
		if (!Array.isArray(arg) && typeof arg === "object") {
			arg.deps?.data && dependsOn.push(...arg.deps?.data);
			continue;
		}
		const deps = getDependencies(arg);
		if (deps === null) {
			return null;
		}
		deps && dependsOn.push(...deps);
	}
	return dependsOn;
}

// Combine Dependencies.

export function combineDependencies(
	d1: IDependsOn | null,
	d2: IDependsOn | null
) {
	return d1 && d2 ? [...d1, ...d2] : null;
}
