import {
	IDataAccessOperation,
	isDataAccessOperation,
	execDataAccessOperation,
} from "./data";
import {
	IRelationalOperation,
	isRelationalOperation,
	execRelationalOperation,
} from "./relational";
import {
	INumbericalOperation,
	isNumericalOperation,
	execNumericalOperation,
} from "./numerical";
import {
	IStringOperation,
	isStringOperation,
	execStringOperation,
} from "./string";
import {
	ILogicalOperation,
	isLogicalOperation,
	execLogicalOperation,
} from "./logical";
import { IJSONExpressionReturnType } from "..";

export type IOperation =
	| IDataAccessOperation
	| IRelationalOperation
	| INumbericalOperation
	| IStringOperation
	| ILogicalOperation;

export const execOperation = (
	expression: IOperation,
	data: any
): IJSONExpressionReturnType => {
	if (isDataAccessOperation(expression)) {
		return execDataAccessOperation(expression, data);
	}
	if (isLogicalOperation(expression)) {
		return execLogicalOperation(expression, data);
	}
	if (isRelationalOperation(expression)) {
		return execRelationalOperation(expression, data);
	}
	if (isNumericalOperation(expression)) {
		return execNumericalOperation(expression, data);
	}
	if (isStringOperation(expression)) {
		return execStringOperation(expression, data);
	}
	return null;
};
