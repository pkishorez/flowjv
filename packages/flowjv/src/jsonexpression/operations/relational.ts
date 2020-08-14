import {
	IMin2ElemArray,
	IExpression,
	IJSONExpressionData,
	execJSONExpression,
} from "..";
import { helper } from "../helper";

export type IRelationalOperation =
	| ["===", IMin2ElemArray<IExpression>]
	| ["!==", IMin2ElemArray<IExpression>]
	| [">", IMin2ElemArray<IExpression>]
	| [">=", IMin2ElemArray<IExpression>]
	| ["<", IMin2ElemArray<IExpression>]
	| ["<=", IMin2ElemArray<IExpression>];

const relationalOperation = {
	"===": (a: any, b: any) => a === b,
	"!==": (a: any, b: any) => a !== b,
	">": (a: any, b: any) => a > b,
	">=": (a: any, b: any) => a >= b,
	"<": (a: any, b: any) => a < b,
	"<=": (a: any, b: any) => a <= b,
};

export const isRelationalOperation = (
	expression: any
): expression is IRelationalOperation => {
	const operand: any = expression[0];
	return !!(relationalOperation as any)[operand];
};

export const execRelationalOperation = (
	operation: IRelationalOperation,
	data: IJSONExpressionData<any, any>
) => {
	return helper.assertChainOp(
		operation[1].map((exp) => execJSONExpression(exp, data)),
		relationalOperation[operation[0]]
	);
};
