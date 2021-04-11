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
					type: "boolean",
					key: "nestedCondition",
					label: "If Nested Condition",
				},
				{
					type: "if",
					cond: ["$data", "nestedCondition"],
					true: [
						{
							type: "string",
							key: "ns1",
							label: "Nested If Statement 1",
						},
						{
							type: "string",
							key: "ns2",
							label: "Nested If Statement 2",
						},
						{
							type: "string",
							key: "ns3",
							label: "Nested If Statement 3",
						},
					],
					false: [
						{
							type: "string",
							key: "nie1",
							label: "Nested If Else Statement 1",
						},
					],
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
					type: "boolean",
					key: "elseNestedCondition",
					label: "Else Nested Condition",
				},
				{
					type: "if",
					cond: ["$data", "elseNestedCondition"],
					true: [
						{
							type: "string",
							key: "ens1",
							label: "Else Nested If Statement 1",
						},
						{
							type: "string",
							key: "ens2",
							label: "Else Nested If Statement 2",
						},
						{
							type: "string",
							key: "ens3",
							label: "Else Nested If Statement 3",
						},
					],
				},
			],
		},
	],
}`;
