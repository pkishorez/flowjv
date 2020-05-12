import { execJSONFlow, IJSONFlow } from "../index";

const profileFlow: IJSONFlow = [
	"object",
	[
		"name",
		{
			type: [
				"text",
				{
					logic: ["===", [["$ref"], "Kishore"]],
					err: "Name should be kishore",
				},
			],
		},
	],
	[
		"age",
		{
			type: [
				"number",
				{
					logic: ["<=", [20, ["$ref"], 30]],
					err: "Age should be between 20 and 30.",
				},
			],
			ignoreKey: false,
		},
	],
	[
		"gender",
		{
			type: [
				"text",
				{
					logic: ["enum", ["$ref"], ["male", "female"]],
					err: "Gender should be either male or female",
				},
			],
		},
	],
	[
		"marital_status",
		{
			type: [
				"text",
				{
					logic: ["enum", ["$ref"], ["married", "unmarried"]],
					err: "Marital status should be specified.",
				},
			],
		},
	],
	[
		"children",
		{
			type: [
				"number",
				{ logic: ["<=", [0, ["$ref"], 10]], err: "Error." },
			],
			ignoreKey: [
				"!==",
				[["var", ["$data", "marital_status"]], "married"],
			],
		},
	],
];
describe("Flow Test", () => {
	it("Basic Profile json test", () => {
		expect(execJSONFlow(profileFlow, {}).isValid).toBe(false);
	});
	it("Basic Profile json test2", () => {
		const result = execJSONFlow(profileFlow, {
			name: "Kishore",
			age: 21,
			gender: "male",
			marital_status: "married",
			children: 1,
		});
		expect(result.isValid).toBe(true);
	});
});
