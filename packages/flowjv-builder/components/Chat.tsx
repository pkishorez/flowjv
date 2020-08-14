import { useState, useEffect, useRef } from "react";
import cx from "classnames";
import { flowSchema } from "./schema";
import {
	createMuiTheme,
	ThemeProvider,
	Button,
	Typography,
	Paper,
	TextField,
	Box,
} from "@material-ui/core";
import { AnimatePresence, motion } from "framer-motion";
import CssBaseline from "@material-ui/core/CssBaseline";
import {
	cyan,
	indigo,
	teal,
	orange,
	amber,
	lightGreen,
	green,
	lightBlue,
} from "@material-ui/core/colors";
import { chatTraverse, IAtom, execJSONExpression } from "flowjv";
import { IChatTraverseGenerator } from "flowjv/dist/jsonflow/visitor";
import { set } from "flowjv/dist/helper/immutable";

export function DemoChat() {
	const [messages, setMessages] = useState<
		{ type: "bot" | "user"; message: string }[]
	>([]);
	const addMessages = (messages: any[]) => {
		setMessages(messages);
		setTimeout(() => {
			const objDiv = document.getElementById("scroll");
			objDiv.scrollTop = objDiv.scrollHeight;
		}, 100);
	};
	const data = useRef({});
	const [theme, setTheme] = useState<"dark" | "light">("dark");
	const lightTheme = createMuiTheme({
		palette: {
			type: "light",
			primary: lightBlue,
			secondary: orange,
		},
	});
	const darkTheme = createMuiTheme({
		palette: {
			type: "dark",
			primary: teal,
			secondary: orange,
		},
	});
	const [currentProperty, setCurrentProperty] = useState<{
		type: "primitive";
		ref: string[];
		schema: IAtom;
	} | null>(null);
	const gen = useRef<IChatTraverseGenerator>();

	const inputEntered = () => {
		if (inputText.trim() !== "") {
			//
			if (!currentProperty) {
				return;
			}
			const { schema } = currentProperty;
			data.current = set(data.current, currentProperty.ref, inputText);
			const newMessages = [];
			const errors = schema.validations
				?.map(({ logic, err }) => {
					const result = !!execJSONExpression(logic, {
						data: data.current,
						refPath: currentProperty.ref,
					});
					return result ? null : err || "Error";
				})
				.filter((r) => r !== null);
			setInputText("");
			newMessages.push({ type: "user", message: inputText });
			if (errors?.length) {
				newMessages.push(
					...errors.map((err) => ({
						type: "bot" as any,
						message: err,
					}))
				);
				addMessages([...messages, ...newMessages]);
			} else {
				// Move forward.
				getNext([...newMessages]);
			}
		}
	};
	const getNext = (newMessages: any[] = []) => {
		const value = gen.current && gen.current.next();
		if (!value.done) {
			setCurrentProperty(value.value);
			if (value.value.schema.type === "custom") {
				return getNext(newMessages);
			}
			addMessages([
				...messages,
				...newMessages,
				{ type: "bot", message: value.value.schema.label },
			]);
		} else {
			alert(JSON.stringify(data.current, null, "  "));
		}
	};
	useEffect(() => {
		(window as any).chatTraverse = chatTraverse;
		(window as any).flowSchema = flowSchema;
		// return () => {};
		gen.current = chatTraverse(flowSchema, { context: {}, data: {} });
		getNext();
	}, [flowSchema]);
	const [inputText, setInputText] = useState("");
	return (
		<ThemeProvider theme={theme === "dark" ? darkTheme : lightTheme}>
			<CssBaseline />
			<style global jsx>{`
				body {
					height: 100vh;
					display: flex;
					align-items: center;
					justify-content: center;
				}
				#scroll {
					scroll-behavior: smooth;
				}
			`}</style>
			<Paper
				elevation={5}
				className={cx(
					"my-10 mx-auto max-w-md w-screen p-5",
					"flex flex-col"
				)}
			>
				<div className="flex">
					<Typography className="flex-grow" variant="h4">
						ChatBot!
					</Typography>
					<span
						className={cx(
							"text-3xl p-3 px-5 select-none",
							"cursor-pointer hover:opacity-100 opacity-75 font-bold",
							"transition-colors duration-100"
						)}
						onClick={(e) =>
							setTheme(theme === "dark" ? "light" : "dark")
						}
					>
						☾
					</span>
				</div>
				<div
					className="flex flex-col my-4"
					style={{
						height: "calc(100vh - 200px)",
					}}
				>
					<div
						className="flex-grow overflow-y-auto pb-10"
						id="scroll"
					>
						<AnimatePresence>
							{messages.map(({ type, message }, i) => (
								<motion.div
									key={i}
									transition={
										{
											// delay: i,
										}
									}
									initial={{ height: 0, opacity: 0 }}
									animate={{
										height: "auto",
										opacity: 1,
									}}
									className={cx("mt-4 flex", {
										"justify-end": type === "user",
									})}
								>
									<Box
										bgcolor={cx({
											"primary.main": type === "bot",
											"secondary.main": type === "user",
										})}
										className="p-3"
									>
										{message}
									</Box>
								</motion.div>
							))}
						</AnimatePresence>
					</div>
					<TextField
						value={inputText}
						onKeyUp={(e) => {
							if (e.key === "Enter") {
								inputEntered();
							}
						}}
						onChange={(e) => setInputText(e.target.value)}
						id="outlined-basic"
						className="w-full mt-4"
						variant="filled"
					/>
				</div>
			</Paper>
		</ThemeProvider>
	);
}
DemoChat.displayName = "DemoForm";
