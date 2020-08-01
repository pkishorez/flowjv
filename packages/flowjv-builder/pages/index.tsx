import Head from "next/head";

export default function Index() {
	return (
		<>
			<Head>
				<title>FlowJV</title>
			</Head>
			<div className="fixed top-0 left-0 bottom-0 right-0 flex flex-col items-center justify-center bg-gray-200">
				<div>
					<div className="text-center text-black">
						{/* <div className="font-bold">Helloo</div> */}
						<div className="inline-flex items-start">
							{/* <h1>FlowJV</h1> */}
							<img
								src="logo-teal.svg"
								className="h-20"
								style={{
									filter:
										"drop-shadow( 0px 0px 5px rgb(255, 255, 255))",
								}}
							/>
						</div>
					</div>
					<div
						className="text-center text-black mt-3"
						style={{ textShadow: "0px 0px 1px white" }}
					>
						A Flow based JSON validation library.
					</div>
					<div className="flex justify-center mt-3">
						<HyperLink href="https://pkishoez.gitbook.io/flowjv/">
							Docs
						</HyperLink>
						<HyperLink className="ml-2" href="demo">
							Demo
						</HyperLink>
					</div>
					<div>
						<Input />
					</div>
				</div>
			</div>
		</>
	);
}

const HyperLink = ({ href, children, className = "", ...props }) => {
	return (
		<a
			{...props}
			href={href}
			className={
				"py-2 px-3 text-white bg-teal-700 hover:bg-teal-800 " +
				className
			}
		>
			{children}
		</a>
	);
};

const Input = () => {
	return (
		<div>
			<style jsx>{`
				.wrapper {
					display: block;
					position: relative;
					background-color: white;
					padding: 15px 10px;
					cursor: text;
					font-size: 1em;
				}
				.wrapper * {
					box-sizing: border-box;
				}
				.label {
					font-size: 1em;
					transform-origin: top left;
					transition: 0.3s transform;
				}
				input {
					position: absolute;
					padding: 5px 10px;
					bottom: 0;
					left: 0;
					outline: 0;
					font-size: 1em;
					border: 0;
					width: 100%;
					background-color: transparent;
					border-bottom: 2px solid gray;
				}
				input:focus {
					border-bottom: 2px solid black;
				}

				input::placeholder {
					color: transparent;
					transition: 0.3s color;
				}
				input:focus + .label,
				input:not(:placeholder-shown) + .label {
					transform: translateY(-8px) scale(0.7);
				}
				input:focus::placeholder,
				input:not(:placeholder-shown)::placeholder {
					color: gray;
				}
			`}</style>
			<label className="wrapper">
				<input type="text" placeholder="This is a placeholder!" />
				<div className="label">Name</div>
			</label>
		</div>
	);
};
