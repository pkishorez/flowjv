import get from "lodash/get";

export type IExpression = number | string | boolean | IOperation;

type IMin2ElemArray<T> = [T, T, ...T[]];
export type IOperation =
	| IDataAccessOperation
	| ITernaryOperation
	| INegationOperation
	| ILogicalOperation
	| IComparisonOperation
	| INumberOperation
	| IStringOperation;

export type IDataAccessOperation =
	| ["var", ["$data" | "$context", string, string?]]
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
	| ["str:fmt:email", IExpression[]]
	| ["str:len", IExpression];

export interface IJSONExpressionData<IData, IContext> {
	data?: IData;
	context?: IContext;
	ref?: any;
}
export const execJSONExpression = <IData = any, IContext = any>(
	logic: IExpression,
	data: IJSONExpressionData<IData, IContext>
): string | number | boolean | null => {
	if (
		typeof logic === "number" ||
		typeof logic === "string" ||
		typeof logic === "boolean"
	) {
		return logic;
	}
	switch (logic[0]) {
		// Data Access Operation.
		case "$ref": {
			if (typeof data.ref === "undefined") return null;
			return data.ref;
		}
		case "var": {
			const [type, key, defaultValue] = logic[1];
			let value: string | null;
			if (type === "$data") {
				value =
					key === ""
						? data.data || defaultValue
						: get(data.data, key, defaultValue);
			} else if (type === "$context") {
				value =
					key === ""
						? data.context || defaultValue
						: get(data.context, key, defaultValue);
			} else {
				value = null;
			}
			return value;
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
			throw new Error("Need to implement still.");
		}
		case "str:len": {
			const value = execJSONExpression(logic[1], data);
			if (typeof value !== "string") {
				throw new Error(
					`Cannot find length of string on type : ${typeof value}`
				);
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
