import { execJSONLogic } from "../jsonlogic";

const ctx = { data: {}, context: {} };
describe("JSON Logic Test cases::", () => {
	it("Equality Check", () => {
		expect(execJSONLogic(["===", [1, 1]], ctx)).toBe(true);
	});
	it("Case sensitive Equality Check", () => {
		expect(execJSONLogic(["===", [1, "1"]], ctx)).toBe(false);
	});

	it("InEquality Check", () => {
		expect(execJSONLogic(["!==", [1, 1]], ctx)).toBe(false);
	});
	it("Case sensitive InEquality Check", () => {
		expect(execJSONLogic(["!==", [1, "1"]], ctx)).toBe(true);
	});
});
