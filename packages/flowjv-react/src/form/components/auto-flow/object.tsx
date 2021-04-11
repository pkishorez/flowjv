import { IKeyPath } from "flowjv";
import { IObjectType } from "flowjv/dist/jsonflow/flow/composite/object";
import React, { useContext } from "react";
import { flowJVContext } from "../..";
import { PropFlow } from "./prop";

interface IObjectFlow {
	schema: IObjectType;
	keyPath: IKeyPath;
}
export function ObjectFlow({ schema, keyPath }: IObjectFlow) {
	const { renderSchema: SchemaUI } = useContext(flowJVContext);
	return (
		<>
			{schema.properties.map((prop, i) => (
				<SchemaUI type="propertyWrapper" key={i}>
					<PropFlow schema={prop} keyPath={keyPath} />
				</SchemaUI>
			))}
		</>
	);
}
