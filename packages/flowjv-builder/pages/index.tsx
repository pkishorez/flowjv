import { FlowJVForm, flowSchema, SubmitButton } from "flowjv-react-custom";
import { AutoFlow, FormSpy } from "flowjv-react";
import React, { useState } from "react";

interface IData {
	personalDetails: {
		name: string;
		password: string;
		confirmPassword: string;
		gender: "male" | "female";
		array: { obj?: string; subarray?: { subobj?: string }[] }[];
	};
	acceptTerms: boolean;
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
				{
					key: "array",
					type: "array",
					label: "Array",
					// length: 3,

					itemSchema: {
						type: "object",
						properties: [
							{ key: "obj", type: "string" },
							{
								key: "subarray",
								type: "array",
								label: "SubArray",
								length: 3,
								itemSchema: {
									type: "object",
									properties: [
										{
											key: "subobj",
											type: "string",
											isRequired: true,
											errMsgs: {
												required:
													"Value for subobj is required!",
											},
										},
									],
								},
							},
						],
					},
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
		<FlowJVForm<IData, {}>
			schema={schema}
			onSubmit={(args) => {
				setArgs(args);
			}}
			initialData={{
				personalDetails: {
					name: "Kishore",
					password: "hello",
					confirmPassword: "hello",
					gender: "male",
					array: [{ subarray: [{}, {}, {}] }],
				},
			}}
		>
			<div className="mx-auto flex justify-center">
				<div className="bg-gray-100 p-5 shadow-2xl max-w-md w-full">
					<h1 className="text-2xl">Form!</h1>
					<AutoFlow path="personalDetails" />
					<AutoFlow path="acceptTerms" />
					<SubmitButton />
				</div>
				<div className="w-full max-w-md">
					<FormSpy>
						{({ data }) => (
							<pre className="mt-3 p-4 bg-gray-500 text-white">
								{JSON.stringify(data, null, "  ")}
							</pre>
						)}
					</FormSpy>
				</div>
			</div>
		</FlowJVForm>
	);
}
