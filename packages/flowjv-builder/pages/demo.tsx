import { FlowJVForm, flowSchema, SubmitButton } from "flowjv-react-material";
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
		// {
		// 	type: "string",
		// 	key: "name",
		// 	validations: [
		// 		// {
		// 		// 	logic: [">=", ["str:len", ["$ref"]], 3],
		// 		// 	err: "Length should be minimum of 3.",
		// 		// },
		// 	],

		// 	label: "Name",
		// },
		// {
		// 	key: "password",
		// 	type: "string",
		// 	validations: [
		// 		// {
		// 		// 	logic: [">=", ["str:len", ["$ref"]], 3],
		// 		// 	err: "Password should be minimum of 3 character length.",
		// 		// },
		// 	],

		// 	label: "Password",
		// 	uiType: "password",
		// },
		// {
		// 	key: "confirmPassword",
		// 	type: "string",
		// 	validations: [
		// 		// {
		// 		// 	logic: ["===", ["$ref"], ["$data", "password"]],
		// 		// 	err: "Password and confirm password should match.",
		// 		// },
		// 	],

		// 	label: "Confirm Password",
		// 	uiType: "password",
		// },
		// {
		// 	key: "isEmployed",
		// 	type: "boolean",
		// 	label: "Are you employed?",
		// },
		// {
		// 	type: "if",
		// 	cond: ["$data", "isEmployed"],
		// 	true: [
		// 		{
		// 			key: "occupation",
		// 			type: "string",
		// 			isRequired: true,
		// 			errMsgs: { required: "Occupation is required." },
		// 			label: "Occupation",
		// 		},
		// 	],
		// },
		{
			key: "array",
			type: "array",
			label: "Array",

			itemSchema: {
				type: "object",
				properties: [
					{
						key: "subarray",
						type: "array",
						label: "SubArray",
						itemSchema: {
							type: "string",
							label: "Sub Array String",
						},
					},
				],
			},
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
			<style>
				{`
				body {
					background-color: #F9FAFB;
				}`}
			</style>
			<div className="mx-auto flex justify-center mt-10">
				<div
					className="bg-gray-50 p-5 max-w-sm w-full overflow-y-auto"
					style={{ height: 510 }}
				>
					<h1 className="text-2xl">Form</h1>
					<AutoFlow path={[]} />
					<SubmitButton />
				</div>
				{/* <div className="w-full max-w-md">
					<FormSpy>
						{({ data }) => (
							<pre className="mt-3 p-4 bg-gray-500 text-white">
								{JSON.stringify(data, null, "  ")}
							</pre>
						)}
					</FormSpy>
				</div> */}
			</div>
		</FlowJVForm>
	);
}
