import {
	IMin2ElemArray,
	IExpression,
	IJSONExpressionData,
	execJSONExpression,
} from "..";
import { helper } from "../helper";

export type INumbericalOperation =
	| ["+", IMin2ElemArray<IExpression>]
	| ["-", IMin2ElemArray<IExpression>]
	| ["*", IMin2ElemArray<IExpression>]
	| ["/", IMin2ElemArray<IExpression>]
	| ["%", IMin2ElemArray<IExpression>];

const numericalOperation = {
	"+": (a: any, b: any) => a + b,
	"-": (a: any, b: any) => a - b,
	"*": (a: any, b: any) => a * b,
	"/": (a: any, b: any) => a / b,
	"%": (a: any, b: any) => a % b,
};
export const isNumericalOperation = (
	expression: any
): expression is INumbericalOperation => {
	const operand: any = expression[0];
	return !!(numericalOperation as any)[operand];
};

export const execNumericalOperation = (
	operation: INumbericalOperation,
	data: IJSONExpressionData<any, any>
) => {
	return helper.chainOp(
		operation[1].map((exp) => execJSONExpression(exp, data)),
		numericalOperation[operation[0]]
	);
};
