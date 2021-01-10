import { validateSimpleType } from "../simple";

describe("simple type tests: ", () => {
	it("Required Check", () => {
		expect(
			validateSimpleType(
				{
					type: "string",
					isRequired: true,
				},
				{
					data: { name: "Kishore" },
					refPath: ["name"],
				},
				{}
			).isValid
		).toBe(true);
	});
	it("Type check", () => {
		expect(
			validateSimpleType(
				{
					type: "string",
				},
				{
					data: { name: "Kishore" },
					refPath: ["name"],
				},
				{ typeCheck: true }
			).isValid
		).toBe(true);
	});
});
