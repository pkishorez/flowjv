import { IFlowSchema } from "flowjv-react-material";

export const schema = `{
	type: "object",
	properties: [
		{
			type: "enum",
			items: [
				{ label: "Case 1", value: "case1" },
				{ label: "Case 2", value: "case2" },
				{ label: "Case 3", value: "case3" },
			],
			ui: {
				type: "select"
			},
			key: "switchKey",
			label: "Switch Case",
		},
		{
			type: "switch",
			switch: ["$data", "switchKey"],
			cases: {
				case1: [
					{
						type: "string",
						key: "case1-1",
						label: "Case 1 Statement 1",
					},
					{
						type: "string",
						key: "case1-2",
						label: "Case 1 Statement 2",
					},
					{
						type: "string",
						key: "case1-3",
						label: "Case 1 Statement 3",
					},
				],
				case2: [
					{
						type: "string",
						key: "case2-1",
						label: "Case2 Statement 1",
					},
					{
						type: "string",
						key: "case2-2",
						label: "Case2 Statement 2",
					},
					{
						type: "string",
						key: "case2-3",
						label: "Case2 Statement 3",
					},
				],
				case3: [
					{
						type: "string",
						key: "case3-1",
						label: "Case3 Statement 1",
					},
					{
						type: "string",
						key: "case3-2",
						label: "Case3 Statement 2",
					},
					{
						type: "string",
						key: "case3-3",
						label: "Case3 Statement 3",
					},
				],
			},
		},
	],
}`;
