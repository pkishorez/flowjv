import { IKeyPath } from "flowjv";
import { get } from "flowjv/dist/helper/immutable";
import { IArrayType } from "flowjv/dist/jsonflow/flow/composite/array";
import React, { useContext, useEffect, useMemo, useState } from "react";
import { flowJVContext } from "../..";

interface IArrayFlowProps {
	schema: IArrayType;
	keyPath: IKeyPath;
}
export function ArrayFlow({ schema, keyPath }: IArrayFlowProps) {
	const [data, setData] = useState([]);

	const {
		subscribeData,
		renderSchema,
		deleteIndex,
		insertIndex,
	} = useContext(flowJVContext);
	useEffect(() => {
		return subscribeData(
			{ data: [keyPath.join(".")], context: [] },
			({ data }) => {
				setData(get(data, keyPath, []));
			}
		);
	}, []);

	const result = useMemo(
		() => (
			<>
				{renderSchema({
					schemaType: "array",
					value: data,
					deleteAtIndex: (index) => deleteIndex([...keyPath, index]),
					insertAtIndex: (index) =>
						insertIndex([...keyPath, index], undefined),
					path: keyPath,
					schema,
				})}
			</>
		),
		[data]
	);
	return result;
}
