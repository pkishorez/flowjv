import { IJSONLogic } from "../jsonlogic";

export type INumberValidatorType = {
	$type: "number";
	validate?: {
		"<"?: [number, number] | number;
		">"?: [number, number] | number;
		"<="?: [number, number] | number;
		">="?: [number, number] | number;
		"=="?: number;
		jsonLogic?: IJSONLogic;
	};
};
