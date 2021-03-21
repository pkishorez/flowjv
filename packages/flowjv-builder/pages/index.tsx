import React, { useEffect, useRef } from "react";
import Head from "next/head";
import Link from "next/link";
import cx from "classnames";
import video1 from "../public/demo/video1.mp4";
import video2 from "../public/demo/video2.mp4";
import video3 from "../public/demo/video3.mp4";
import video4 from "../public/demo/video4.mp4";
import { Button as Button_, ButtonGroup } from "@material-ui/core";

function Button({ children, href, className, ...props }: any) {
	return (
		<div className={cx(className, "uppercase")}>
			<Link href={href}>
				<Button_ {...props}>{children}</Button_>
			</Link>
		</div>
	);
}

export default function IndexPage() {
	return (
		<div>
			<Head>
				<meta name="theme-color" content="#109488" />
				<title>FlowJV</title>
			</Head>
			<div
				className={cx(
					"h-screen flex flex-col items-center justify-center",
					"bg-gray-50 text-gray-50",
					"relative overflow-hidden"
				)}
			>
				<div
					className="text-center -mt-12 relative p-4 rounded-md shadow-2xl"
					style={{ backgroundColor: "rgba(15, 118, 110, 0.8)" }}
				>
					<h2 className="text-6xl font-bold my-0">FlowJV</h2>
					<div className="text-left">
						<Wave str="A Flow based approach to JSON Validation" />
					</div>
				</div>
				<div className="mt-5 flex text-teal-700 items-center">
					<ButtonGroup variant="text" color="primary">
						<Button href="https://pkishorez.gitbook.io/flowjv/">
							Docs
						</Button>
						<Button
							href={`${process.env.NEXT_PUBLIC_ASSET_PREFIX}/playground`}
						>
							Playground
						</Button>
						<Button href="https://www.github.com/pkishorez/flowjv">
							Github
						</Button>
					</ButtonGroup>
				</div>
			</div>
			<Screen
				title="Form that flows!"
				counter={1}
				alternate
				content={
					<p className="text-lg mt-4">
						Given the data requirements,
						<br /> FlowJV takes care of the rest!
					</p>
				}
				videoSrc={video1}
			/>
			<Screen
				title="Validation"
				counter={2}
				content={
					<p className="text-lg mt-4">
						Validations are part of the data requirements schema.
						<br />
						FlowJV takes care of showing validations as appropriate.
					</p>
				}
				videoSrc={video2}
			/>
			<Screen
				title="Conditionals"
				alternate
				counter={3}
				content={
					<p className="text-lg mt-4">
						FlowJV can have data requirements defined conditionally.
					</p>
				}
				videoSrc={video3}
			/>
			<Screen
				title="Arrays"
				counter={4}
				content={
					<p className="text-lg mt-4">
						Working with arrays in FlowJV is a breeze!
						<br />
						The building blocks can be nested for complex
						requirements!
					</p>
				}
				videoSrc={video4}
			/>
			<div
				className={cx(
					"min-h-screen flex items-center justify-center bg-teal-700 text-gray-50",
					"relative"
				)}
			>
				<div
					className={cx(
						"flex justify-center flex-col",
						"md:flex-row"
					)}
				>
					<div
						className={cx(
							"bg-gray-50 mx-4 px-10 p-5 text-teal-700",
							"shadow-2xl"
						)}
					>
						<h2 className="text-4xl">Feature check list</h2>
						<CheckItem>Automatic UI render</CheckItem>
						<CheckItem>Validations</CheckItem>
						<CheckItem>Conditionals</CheckItem>
						<CheckItem>Arrays</CheckItem>
						<CheckItem>Custom UI</CheckItem>
					</div>
				</div>
				<div className="absolute bottom-5 left-0 right-0 flex justify-center text-lg">
					<div>
						By{" "}
						<a
							href="https://www.linkedin.com/in/pkishoez"
							className="text-gray-50 font-bold"
						>
							Kishore
						</a>
					</div>
				</div>
			</div>
		</div>
	);
}
function CheckItem({ children = "" }) {
	return (
		<div className="flex items-center mt-2">
			<span className="text-sm text-gray-50 bg-teal-700 w-5 h-5 flex items-center justify-center font-bold rounded-md">
				✓
			</span>
			<div className="flex-grow ml-3 text-lg">{children}</div>
		</div>
	);
}

function Screen({
	alternate,
	videoSrc,
	content,
	counter,
	title,
}: {
	alternate?: boolean;
	videoSrc: string;
	content: any;
	counter: number;
	title: string;
}) {
	return (
		<div
			className={cx(
				"min-h-screen flex items-center justify-center box-border py-8 px-5",
				{
					"bg-teal-600 text-gray-50": alternate,
					"bg-gray-100 text-teal-700": !alternate,
				}
			)}
		>
			<div
				className={cx(
					"flex box-border px-4 flex-col items-center w-full",
					"md:flex-row"
				)}
			>
				<div
					className={cx("text-right flex justify-start", "md:w-1/2", {
						"md:order-1 md:mr-10 md:justify-end": alternate,
						"md:order-2 md:ml-10 md:justify-start": !alternate,
					})}
				>
					<div className="text-left md:max-w-sm">
						<div className="flex items-center justify-start">
							<div
								className={cx(
									"w-14 h-14 md:w-20 md:h-20 rounded-full text-3xl font-extrabold",
									"flex items-center justify-center mx-auto flex-shrink-0",
									{
										"bg-gray-50 text-teal-700": alternate,
										"bg-teal-600 text-white": !alternate,
									}
								)}
							>
								{counter}
							</div>
							<h2 className="text-4xl font-bold flex-grow ml-4">
								{title}
							</h2>
						</div>
						<div className="ml-0">{content}</div>
					</div>
				</div>
				<div
					className={cx(
						"text-left flex flex-col mt-5",
						"md:w-1/2 md:flex-row md:mt-0",
						{
							"md:order-2 md:ml-10 md:justify-start": alternate,
							"md:order-1 md:mr-10 md:justify-end": !alternate,
						}
						// "overflow-hidden"
					)}
				>
					<div className="shadow-2xl overflow-hidden mx-4">
						<video
							className={cx("relative max-w-xs", "md:max-w-xs")}
							style={{ top: -1, left: -1 }}
							src={videoSrc}
							loop
							autoPlay
							muted
						/>
					</div>
				</div>
			</div>
		</div>
	);
}

function Wave({ str = "" }) {
	const angle = useRef(0);
	const spanRefs = useRef<HTMLSpanElement[]>([]);

	useEffect(() => {
		let animFrame: number | null = null;
		const func = () => {
			angle.current += 5;
			for (let i = 0; i < str.length; i++) {
				const spanRef = spanRefs.current[i];
				if (spanRef) {
					const pos =
						Math.sin(
							(2 * Math.PI * (i * 20 + angle.current)) / 1000.0
						) * 5;
					spanRef.style.transform = `translateY(${pos}px)`;
				}
			}
			animFrame = requestAnimationFrame(func);
		};
		func();
		return () => {
			animFrame && cancelAnimationFrame(animFrame);
		};
	}, [str]);
	return (
		<div className="leading-10 whitespace-nowrap">
			{str.split("").map((ch, i) => (
				<span
					ref={(r) => {
						if (r) {
							spanRefs.current[i] = r;
						}
					}}
					key={i}
					className={cx(
						"ml-0 inline-block",
						{
							"px-1": ch === " ",
						},
						"transition-transform duration-75"
					)}
				>
					{ch}
				</span>
			))}
		</div>
	);
}
