import { getDependencies, IJSONExpression as IExpression } from "..";

describe("Dependencies Test : ", () => {
	it("Simple test", () => {
		expect(getDependencies(["$data", "name"])?.[0]).toBe("name");
	});
	it("Nested Test", () => {
		const expr = <IExpression>[
			"===",
			1,
			2,
			["$data", "number"],
			["$context", "number"],
		];
		expect(getDependencies(expr)?.[0]).toBe("number");
	});
	it("Function test", () => {
		const expr = <IExpression>[
			"===",
			1,
			2,
			["$data", "number"],
			["$context", "number"],
			({}) => 5,
		];
		expect(getDependencies(expr)).toBe(null);
	});
	it("No Data, noContext", () => {
		const expr = <IExpression>["===", 1, 2, 3, "hello"];
		expect(getDependencies(expr)?.length).toBe(0);
	});
});
