import { IFlowSchema } from "flowjv";

export const flowSchema: IFlowSchema = {
	type: "object",
	properties: [
		{ type: "string", key: "name", label: "Name" },
		{
			type: "number",
			key: "age",
			label: "Age",
			validations: [
				{
					logic: ["<=", [1, ["$ref"], 100]],
					err: "Age should be between 1-100",
				},
			],
		},
		{
			type: "string",
			key: "email",
			label: "Email",
			validations: [
				{
					logic: ["str:fmt:email", ["$ref"]],
					err: "Should be a valid Email.",
				},
			],
		},
		{
			type: "enum",
			uiType: "radio",
			items: [
				{ value: "male", label: "Male" },
				{ value: "female", label: "Female" },
				{ value: "others", label: "Others" },
			],
			key: "gender",
			label: "Gender",
		},
		{
			type: "string",
			uiType: "password",
			key: "password",
			label: "Password",
			validations: [
				{
					logic: ["<=", [5, ["str:len", ["$ref"]], 20]],
					err: "Password length should be between 5-10.",
				},
			],
		},
		{
			type: "string",
			uiType: "password",
			key: "cnf_password",
			label: "Confirm Password",
			validations: [
				{
					logic: ["===", [["$ref"], ["$data", "password"]]],
					err: "Confirm password should match password.",
				},
			],
		},
		{ type: "boolean", key: "is_employed", label: "Are you Employed" },
		{
			type: "if",
			cond: ["$data", "is_employed"],
			true: [
				{ type: "number", key: "yoe", label: "Years of Experience" },
			],
		},
	],
};
