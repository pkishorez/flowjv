import { schema as simpleSchema } from "./simple";
import { schema as validationSchema } from "./validations";
import { schema as IfCondSchema } from "./if-cond";
import { schema as NestedIfCondSchema } from "./if-cond-nest";
import { schema as SwitchSchema } from "./switch";

export const examples: Record<string, string> = {
	"Simple Form": simpleSchema,
	"Form with validations": validationSchema,
	"If Condition Example": IfCondSchema,
	"Nested If Condition": NestedIfCondSchema,
	"Swich Case Example": SwitchSchema,
};
