import { DemoForm } from "components/Demo";
export default function Demo() {
	return (
		<>
			<style global jsx>
				{`
					body {
						background-color: #eeeeee;
					}
				`}
			</style>
			<title>FlowJV Demo</title>
			<img
				src="logo-teal.svg"
				className="w-40 block mx-auto mt-16 mb-6"
			/>
			<DemoForm />
		</>
	);
}
