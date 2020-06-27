import { IFlowSchema, validateJSONFlow } from "../index";

const profileFlow: IFlowSchema = {
	type: "object",
	properties: [
		{
			key: "name",
			type: "string",
			isRequired: true,
		},
		{
			key: "age",
			type: "number",
			validations: [
				{
					logic: ["<=", [20, ["$ref"], 30]],
					err: "Age should be between 20 and 30.",
				},
			],
		},
		{
			key: "gender",
			type: "string",
			validations: [
				{
					logic: ["enum", ["$ref"], ["male", "female"]],
					err: "Gender should be either male or female",
				},
			],
		},
		{
			key: "password",
			type: "string",
			validations: [
				{
					logic: [">", [["str:len", ["$ref"]], 5]],
					err: "Password length should be minimum 5 characters.",
				},
			],
		},
		{
			key: "cnfPassword",
			type: "string",
			validations: [
				{
					logic: ["===", [["$data", "password"], ["$ref"]]],
					err: "Should match password!",
				},
			],
		},
	],
};
describe.only("Flow Test", () => {
	it("Basic Profile json test2", () => {
		const result = validateJSONFlow(profileFlow, {
			data: {
				name: "Kishore",
				age: 21,
				password: "passwd",
				cnfPassword: "passwd",
				gender: "male",
			},
		});
		expect(result.isValid).toBe(true);
	});
	it("isRequired", () => {
		const schema: IFlowSchema = {
			type: "object",
			properties: [{ key: "name", type: "string", isRequired: true }],
		};
		expect(
			validateJSONFlow(schema, {
				data: {},
			}).isValid
		).toBe(false);
		expect(
			validateJSONFlow(schema, {
				data: { name: "" },
			}).isValid
		).toBe(true);
		expect(
			validateJSONFlow(schema, {
				data: { name: "kishore" },
			}).isValid
		).toBe(true);
	});
	it("enum isRequired", () => {
		const schema: IFlowSchema = {
			type: "object",
			properties: [
				{
					key: "gender",
					type: "enum",
					isRequired: true,
					items: [
						{ value: "male" },
						{ value: "female" },
						{ value: "others" },
					],
				},
			],
		};
		expect(
			validateJSONFlow(schema, { data: { gender: "male" } }).isValid
		).toBe(true);
		expect(
			validateJSONFlow(schema, { data: { gender: "unknown" } }).isValid
		).toBe(false);
		expect(validateJSONFlow(schema, { data: {} }).isValid).toBe(false);
	});
});
