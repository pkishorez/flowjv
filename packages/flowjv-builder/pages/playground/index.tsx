import { AutoFlow } from "flowjv-react";
import { FlowJVForm, SubmitButton } from "flowjv-react-custom";
import React, { useEffect, useRef, useState } from "react";
import { loadEditor } from "./editor";
import cx from "classnames";
import { Button } from "@material-ui/core";

export default function PlayGround() {
	const ref = useRef<HTMLDivElement | null>(null);
	const [value, setValue] = useState<any>({});
	const [error, setError] = useState<any>(false);
	useEffect(() => {
		if (!ref.current) {
			return;
		}
		loadEditor(ref.current, {
			onChange: (v) => {
				setError(false);
				try {
					let json;
					eval(`json = ${v}`);
					setValue(json);
				} catch (e) {
					// ERROR.
					console.log("VALUE : ", v, e);
					setError(true);
				}
			},
		});
	}, [ref]);
	return (
		<div className="p-5 overflow-y-auto">
			<style jsx global>{`
				body {
					background: #eeeeee;
				}
			`}</style>
			<div className="w-1/2">
				{/* <pre>{JSON.stringify(value, null, "  ")}</pre> */}
				<div
					className={cx(
						"mx-auto max-w-sm shadow-lg p-5 self-center overflow-y-auto",
						"bg-white my-10 rounded-sm"
					)}
				>
					<div className="flex items-center py-3">
						<h2 className="flex-grow my-0">PlayGround</h2>
						{error && (
							<div className="uppercase text-red-600">
								schema error
							</div>
						)}
					</div>
					<ErrorBoundary value={value} />
				</div>
			</div>
			<div
				className={cx(
					"flex flex-col w-1/2 fixed bottom-3 right-0 top-3 py-4",
					"border border-solid box-border",
					"border-gray-400 bg-white"
				)}
			>
				<div className={cx("flex-grow ")} ref={ref} />
			</div>
		</div>
	);
}

export class ErrorBoundary extends React.Component<{ value: any }> {
	state = {
		hasError: false,
	};
	static getDerivedStateFromError() {
		// Update state so the next render will show the fallback UI.
		return { hasError: true };
	}
	i = 0;
	data = {};
	timeout: NodeJS.Timeout | false = false;
	componentDidUpdate() {
		if (this.state.hasError && !this.timeout) {
			this.timeout = setTimeout(() => {
				this.timeout = false;
				this.setState({ hasError: false });
			}, 1000);
		}
	}
	render() {
		if (this.state.hasError) {
			// You can render any custom fallback UI
			return (
				<div className="text-center my-4">
					<h1>Something went wrong.</h1>
				</div>
			);
		}

		return (
			<div>
				<FlowJVForm<any, any>
					schema={this.props.value}
					initialData={this.data}
					onChange={({ data }) => (this.data = data)}
					key={this.i++}
				>
					<AutoFlow />
					<SubmitButton />
				</FlowJVForm>
			</div>
		);
	}
}
