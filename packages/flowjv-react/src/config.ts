import { TextField } from "./components/TextField";
import { IPrimitiveFlow } from "flowjv";

export type IConfig = {
	[index in IPrimitiveFlow["type"]]: any;
};
export const defaultConfig: IConfig = {
	string: TextField,
	boolean: TextField,
	number: TextField,
};
