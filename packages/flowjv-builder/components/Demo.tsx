import { FlowJVForm } from "flowjv-react";
import { useState } from "react";
import cx from "classnames";
import { flowSchema } from "./schema";

export function DemoForm() {
	const [data, setData] = useState({ value: {}, isValid: false });
	const [theme, setTheme] = useState<"light" | "dark">("dark");
	return (
		<div>
			<style global jsx>
				{`
					body {
						/*background-color: #313131;*/
						background-color: ${theme === "light"
							? "white"
							: "#222"};
						transition: 0.3s background-color;
					}
				`}
			</style>
			<img
				src={`logo-${theme === "light" ? "teal" : "white"}.svg`}
				className="w-40 block mx-auto mt-16 mb-6"
			/>
			<div
				style={{ boxShadow: "0px 0px 5px gray" }}
				className="my-10 mx-auto max-w-md w-screen"
			>
				<FlowJVForm
					className={cx("p-5 relative transition-all duration-200", {
						"bg-gray-900": theme === "dark",
						"bg-gray-100": theme === "light",
					})}
					theme={theme}
					schema={flowSchema}
					value={data.value}
					onChange={setData}
					prepend={
						<div>
							<h2>Registration Form</h2>
							<span
								className={cx(
									"absolute top-0 right-0 text-3xl p-3 px-5 select-none",
									"cursor-pointer hover:opacity-100 opacity-75 font-bold",
									"transition-colors duration-100",
									{
										"text-black": theme === "light",
										"text-white": theme === "dark",
									}
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
