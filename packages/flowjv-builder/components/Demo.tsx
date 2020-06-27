import { setupFlowJV, Field, Block, defaultConfig } from "flowjv-react";
import { useState } from "react";
import cx from "classnames";
import { flowSchema } from "./schema";

const FlowJVForm = setupFlowJV(defaultConfig);

export function DemoForm() {
	const [data, setData] = useState({ value: {}, isValid: false });
	const [showData, setShowData] = useState(false);
	return (
		<div>
			<style global jsx>
				{`
					body {
						/*background-color: #313131;*/
						background-color: white;
					}
				`}
			</style>
			<div className="flex flex-col lg:flex-row justify-center items-center lg:items-start pt-10">
				<div
					style={{ boxShadow: "0px 0px 5px gray" }}
					className="mb-10 lg:mb-0 lg:mr-10"
				>
					<FlowJVForm
						className="max-w-md p-5 w-screen"
						theme="light"
						schema={flowSchema}
						value={data.value}
						onChange={setData}
						prepend={<h2>Registration Form</h2>}
						append={
							<RegisterButton
								isValid={data.isValid}
								onRegister={() => {
									setShowData(true);
								}}
								theme="light"
							/>
						}
					/>
				</div>
				<FlowJVForm
					className="max-w-md p-5 w-screen shadow-lg"
					theme="dark"
					schema={flowSchema}
					value={data.value}
					onChange={setData}
					prepend={<h2>Registration Form</h2>}
					append={
						<RegisterButton
							isValid={data.isValid}
							onRegister={() => {
								setShowData(true);
							}}
							theme="dark"
						/>
					}
				/>
			</div>
		</div>
	);
}
DemoForm.displayName = "DemoForm";

const RegisterButton = ({ isValid, onRegister, theme = "dark" }) => {
	return (
		<input
			type="submit"
			className={cx(
				"p-3 mt-8 w-full outline-none focus:outline-none transition-all duration-300",
				theme === "light"
					? {
							"text-white bg-teal-700 hover:bg-teal-800 cursor-pointer": isValid,
							"bg-gray-300 text-gray-400 hover:bg-gray-300 cursor-default": !isValid,
					  }
					: {
							"text-white bg-teal-700 hover:bg-teal-800 cursor-pointer": isValid,
							"bg-gray-800 text-gray-900 hover:bg-gray-800 cursor-default": !isValid,
					  }
			)}
			onClick={(e) => {
				isValid && onRegister?.();
			}}
			value="Register"
		/>
	);
};
