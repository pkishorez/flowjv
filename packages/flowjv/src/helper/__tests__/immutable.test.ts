import { set, get, unset, Immutable } from "../immutable";

describe("Immutable operations", () => {
	const obj = {
		nested1: {
			nested11: {
				value: "Hey",
			},
			value2: "Value2",
		},
		nested2: {
			nested21: {},
		},

		value1: "value1",
	};
	it("Get", () => {
		expect(get(obj, ["nested1"])).toBe(obj.nested1);
	});
	it("Set", () => {
		const result = set(obj, ["nested1", "nested11"], "kishore");
		expect(result.nested1.nested11).toBe("kishore");
		expect(result.nested1 !== obj.nested1).toBe(true);
		expect(result !== obj).toBe(true);
		expect(result.nested2 === obj.nested2).toBe(true);
	});
	it("unset", () => {
		const result = unset(obj, ["nested1", "nested11"]);
		expect(result).not.toBe(obj);
		expect(result.nested1.nested11).toBeUndefined();
	});
	it("nested operation", () => {
		const result = Immutable(obj)
			.set(["nested3", "nested31", "nested311"], "nestedvalue")
			.set(["nested3", "nested31", "nested312"], "another")
			.unset(["nested2"])
			.unset(["nested3", "nested31", "nested312"])
			// .set(["nested3", "0"], "test") // Cannot do this!
			.set(["value"], "change")
			.get([])
			.value();
		expect(result).not.toBe(obj);
		expect(result.nested3.nested31.nested311).toBe("nestedvalue");
		expect(result.nested2).toBeUndefined();
		expect(result.value).toBe("change");
	});
});
