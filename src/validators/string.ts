import { IJSONLogic } from "../jsonlogic";

export type IStringValidatorType = {
	$type: "string";
	validate?: {
		minLength?: number;
		maxLength?: number;
		length?: number;
		pattern?: string;
		format?: "email";
		jsonLogic?: IJSONLogic;
	};
};
