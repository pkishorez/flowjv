import { IFlowSchema } from "flowjv-react-material";

export const schema = `{
	type: "object",
	properties: [
		{ type: "string", key: "name", label: "Name" },
		{ type: "number", key: "age", label: "Age" },
		{ type: "boolean", key: "isEmployed", label: "Are you employed?" },
		{
			type: "enum",
			items: [
				{ value: "male", label: "Male" },
				{ value: "female", label: "Female" },
			],
			key: "gender",
			label: "Gender",
			ui: {
				type: "radio",
			},
		},
	],
}`; // as IFlowSchema;
