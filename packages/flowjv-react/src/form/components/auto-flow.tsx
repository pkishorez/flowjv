import { execJSONExpression, IKeyPath, ISimpleType } from "flowjv";
import {
	IObjectType,
	IObjectPropertyAndCondition,
} from "flowjv/dist/jsonflow/flow/composite/object";
import { IIfConditionType } from "flowjv/dist/jsonflow/flow/logic/if";
import { ISwitchType } from "flowjv/dist/jsonflow/flow/logic/switch";
import React, { useContext, useEffect, useMemo, useState } from "react";
import { flowJVContext } from "..";

interface IAutoFlow {
	schema: IObjectType | IIfConditionType | ISwitchType | ISimpleType;
	path: IKeyPath;
}
export function AutoFlowSchema({ schema, path }: IAutoFlow) {
	const result = useMemo(() => {
		const PropertyFlow = ({
			sch,
			path,
		}: {
			sch: IObjectPropertyAndCondition;
			path: IKeyPath;
		}) => {
			switch (sch.type) {
				case "if":
				case "switch": {
					return <AutoFlowSchema schema={sch} path={path} />;
				}
				case "object":
				default: {
					return (
						<AutoFlowSchema
							schema={sch}
							path={[...path, sch.key]}
						/>
					);
				}
			}
		};
		switch (schema.type) {
			case "object": {
				return (
					<>
						{schema.properties.map((v, i) => (
							<PropertyFlow sch={v} key={i} path={path} />
						))}
					</>
				);
			}
			case "if": {
				const trueFlow = schema.true.map((v, i) => (
					<PropertyFlow sch={v} key={i} path={path} />
				));
				const falseFlow = schema.false?.map((v, i) => (
					<PropertyFlow sch={v} key={i} path={path} />
				));
				return (
					<>
						{trueFlow}
						{falseFlow}
					</>
				);
			}
			case "switch": {
				const cases = Object.entries(schema.cases).map(([_, props]) =>
					props.map((prop, i) => (
						<AutoFlowSchema schema={prop} key={i} path={path} />
					))
				);
				return <>{cases}</>;
			}
			default: {
				return <SimpleFlow keyPath={path} />;
			}
		}
	}, [schema]);
	return result;
}

interface ISimpleFlow {
	keyPath: IKeyPath;
}
function SimpleFlow({ keyPath }: ISimpleFlow) {
	const [touched, setTouched] = useState(false);
	const {
		extraUIConfig,
		blocks,
		renderSimpleSchema,
		deleteValue,
		getValue,
		setValue,
		subscribeAll,
	} = useContext(flowJVContext);
	const path = keyPath.join(".");
	console.log("PATH : ", path);

	const [errors, setErrors] = useState<string[]>([]);
	const [schema, setSchema] = useState<ISimpleType | null>(null);
	useEffect(() => {
		const block = blocks[path];
		if (block) {
			return subscribeAll(({ data, context }) => {
				const schema = block.find(({ condPath }) =>
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
				console.log("SCHEMA : ", path, schema);
				if (!schema) {
					setSchema(null);
					return;
				}
				const validations = schema.validations;
				const errorMsgs: string[] = [];
				validations?.forEach(({ logic, err }) => {
					const result = execJSONExpression(logic, {
						data,
						context,
						refPath: keyPath,
					});
					if (!result) {
						errorMsgs.push(err);
					}
				});
				setErrors(errorMsgs);
				setSchema(schema);
			});
		} else {
			console.error("No block found at path : ", keyPath);
		}
	}, []);

	return useMemo(() => {
		const result = schema
			? renderSimpleSchema({
					schema,
					setValue,
					deleteValue,
					onTouch: (isTouched = true) => setTouched(isTouched),
					errors,
					touched,
					path: keyPath,
					value: getValue(keyPath),
			  })
			: null;
		return extraUIConfig ? extraUIConfig.wrapper(result) : result;
	}, [errors, schema, touched]);
}
