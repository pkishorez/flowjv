import { IKeyPath } from "flowjv";
import { IObjectType } from "flowjv/dist/jsonflow/flow/composite/object";
import React from "react";
import { PropFlow } from "./prop";

interface IObjectFlow {
	schema: IObjectType;
	keyPath: IKeyPath;
}
export function ObjectFlow({ schema, keyPath }: IObjectFlow) {
	return (
		<>
			{schema.properties.map((prop, i) => (
				<PropFlow key={i} schema={prop} keyPath={keyPath} />
			))}
		</>
	);
}
