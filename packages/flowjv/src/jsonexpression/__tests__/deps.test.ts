import { getDependencies, IExpression } from "..";

describe("Dependencies Test : ", () => {
	it("Simple test", () => {
		expect(getDependencies(["$data", "name"])?.data?.[0]).toBe("name");
		expect(getDependencies(["$context", "name"])?.context?.[0]).toBe(
			"name"
		);
	});
	it("Nested Test", () => {
		const expr = <IExpression>[
			"===",
			[1, 2, ["$data", "number"], ["$context", "number"]],
		];
		expect(getDependencies(expr)?.data?.[0]).toBe("number");
		expect(getDependencies(expr)?.context?.[0]).toBe("number");
	});
	it("Function test", () => {
		const expr = <IExpression>[
			"===",
			[1, 2, ["$data", "number"], ["$context", "number"], ({}) => 5],
		];
		expect(getDependencies(expr)).toBe(null);
	});
	it("No Data, noContext", () => {
		const expr = <IExpression>["===", [1, 2, 3, "hello"]];
		expect(getDependencies(expr)?.data?.length).toBe(0);
		expect(getDependencies(expr)?.context?.length).toBe(0);
	});
});
