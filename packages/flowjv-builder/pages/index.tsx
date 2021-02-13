import { FlowJVForm, flowSchema, SubmitButton } from "flowjv-react-custom";
import { AutoFlow, FormSpy } from "flowjv-react";
import React, { useState } from "react";

interface IData {
	name: string;
	kishore: string;
}
const schema = flowSchema<IData>({
	type: "object",
	properties: [
		{
			key: "personalDetails",
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
							err:
								"Password should be minimum of 3 character length.",
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
							logic: [
								"===",
								["$ref"],
								["$data", "personalDetails.password"],
							],
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
			],
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
export default function Builder() {
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
				<AutoFlow path="personalDetails" />
				<AutoFlow path="acceptTerms" />
				<SubmitButton />
				<FormSpy>
					{({ data }) => (
						<pre className="mt-3 p-4 bg-gray-500 text-white">
							{JSON.stringify(data, null, "  ")}
						</pre>
					)}
				</FormSpy>
			</FlowJVForm>
		</div>
	);
}
