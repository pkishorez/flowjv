import get from "lodash/get";

export type IJSONLogicOperations =
	| ["var", ["$data", string] | ["$context", string]]

	// Logic and Boolean operators.
	| ["?:", [IJSONLogic, IJSONLogic, IJSONLogic]]
	// | ["==", [IJSONLogic, IJSONLogic]]
	| ["===", [IJSONLogic, IJSONLogic]]
	// | ["!=", [IJSONLogic, IJSONLogic]]
	| ["!==", [IJSONLogic, IJSONLogic]]
	| ["!", IJSONLogic]
	| ["||", [IJSONLogic, IJSONLogic]]
	| ["&&", [IJSONLogic, IJSONLogic]]

	// Numeric Operators.
	| [">", [IJSONLogic, IJSONLogic] | [IJSONLogic, IJSONLogic, IJSONLogic]]
	| [">=", [IJSONLogic, IJSONLogic] | [IJSONLogic, IJSONLogic, IJSONLogic]]
	| ["<", [IJSONLogic, IJSONLogic] | [IJSONLogic, IJSONLogic, IJSONLogic]]
	| ["<=", [IJSONLogic, IJSONLogic] | [IJSONLogic, IJSONLogic, IJSONLogic]]

	// Arithmatic
	| ["+", IJSONLogic[]]
	| ["-", [IJSONLogic, IJSONLogic] | IJSONLogic]
	| ["*", IJSONLogic[]]
	| ["/", [IJSONLogic, IJSONLogic]]
	| ["%", [IJSONLogic, IJSONLogic]]

	// String operations.
	| ["in", [IJSONLogic, IJSONLogic]]
	| ["cat", IJSONLogic[]]
	| ["log", IJSONLogic];

export type IJSONLogic = number | string | boolean | IJSONLogicOperations;

export const execJSONLogic = <IData, IContext>(
	logic: IJSONLogic,
	data: { data: IData; context: IContext }
): any => {
	if (
		typeof logic === "number" ||
		typeof logic === "string" ||
		typeof logic === "boolean"
	) {
		return logic;
	}
	// Now logic is IJSONLogicOperations.
	switch (logic[0]) {
		case "var": {
			const [type, value] = logic[1];
			if (type === "$data") {
				return get(data.data, value);
			} else {
				return get(data.context, value);
			}
		}

		// Logical operators
		case "?:": {
			const [cond, step1, step2] = logic[1];
			if (execJSONLogic(cond, data)) {
				return execJSONLogic(step1, data);
			}
			return execJSONLogic(step2, data);
		}
		case "===": {
			const [val1, val2] = logic[1];
			return execJSONLogic(val1, data) === execJSONLogic(val2, data);
		}
		case "!==": {
			const [val1, val2] = logic[1];
			return execJSONLogic(val1, data) !== execJSONLogic(val2, data);
		}
		case "!": {
		}
		case "&&": {
		}
		case "||": {
		}
	}
	return true;
};
