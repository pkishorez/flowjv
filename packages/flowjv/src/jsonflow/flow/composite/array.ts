import { IFlowConfig, IPayload, IValidationResult } from "../helper";
import { get, IKeyPath } from "../../../helper/immutable";
import { ISimpleType, validateSimpleType } from "../simple";
import { IObjectType, validateObjectType } from "./object";

export type IArrayType<
	IData = {},
	IContext = {},
	A = {},
	B = {},
	C = {},
	D = {},
	E = {},
	F = {}
> = F & {
	type: "array";
	label?: string;
	itemSchema:
		| IObjectType<IData, IContext, A, B, C, D, E, F>
		| ISimpleType<IData, IContext, A, B, C, D, E>;
	isRequired?: boolean;
	errMsgs?: {
		type?: string;
		required?: string;
	};
};

export type IArrayPayload = IPayload & {
	refPath: IKeyPath;
};

export function validateArrayType(
	schema: IArrayType,
	payload: IArrayPayload,
	config: IFlowConfig
): IValidationResult {
	const data = get(payload.data, payload.refPath, []);
	let allErrors: IValidationResult["errors"] = [];
	const arrErrors: string[] = [];

	if (schema.isRequired && typeof data === "undefined") {
		arrErrors.push(
			schema.errMsgs?.required ??
				`Array at ${payload.refPath.join(".")} is required.`
		);
	}
	if (typeof data !== "undefined" && !Array.isArray(data)) {
		arrErrors.push(
			`Type expected at ${payload.refPath.join(
				"."
			)} should of type array.`
		);
	} else if (typeof data !== "undefined") {
		const { itemSchema } = schema;
		for (let i = 0; i < data.length; i++) {
			const itemKeyPath = [...payload.refPath, i];
			switch (itemSchema.type) {
				case "object": {
					const { errors } = validateObjectType(
						itemSchema,
						{ ...payload, refPath: itemKeyPath },
						config
					);
					if (errors.length > 0) {
						allErrors.push(...errors);
					}
					break;
				}
				default: {
					const { errors } = validateSimpleType(
						itemSchema,
						{ ...payload, refPath: itemKeyPath },
						config
					);
					if (errors.length > 0) {
						allErrors.push({ key: itemKeyPath, msgs: errors });
					}
					break;
				}
			}
		}
	}

	if (arrErrors.length > 0) {
		allErrors = [{ key: payload.refPath, msgs: arrErrors }, ...allErrors];
	}
	return {
		isValid: !(allErrors.length > 0 || arrErrors.length > 0),
		errors: allErrors,
	};
}
