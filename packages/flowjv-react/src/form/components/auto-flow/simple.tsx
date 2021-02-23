import { IKeyPath, ISimpleType, execJSONExpression } from "flowjv";
import {
	combineDependencies,
	getDependencies,
	IDependsOn,
} from "flowjv/dist/jsonexpression";
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
		renderSchema,
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
		const selfDependency = {
			data: [keyPath.join(".")],
			context: [],
		} as IDependsOn | null;
		const deps =
			schema.validations?.reduce(
				(agg, v) => combineDependencies(agg, getDependencies(v.logic)),
				selfDependency
			) ?? selfDependency;
		return subscribeData(deps, function ({ data, context }) {
			setErrors(
				(schema.validations
					?.reduce(
						(agg, v) => [
							...agg,
							!!execJSONExpression(v.logic, {
								data,
								context,
								refPath: keyPath,
							})
								? null
								: v.err,
						],
						[] as (string | null)[]
					)
					.filter((v) => v !== null) as string[]) ?? []
			);
		});
	}, [schema, register]);

	const result = useMemo(() => {
		const result = schema
			? renderSchema({
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
			  })
			: null;
		return result;
	}, [errors, schema, touched]);
	return result;
}
