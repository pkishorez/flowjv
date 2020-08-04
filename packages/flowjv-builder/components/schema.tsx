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
			type: "enum",
			uiType: "select",
			items: [
				{ value: "male", label: "Male" },
				{ value: "female", label: "Female" },
				{ value: "others", label: "Others" },
			],
			key: "gender2",
			label: "Gender",
		},
		{
			type: "switch",
			cond: ["$data", "gender"],
			cases: {
				male: [
					{ type: "string", key: "maleprop", label: "Male Prop" },
					{ type: "string", key: "maleprop2", label: "Male Prop2" },
					{ type: "string", key: "maleprop3", label: "Male Prop3" },
				],
				female: [
					{ type: "string", key: "femaleprop", label: "FeMale Prop" },
					{
						type: "string",
						key: "femaleprop2",
						label: "FeMale Prop2",
					},
					{
						type: "string",
						key: "femaleprop3",
						label: "FeMale Prop3",
					},
				],
			},
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
			blockId: "block_isEmp",
			cond: ["$data", "is_employed"],
			true: [
				{ type: "number", key: "yoe", label: "Years of Experience" },
			],
		},
		{
			type: "boolean",
			key: "terms",
			label: "Accept Terms and Conditions?",
			validations: [
				{ logic: ["$ref"], err: "Please accept terms and conditions." },
			],
		},
	],
};
