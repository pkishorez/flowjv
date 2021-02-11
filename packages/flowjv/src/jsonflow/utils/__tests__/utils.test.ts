import { flowSchema } from "../../index";
import { getSchemaAtBlock, getSchemaByPath } from "../index";

describe("Test FlowJV utils", () => {
	const schema = flowSchema({
		type: "object",
		properties: [
			{ type: "string", key: "name", label: "Name" },
			{
				type: "object",
				key: "others",
				properties: [
					{ type: "string", key: "hobby", label: "Hobbies" },
				],
			},
			{
				type: "if",
				blockId: "profileCondition",
				cond: true,
				true: [
					{
						type: "object",
						key: "profile",
						properties: [
							{ type: "string", key: "Age", label: "Age" },
						],
					},
				],
				false: [],
			},
		],
	});
	it("Get Block By Id", () => {
		expect(getSchemaAtBlock(schema, "profileCondition")?.blockId).toEqual(
			"profileCondition"
		);
	});
	it("Get Schema at path", () => {
		const result = getSchemaByPath(schema, ["others", "hobby"]);
		expect(result).toHaveProperty("label", "Hobbies");
	});
});
