import { IFlowSchema } from "flowjv-react-material";

export const schema = `{
	type: "object",
	properties: [
		{ type: "string", key: "name", label: "Name" },
		{
			type: "number",
			key: "age",
			label: "Age",
			validations: [
				{
					logic: ["<=", 1, ["$ref"], 100],
					err: "Age should be between 1 and 100",
				},
			],
		},
		{
			type: "enum",
			key: "gender",
			label: "Gender",
			ui: {
				type: "radio",
			},
			items: [
				{ value: "male", label: "Male" },
				{ value: "female", label: "Female" },
				{ value: "others", label: "Others" },
			],
		},
		{
			type: "string",
			key: "email",
			label: "Email",
			validations: [
				{
					logic: ["str:fmt:email", ["$ref"]],
					err: "Should be a valid email id.",
				},
			],
		},
		{
			type: "string",
			ui: {
				type: "password",
			},
			key: "password",
			label: "Password",
			validations: [
				{
					logic: ["<=", 5, ["str:len", ["$ref"]]],
					err: "Password should be minimum of 5 character length",
				},
			],
		},
		{
			type: "string",
			ui: {
				type: "password",
			},
			key: "confirmPassword",
			label: "Confirm Password",
			validations: [
				{
					logic: ["===", ["$ref"], ["$data", "password"]],
					err: "Confirm Password should match the password.",
				},
			],
		},
		{ type: "boolean", key: "isEmployed", label: "Are you Employed?" },
		{
			type: "if",
			cond: ["$data", "isEmployed"],
			true: [
				{
					type: "number",
					key: "yearsOfExp",
					label: "Years Of Experience",
				},
			],
		},
	],
}`;
