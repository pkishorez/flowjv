import Head from "next/head";

export default function Index() {
	return (
		<>
			<Head>
				<title>FlowJV</title>
			</Head>
			<div className="fixed top-0 left-0 bottom-0 right-0 flex flex-col items-center justify-center bg-gray-100">
				<div>
					<div className="text-center text-teal-800">
						{/* <div className="font-bold">Helloo</div> */}
						<div className="inline-flex items-start font-bold">
							<h1>FlowJV</h1>
							<div
								className="text-6xl"
								style={{ lineHeight: "1em" }}
							>
								!
							</div>
						</div>
					</div>
					<div className="text-center text-black text-xs">
						Still Work in progress
						<br /> Check this space for updates.
					</div>
				</div>
			</div>
		</>
	);
}
