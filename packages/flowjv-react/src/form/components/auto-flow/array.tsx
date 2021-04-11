import { IKeyPath } from "flowjv";
import { get } from "flowjv/dist/helper/immutable";
import { IArrayType } from "flowjv/dist/jsonflow/flow/composite/array";
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
		renderSchema: SchemaUI,
		deleteIndex,
		insertIndex,
	} = useContext(flowJVContext);
	const uniqueId = useRef(0);
	const uniqueIndexes = useRef<number[]>([]);

	const invalidateIndex = useCallback((index: number) => {
		uniqueIndexes.current.length = index;
	}, []);

	useEffect(() => {
		return subscribeData([keyPath.join(".")], ({ data }) => {
			const value = get(data, keyPath, []);
			for (let i = 0; i < value.length; i++) {
				uniqueIndexes.current[i] =
					uniqueIndexes.current[i] ?? uniqueId.current++;
			}
			setData(value);
		});
	}, []);

	const result = useMemo(
		() => (
			<>
				<SchemaUI
					{...{
						type: "array",
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
					}}
				/>
			</>
		),
		[data]
	);
	return result;
}
