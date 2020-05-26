import { IJSONFlow, validateJSONFlow } from "../index";

const profileFlow: IJSONFlow = {
	type: "object",
	properties: [
		{
			key: "name",
			type: "string",
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
