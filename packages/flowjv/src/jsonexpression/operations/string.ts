import { IExpression, IJSONExpressionData, execJSONExpression } from "..";

export type IStringOperation =
	| ["str:fmt:email", IExpression]
	| ["str:len", IExpression];

const stringOperation = {
	"str:fmt:email": (str: string) =>
		/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(str),
	"str:len": (str: string) => str?.length,
};

export const isStringOperation = (
	expression: any
): expression is IStringOperation => {
	const operand: any = expression[0];
	return !!(stringOperation as any)[operand];
};

export const execStringOperation = (
	operation: IStringOperation,
	data: IJSONExpressionData<any, any>
) => {
	return stringOperation[operation[0]](
		execJSONExpression(operation[1], data) as string
	);
};
