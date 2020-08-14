import { IJSONExpressionData } from "..";
import { get } from "../../helper/immutable";

export type IDataAccessOperation =
	| ["$data", string, string?]
	| ["$context", string, string?]
	| ["$ref"];

export const isDataAccessOperation = (
	expression: any
): expression is IDataAccessOperation => {
	const operand = expression[0];
	if (operand === "$data" || operand === "$context" || operand === "$ref") {
		return true;
	}
	return false;
};

export const execDataAccessOperation = (
	operation: IDataAccessOperation,
	data: IJSONExpressionData<any, any>
) => {
	switch (operation[0]) {
		case "$ref": {
			return get(data.data, data.refPath || []);
		}
		case "$context":
			const [_, key, defaultValue] = operation;
			const refPath = key.split(".");
			return get(data.context, refPath, defaultValue);
		case "$data": {
			const [_, key, defaultValue] = operation;
			const refPath = key.split(".");
			return get(data.data, refPath, defaultValue);
		}
	}
};
