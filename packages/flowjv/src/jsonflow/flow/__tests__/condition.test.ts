import { flowSchema } from "../..";
import { validateJSONFlow } from "../index";

describe("FlowJV Condition test:", () => {
	const fschema = flowSchema({
		type: "object",
		properties: [{ type: "if", cond: true, true: [] }],
	});
	it("Object nested test", () => {
		const result = validateJSONFlow(
			fschema as any,
			{ data: { profile: { name: "Kishore" } } },
			{}
		);
		expect(result.isValid).toBe(true);
	});
});
