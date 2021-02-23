import { IKeyPath } from "flowjv";
import { get } from "flowjv/dist/helper/immutable";
import { IArrayType } from "flowjv/dist/jsonflow/flow/composite/array";
import { uniqueId } from "flowjv/dist/jsonflow/flow/helper";
import React, {
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useRef,
	useState,
} from "react";
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
	const uniqueId = useRef(0);
	const uniqueIndexes = useRef<number[]>([]);

	const invalidateIndex = useCallback((index: number) => {
		uniqueIndexes.current[index] = uniqueId.current++;
	}, []);

	useEffect(() => {
		return subscribeData(
			{ data: [keyPath.join(".")], context: [] },
			({ data }) => {
				const value = get(data, keyPath, []);
				for (let i = 0; i < value.length; i++) {
					uniqueIndexes.current[i] =
						uniqueIndexes.current[i] ?? uniqueId.current++;
				}
				setData(value);
			}
		);
	}, []);

	const result = useMemo(
		() => (
			<>
				{renderSchema({
					schemaType: "array",
					value: data,
					uniqueIndexes: uniqueIndexes.current,
					deleteAtIndex: (index) => {
						invalidateIndex(index);
						deleteIndex([...keyPath, index]);
					},
					insertAtIndex: (index) => {
						invalidateIndex(index);
						insertIndex([...keyPath, index], undefined);
					},
					path: keyPath,
					schema,
				})}
			</>
		),
		[data]
	);
	return result;
}
