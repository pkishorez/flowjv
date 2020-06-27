import { DemoForm } from "components/Demo";
export default function Demo() {
	return (
		<>
			<title>FlowJV Demo</title>
			<img
				src="logo-teal.svg"
				className="w-40 block mx-auto mt-16 mb-6"
			/>
			<DemoForm />
		</>
	);
}
