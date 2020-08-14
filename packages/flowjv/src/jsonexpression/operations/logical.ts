import {
	IMin2ElemArray,
	IExpression,
	IJSONExpressionData,
	execJSONExpression,
} from "..";
import { helper } from "../helper";

export type ILogicalOperation =
	| ["?:", [IExpression, IExpression, IExpression]]
	| ["enum", IExpression, IExpression[]]
	| ["!", IExpression]
	| ["||", IMin2ElemArray<IExpression>]
	| ["&&", IMin2ElemArray<IExpression>];

const logicalOperation = {
	"!": (v: any) => !v,
	"||": (a: any, b: any) => a || b,
	"&&": (a: any, b: any) => a && b,
};
export const isLogicalOperation = (
	expression: any
): expression is ILogicalOperation => {
	const operand: any = expression[0];
	if (expression[0] === "!") return true;
	if (expression[0] === "?:") return true;
	if (expression[0] === "enum") return true;
	return !!(logicalOperation as any)[operand];
};

export const execLogicalOperation = (
	operation: ILogicalOperation,
	data: IJSONExpressionData<any, any>
) => {
	switch (operation[0]) {
		case "!":
			return !execJSONExpression(operation[1], data);
		case "?:": {
			const [cond, case1, case2] = operation[1];
			if (execJSONExpression(cond, data)) {
				return execJSONExpression(case1, data);
			}
			return execJSONExpression(case2, data);
		}
		case "enum": {
			const [_, val, enums] = operation;
			const value = execJSONExpression(val, data);
			const enumValues = new Set(
				enums.map((v) => execJSONExpression(v, data))
			);
			if (enumValues.has(value)) {
				return true;
			}
			return false;
		}
		default:
			return helper.chainOp(
				operation[1].map((exp) => execJSONExpression(exp, data)),
				logicalOperation[operation[0]]
			);
	}
};
