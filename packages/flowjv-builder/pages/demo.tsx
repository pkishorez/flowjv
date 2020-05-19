import { setupFlowJV } from "flowjv-react";
import { IJSONFlow } from "flowjv";
import { useState } from "react";

const FlowJVForm = setupFlowJV();
const flowSchema: IJSONFlow = {
	type: "object",
	properties: [
		{
			key: "name",
			type: "string",
			label: "Name",
			validations: [
				{
					logic: [">", [["str:len", ["$ref"]], 5]],
					err: "String length should be greater than 4",
				},
			],
		},
		{
			key: "age",
			label: "Age",
			type: "number",
		},
		{
			key: "password",
			type: "string",
			label: "Password",
			validations: [
				{
					logic: ["<=", [5, ["str:len", ["$ref"]], 20]],
					err:
						"Password length should be between 5 and 20 characters.",
				},
			],
		},
		{
			key: "cnfPassword",
			type: "string",
			label: "Confirm Password",
			validations: [
				{
					logic: ["===", [["$ref"], ["var", ["$data", "password"]]]],
					err: "Confirm password should match password.",
				},
			],
		},
		{
			key: "gender",
			type: "enum",
			items: [{ value: "male" }, { value: "female" }],
			label: "Gender",
		},
		{
			key: "isEmployed",
			type: "boolean",
			label: "Are you Employed?",
			validations: [
				{
					logic: ["enum", ["$ref"], [true, false]],
					err: "Should be a boolean",
				},
			],
		},
		{
			type: "if",
			cond: ["var", ["$data", "isEmployed"]],
			true: [
				{
					key: "yoe",
					label: "Years of Experience",
					type: "number",
				},
			],
		},
	],
};
export default function Demo() {
	const [value, setValue] = useState({});
	return (
		<>
			<style global jsx>
				{`
					body {
						background-color: #eeeeee;
					}
				`}
			</style>
			<img
				src="logo-square.svg"
				className="h-20 block mx-auto w-16 mt-16"
			/>
			<div className="max-w-sm mx-auto w-full bg-white p-5 shadow-md">
				<h2>Registration Details</h2>
				<FlowJVForm
					schema={flowSchema}
					value={value}
					onChange={setValue}
				/>
			</div>
		</>
	);
}
