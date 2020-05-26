import { setupFlowJV } from "flowjv-react";
import { validateJSONFlow } from "flowjv";
import { useState, useEffect } from "react";
import cx from "classnames";
import { flowSchema } from "./schema";

const FlowJVForm = setupFlowJV();

export function DemoForm() {
	const [value, setValue] = useState({});
	const [showData, setShowData] = useState(false);
	return (
		<div className="max-w-md p-5 mx-auto bg-white">
			<h2>Registration Form</h2>
			{showData && (
				<pre>{JSON.stringify({ data: value }, null, "  ")}</pre>
			)}
			<FlowJVForm
				formProps={{
					className: cx({
						hidden: showData,
					}),
				}}
				schema={flowSchema}
				value={value}
				onChange={setValue}
			/>
			<RegisterButton
				schema={flowSchema}
				data={value}
				onRegister={() => {
					setShowData(true);
				}}
			/>
		</div>
	);
}

const RegisterButton = ({ data, schema, onRegister }) => {
	const [isValid, setValid] = useState(false);
	useEffect(() => {
		setValid(validateJSONFlow(schema, { data }).isValid);
	}, [data]);
	return (
		<input
			type="submit"
			className={cx("p-3 mt-3 w-full", {
				"text-white bg-teal-700 hover:bg-teal-800 cursor-pointer": isValid,
				"bg-gray-300 text-gray-400 hover:bg-gray-300 cursor-default pointer-events-none": !isValid,
			})}
			onClick={(e) => {
				if (isValid) {
					onRegister?.();
				}
			}}
			value="Register"
		/>
	);
};
