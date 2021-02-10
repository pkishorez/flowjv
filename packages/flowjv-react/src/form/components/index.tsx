import { getSchemaByPath } from "flowjv/dist/jsonflow/utils";
import { stringToKeyPath } from "flowjv/dist/helper/immutable";
import React from "react";
import { useContext } from "react";
import { flowJVContext } from "..";
import { AutoFlowSchema } from "./auto-flow";

interface IAutoFlowProps {
	path?: string;
}
export function AutoFlow({ path = "" }: IAutoFlowProps) {
	const { schema: flowSchema } = useContext(flowJVContext);

	const keyPath = stringToKeyPath(path);
	const schema = getSchemaByPath(flowSchema, keyPath);
	if (!schema) {
		console.error(`Schema at path ${path} not found!`);
		return null;
	}
	return <AutoFlowSchema schema={schema} path={keyPath} />;
}
