import { flowSchema } from "../index";
import { compileSchema } from "../compile";

describe("Compile tests", () => {
	it("Make sure compile works", () => {
		const schema = flowSchema({
			type: "object",
			properties: [
				{
					type: "if",
					cond: true,
					true: [
						{ type: "string", key: "name", label: "Name Dude..." },
					],
					false: [
						{ type: "string", key: "name", label: "Cool Man" },
						{
							type: "if",
							cond: ["$data", "name"],
							true: [
								{
									key: "name",
									type: "number",
									validations: [
										{
											logic: ["$data", "kishore"],
											err: "Error",
										},
									],
								},
							],
							false: [{ key: "name", type: "number" }],
						},
					],
				},
			],
		});
		const blocks = compileSchema(schema);
		expect(blocks["name"]?.items?.length).toBe(4);
	});
});
