import { setupFlowJV } from "flowjv-react";
import { config } from "flowjv-react-custom";
import { useState } from "react";
import cx from "classnames";
import { flowSchema } from "./schema";

const FlowJVForm = setupFlowJV(config);

export function DemoForm() {
	const [data, setData] = useState({ value: {}, isValid: false });
	const [theme, setTheme] = useState<"dark" | "light">("dark");
	return (
		<div className="my-10 mx-auto max-w-md w-screen">
			<style global jsx>
				{`
					body {
						/*background-color: #313131;*/
						background-color: ${theme === "light"
							? "white"
							: "#303030"};
						transition: 0.3s background-color;
					}
				`}
			</style>
			<img
				src={`logo-${theme === "light" ? "teal" : "white"}.svg`}
				className="w-40 block mx-auto mt-16 mb-6"
			/>
			<div
				style={{
					boxShadow: "0px 0px 5px gray",
					backgroundColor: theme === "dark" && "#424242",
				}}
				className="my-10 mx-auto max-w-md w-screen"
			>
				<FlowJVForm
					className={cx(
						"p-5 relative fjv-form transition-all duration-200",
						theme === "light" && "bg-gray-100",
						theme
					)}
					schema={flowSchema}
					value={data.value}
					onChange={setData}
					prepend={
						<div className="flex justify-between items-center">
							<h3>Registration Form</h3>
							<span
								className={cx(
									"text-3xl p-3 px-5 select-none",
									"cursor-pointer hover:opacity-100 opacity-75 font-bold",
									"transition-colors duration-100"
								)}
								onClick={(e) =>
									setTheme(
										theme === "dark" ? "light" : "dark"
									)
								}
							>
								☾
							</span>
						</div>
					}
					append={
						<RegisterButton
							isValid={data.isValid}
							onRegister={() => {}}
							theme={theme}
						/>
					}
				/>
			</div>
		</div>
	);
}
DemoForm.displayName = "DemoForm";

const RegisterButton = ({ isValid, onRegister, theme }) => {
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
