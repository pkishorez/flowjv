import { IKeyPath, execJSONExpression } from "flowjv";
import { getDependencies } from "flowjv/dist/jsonexpression";
import { IIfConditionType } from "flowjv/dist/jsonflow/flow/logic/if";
import React, { useContext, useState, useEffect, useMemo } from "react";
import { flowJVContext } from "../..";
import { PropFlow } from "./prop";

interface IIfFlowProps {
	schema: IIfConditionType;
	keyPath: IKeyPath;
}
export function IfFlow({ schema, keyPath }: IIfFlowProps) {
	const { subscribeData } = useContext(flowJVContext);

	const [conditionResult, setConditionResult] = useState<boolean | null>(
		null
	);

	useEffect(() => {
		const cond = schema.cond;
		const deps = getDependencies(cond);
		return subscribeData(deps, function ({ data, context }) {
			const cond = execJSONExpression(schema.cond, {
				data,
				context,
				refPath: keyPath,
			});
			setConditionResult(!!cond);
		});
	}, [schema, keyPath, setConditionResult]);

	const result = useMemo(() => {
		if (conditionResult === null) return null;

		return (
			<>
				{schema[conditionResult ? "true" : "false"]?.map((prop, i) => (
					<PropFlow schema={prop} key={i} keyPath={keyPath} />
				))}
			</>
		);
	}, [schema, keyPath, conditionResult]);

	return result;
}
