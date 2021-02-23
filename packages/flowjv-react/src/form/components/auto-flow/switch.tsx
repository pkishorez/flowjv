import { IKeyPath, execJSONExpression } from "flowjv";
import { getDependencies } from "flowjv/dist/jsonexpression";
import { ISwitchType } from "flowjv/dist/jsonflow/flow/logic/switch";
import React, { useContext, useState, useEffect, useMemo } from "react";
import { flowJVContext } from "../..";
import { PropFlow } from "./prop";

interface ISwitchFlowProps {
	schema: ISwitchType;
	keyPath: IKeyPath;
}
export function SwitchFlow({ schema, keyPath }: ISwitchFlowProps) {
	const { subscribeData } = useContext(flowJVContext);

	const [switchResult, setSwitchResult] = useState<string | null>(null);

	useEffect(() => {
		const cond = schema.switch;
		const deps = getDependencies(cond);
		return subscribeData(deps, function func({ data, context }) {
			const cond = execJSONExpression(schema.switch, {
				data,
				context,
				refPath: keyPath,
			});
			setSwitchResult(cond as string);
		});
	}, [schema, keyPath, setSwitchResult]);

	const result = useMemo(() => {
		if (switchResult === null) return null;

		return (
			<>
				{schema.cases[switchResult]?.map((prop, i) => (
					<PropFlow schema={prop} key={i} keyPath={keyPath} />
				))}
			</>
		);
	}, [schema, keyPath, switchResult]);

	return result;
}
