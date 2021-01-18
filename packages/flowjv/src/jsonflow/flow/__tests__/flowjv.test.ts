import { validateJSONFlow } from "../index";

describe("FlowJV test:", () => {
	const fschema = {
		type: "object",
		properties: [
			{
				key: "profile",
				type: "object",
				properties: [
					{
						key: "name",
						type: "string",
						validations: [
							{
								logic: [">=", [["str:len", ["$ref"]], 3]],
								err: "Name should be of min length 3",
							},
						],
					},
				],
			},
		],
	};
	it("Object nested test", () => {
		const result = validateJSONFlow(
			fschema as any,
			{ data: { profile: { name: "Kishore" } } },
			{}
		);
		expect(result.isValid).toBe(true);
	});
});
