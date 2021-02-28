import { IKeyPath, ISimpleType } from "flowjv";
import {
	combineDependencies,
	getDependencies,
	IDependsOn,
} from "flowjv/dist/jsonexpression";
import { validateSimpleType } from "flowjv/dist/jsonflow/flow/simple";
import React from "react";
import { useState, useContext, useRef, useEffect, useMemo } from "react";
import { flowJVContext } from "../..";
import { IFlowJVUIConfigRef } from "../../config";

interface ISimpleFlow {
	keyPath: IKeyPath;
	schema: ISimpleType;
}
export function SimpleFlow({ schema, keyPath }: ISimpleFlow) {
	const [touched, setTouched] = useState(false);
	const {
		register,
		renderSchema: SchemaUI,
		subscribeData,
		deleteValue,
		getValue,
		setValue,
	} = useContext(flowJVContext);

	const [errors, setErrors] = useState<string[]>([]);

	const ref = useRef<IFlowJVUIConfigRef>();

	useEffect(() => {
		register(keyPath, {
			setFocus: () => ref.current?.setFocus(),
			setTouch: (touched = true) => setTouched(touched),
		});
	}, []);
	useEffect(() => {
		const selfDependency = [keyPath.join(".")] as IDependsOn | null;
		const deps =
			schema.validations?.reduce(
				(agg, v) => combineDependencies(agg, getDependencies(v.logic)),
				selfDependency
			) ?? selfDependency;
		return subscribeData(deps, function ({ data, context }) {
			setErrors(
				validateSimpleType(
					schema,
					{ data, context, refPath: keyPath },
					{}
				).errors
			);
		});
	}, [schema, register]);

	const result = useMemo(() => {
		const result = schema ? (
			<SchemaUI
				{...{
					schemaType: "simple",
					schema,
					setValue,
					deleteValue,
					registerRef: (simpleRef) => {
						ref.current = simpleRef;
					},
					onTouch: (isTouched = true) => setTouched(isTouched),
					errors,
					touched,
					path: keyPath,
					value: getValue(keyPath),
				}}
			/>
		) : null;
		return result;
	}, [errors, schema, touched]);
	return result;
}
