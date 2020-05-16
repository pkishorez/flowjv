import { IJSONFlow, validateJSONFlow } from "../index";

const profileFlow: IJSONFlow = {
	type: "object",
	properties: [
		{
			key: "name",
			value: {
				type: "string",
				validations: [
					{
						logic: ["===", [["$ref"], "Kishore"]],
						err: "Name should be kishore",
					},
				],
			},
		},
		{
			key: "age",
			value: {
				type: "number",
				validations: [
					{
						logic: ["<=", [20, ["$ref"], 30]],
						err: "Age should be between 20 and 30.",
					},
				],
			},
		},
		{
			key: "gender",
			value: {
				type: "string",
				validations: [
					{
						logic: ["enum", ["$ref"], ["male", "female"]],
						err: "Gender should be either male or female",
					},
				],
			},
		},
		{
			key: "password",
			value: {
				type: "string",
				validations: [
					{
						logic: [">", [["str:len", ["$ref"]], 5]],
						err: "Password length should be minimum 5 characters.",
					},
				],
			},
		},
		{
			key: "cnfPassword",
			value: {
				type: "string",
				validations: [
					{
						logic: [
							"===",
							[["var", ["$data", "password"]], ["$ref"]],
						],
						err: "Should match password!",
					},
				],
			},
		},
	],
};
describe("Flow Test", () => {
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
});
