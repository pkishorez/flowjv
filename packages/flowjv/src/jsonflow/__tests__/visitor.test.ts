import { lookup } from "../visitor";
import { IFlowSchema } from "..";

const fschema: IFlowSchema = {
	type: "object",
	properties: [
		{ type: "string", key: "name" },
		{ type: "number", key: "age" },
		{ type: "boolean", key: "employed" },
		{
			type: "if",
			blockId: "ifEmployed",
			cond: ["$data", "employed"],
			true: [{ type: "number", key: "yoe" }],
		},
	],
};
describe("Visitor Util tests", () => {
	it("Atom lookup:", () => {
		expect(lookup.atom(fschema, ["name"])).toBe(fschema.properties[0]);
	});
	it("Block lookup:", () => {
		expect(lookup.block(fschema, "ifEmployed")).toBe(fschema.properties[3]);
	});
});
