import { setupFlowJV } from "flowjv-react";
import { config } from "flowjv-react-material";
import { useState } from "react";
import cx from "classnames";
import { flowSchema } from "./schema";
import {
	createMuiTheme,
	ThemeProvider,
	Button,
	Typography,
	Paper,
} from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";
import { cyan, indigo } from "@material-ui/core/colors";

const FlowJVForm = setupFlowJV(config);

export function DemoForm() {
	const [data, setData] = useState({ value: {}, isValid: false });
	const [theme, setTheme] = useState<"dark" | "light">("dark");
	const lightTheme = createMuiTheme({
		palette: {
			type: "light",
			primary: indigo,
			secondary: indigo,
		},
	});
	const darkTheme = createMuiTheme({
		palette: {
			type: "dark",
			primary: cyan,
			secondary: cyan,
		},
	});
	return (
		<ThemeProvider theme={theme === "dark" ? darkTheme : lightTheme}>
			<CssBaseline />
			<Paper elevation={5} className="my-10 mx-auto max-w-md w-screen">
				<FlowJVForm
					className={cx("p-5 relative transition-all duration-200")}
					schema={flowSchema}
					value={data.value}
					onChange={setData}
					prepend={
						<div>
							<Typography variant="h4">
								Registration Form
							</Typography>
							<span
								className={cx(
									"absolute top-0 right-0 text-3xl p-3 px-5 select-none",
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
						<div className="mt-3">
							<Button
								disabled={!data.isValid}
								size="large"
								fullWidth
								type="submit"
							>
								Register
							</Button>
						</div>
					}
				/>
			</Paper>
		</ThemeProvider>
	);
}
DemoForm.displayName = "DemoForm";
