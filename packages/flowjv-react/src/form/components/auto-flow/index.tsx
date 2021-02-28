import { execJSONExpression, ISimpleType } from "flowjv";
import { IKeyPath, stringToKeyPath } from "flowjv/dist/helper/immutable";
import { IArrayType } from "flowjv/dist/jsonflow/flow/composite/array";
import { IObjectType } from "flowjv/dist/jsonflow/flow/composite/object";
import React, { useEffect, useState, useContext, useMemo } from "react";
import { flowJVContext } from "../../";
import { ArrayFlow } from "./array";
import { ObjectFlow } from "./object";
import { SimpleFlow } from "./simple";

interface IAutoFlowProps {
	path?: string | IKeyPath;
}
export function AutoFlow({ path = "" }: IAutoFlowProps) {
	const { subscribeData, getBlock } = useContext(flowJVContext);
	const [schema, setSchema] = useState<
		ISimpleType | IObjectType | IArrayType | null
	>(null);

	const keyPath = useMemo(
		() => (typeof path === "string" ? stringToKeyPath(path) : path),
		[path]
	);

	useEffect(() => {
		const block = getBlock(keyPath);
		if (block) {
			const deps = block.deps;
			const func = ({ data, context }) => {
				const schema = block.items?.find(({ condPath }) =>
					condPath.reduce(
						(acc, v) =>
							acc &&
							execJSONExpression(v.expr, {
								data,
								context,
								refPath: keyPath,
							}) === v.value,
						true as boolean
					)
				)?.schema;

				setSchema(schema ? schema : null);
			};

			return subscribeData(deps, func);
		} else {
			console.error("No block found at path : ", keyPath);
		}
	}, [keyPath]);

	if (!schema) return null;

	switch (schema.type) {
		case "object": {
			return <ObjectFlow schema={schema} keyPath={keyPath} />;
		}
		case "array": {
			return <ArrayFlow schema={schema} keyPath={keyPath} />;
		}
		default: {
			return <SimpleFlow schema={schema} keyPath={keyPath} />;
		}
	}
}

export { ArrayFlow } from "./array";
export { ObjectFlow } from "./object";
export { PropFlow } from "./prop";
export { IfFlow } from "./if";
export { SwitchFlow } from "./switch";
export { SimpleFlow } from "./simple";
