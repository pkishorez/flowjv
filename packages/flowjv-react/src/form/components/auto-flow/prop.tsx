import { IKeyPath } from "flowjv";
import { IObjectPropertyAndCondition } from "flowjv/dist/jsonflow/flow/composite/object";
import React from "react";
import { ArrayFlow } from "./array";
import { IfFlow } from "./if";
import { ObjectFlow } from "./object";
import { SimpleFlow } from "./simple";
import { SwitchFlow } from "./switch";

interface IPropFlowProps {
	schema: IObjectPropertyAndCondition;
	keyPath: IKeyPath;
}
export function PropFlow({ schema, keyPath }: IPropFlowProps) {
	switch (schema.type) {
		case "if": {
			return <IfFlow schema={schema} keyPath={keyPath} />;
		}
		case "switch": {
			return <SwitchFlow schema={schema} keyPath={keyPath} />;
		}
		case "object": {
			return (
				<ObjectFlow
					schema={schema}
					keyPath={[...keyPath, schema.key]}
				/>
			);
		}
		case "array": {
			return (
				<ArrayFlow schema={schema} keyPath={[...keyPath, schema.key]} />
			);
		}
		default: {
			return (
				<SimpleFlow
					schema={schema}
					keyPath={[...keyPath, schema.key]}
				/>
			);
		}
	}
}
