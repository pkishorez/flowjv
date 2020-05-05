import { IJSONLogic } from "../jsonlogic";

export type INumberValidatorType = {
	$type: "boolean";
	validate?: {
		value?: true | false;
		jsonLogic?: IJSONLogic;
	};
};
