import { IFlowSchema } from "flowjv-react-material";

export const schema = `{
	type: "object",
	properties: [
		{ type: "boolean", key: "ifCondition", label: "If Condition." },
		{
			type: "if",
			cond: ["$data", "ifCondition"],
			true: [
				{
					type: "string",
					key: "if1",
					label: "If Statement 1",
				},
				{
					type: "string",
					key: "if2",
					label: "If Statement 2",
				},
				{
					type: "string",
					key: "if3",
					label: "If Statement 3",
				},
			],
			false: [
				{
					type: "string",
					key: "else1",
					label: "Else Statement 1",
				},
				{
					type: "string",
					key: "else2",
					label: "Else Statement 2",
				},
				{
					type: "string",
					key: "else3",
					label: "Else Statement 3",
				},
			],
		},
	],
}`;
