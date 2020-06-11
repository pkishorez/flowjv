import { setupFlowJV } from "flowjv-react";
import { FormConfig } from "flowjv-react/dist/bindings";
import { useState } from "react";
import cx from "classnames";
import { flowSchema } from "./schema";

const FlowJVForm = setupFlowJV(FormConfig);

export function DemoForm() {
	const [data, setData] = useState({ value: {}, isValid: false });
	const [showData, setShowData] = useState(false);
	return (
		<div className="max-w-md p-5 mx-auto bg-white">
			<h2>Registration Form</h2>
			{showData && <pre>{JSON.stringify(data.value, null, "  ")}</pre>}
			<FlowJVForm
				formProps={{
					className: cx({
						hidden: showData,
					}),
				}}
				schema={flowSchema}
				value={data.value}
				onChange={setData}
			>
				<RegisterButton
					isValid={data.isValid}
					onRegister={() => {
						setShowData(true);
					}}
				/>
			</FlowJVForm>
		</div>
	);
}
DemoForm.displayName = "DemoForm";

const RegisterButton = ({ isValid, onRegister }) => {
	return (
		<input
			type="submit"
			className={cx(
				"p-3 mt-3 w-full outline-none focus:outline-none transition-all duration-300",
				{
					"text-white bg-teal-700 hover:bg-teal-800 cursor-pointer": isValid,
					"bg-gray-300 text-gray-400 hover:bg-gray-300 cursor-default": !isValid,
				}
			)}
			onClick={(e) => {
				isValid && onRegister?.();
			}}
			value="Register"
		/>
	);
};
