import { FlowJVForm, flowSchema } from "flowjv-react-custom";
import { AutoFlow } from "flowjv-react";
import React, { useState } from "react";
import { Button } from "@material-ui/core";

interface IData {
	name: string;
	kishore: string;
}
const schema = flowSchema<IData>({
	type: "object",
	properties: [
		{
			type: "string",
			key: "name",
			validations: [
				{
					logic: [">=", ["str:len", ["$ref"]], 3],
					err: "Length should be minimum of 3.",
				},
			],

			label: "Name",
		},
		{
			key: "password",
			type: "string",
			validations: [
				{
					logic: [">=", ["str:len", ["$ref"]], 3],
					err: "Password should be minimum of 3 character length.",
				},
			],

			label: "Password",
			uiType: "password",
		},
		{
			key: "confirmPassword",
			type: "string",
			validations: [
				{
					logic: ["===", ["$ref"], ["$data", "password"]],
					err: "Password and confirm password should match.",
				},
			],

			label: "Confirm Password",
			uiType: "password",
		},
		{
			key: "gender",
			type: "enum",
			items: [
				{ value: "male", label: "Male" },
				{ value: "female", label: "Female" },
			],

			label: "Gender",
			uiType: "radio",
		},
		{
			key: "acceptTerms",
			type: "boolean",
			validations: [
				{
					logic: ["===", ["$ref"], true],
					err: "Please accept terms and conditions",
				},
			],

			label: "Accept terms and conditions",
		},
	],
});
export default function () {
	const [args, setArgs] = useState({});
	return (
		<div className="bg-gray-100 mx-auto max-w-md p-5 shadow-sm">
			<h1 className="text-2xl">Form!</h1>
			<FlowJVForm<IData, {}>
				schema={schema}
				onSubmit={(args) => {
					setArgs(args);
				}}
			>
				<AutoFlow />
				<Button
					color="primary"
					variant="contained"
					className="block w-full mt-5 focus:outline-none"
					type="submit"
				>
					Submit
				</Button>
			</FlowJVForm>
			{/* <pre>{JSON.stringify(args, null, "  ")}</pre> */}
		</div>
	);
}
