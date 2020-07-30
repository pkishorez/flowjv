import { getDataFromRefPath } from "../ref";
describe("Ref tests", () => {
	it("Get data from RefPath", () => {
		const data = {
			personalDetails: {
				name: "Kishore",
			},
			arr: [
				{
					name: "Kishore",
				},
			],
		};
		expect(getDataFromRefPath(data, ["personalDetails", "name"])).toBe(
			"Kishore"
		);
		expect(getDataFromRefPath(data, "personalDetails.name")).toBe(
			"Kishore"
		);
		expect(getDataFromRefPath(data, ["arr", 0, "name"])).toBe("Kishore");
		expect(getDataFromRefPath(data, "arr.0.name")).toBe("Kishore");
	});
});
