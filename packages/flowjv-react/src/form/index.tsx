import { IFlowSchema, IKeyPath, validateJSONFlow } from "flowjv";
import { compileSchema, IBlocks } from "flowjv/dist/jsonflow/compile";
import { set, get, unset } from "flowjv/dist/helper/immutable";
import React, { useMemo, useRef } from "react";
import { IFlowJVUIConfig, IFlowJVUIExtrasConfig } from "./config";

export interface IFlowJVContext {
	schema: IFlowSchema;
	blocks: IBlocks;
	setValue: (key: IKeyPath, value: any) => void;
	getValue: (key: IKeyPath) => any;
	deleteValue: (key: IKeyPath) => void;
	subscribeAll(func: (args: { data: any; context: any }) => void): () => void;
	subscribe: (args: {
		data: IKeyPath[];
		context: IKeyPath[];
		func: () => void;
	}) => void;
	extraUIConfig?: IFlowJVUIExtrasConfig;
	renderSimpleSchema: IFlowJVUIConfig;
}
export const flowJVContext = React.createContext<IFlowJVContext>({} as any);

export interface IFlowJVForm<
	IData = {},
	IContext = {},
	A = {},
	B = {},
	C = {},
	D = {},
	E = {}
> {
	initialData?: Partial<IData>;
	initialContext?: Partial<IContext>;
	flowConfig: IFlowJVUIConfig<A, B, C, D, E>;
	extraUIConfig?: IFlowJVUIExtrasConfig;
	schema: IFlowSchema;
	children: any;
	className?: string;
	onSubmit?: (args: {
		isValid: boolean;
		data: IData;
		context: IContext;
	}) => void;
}
export function FlowJVForm<
	IData = {},
	IContext = {},
	A = {},
	B = {},
	C = {},
	D = {},
	E = {}
>({
	initialData = {},
	initialContext = {},
	extraUIConfig,
	flowConfig,
	schema,
	className,
	onSubmit,
	children,
}: IFlowJVForm<IData, IContext, A, B, C, D, E>) {
	const data = useRef(initialData);
	const context = useRef(initialContext);

	const blocks = useMemo(() => compileSchema(schema), []);
	console.log("BLOCKS : ", blocks);

	const allSubscribers = useRef<
		((args: { data: any; context: any }) => void)[]
	>([]);
	const subscribers = useRef<{
		data: { [path: string]: undefined | ((value: any) => void)[] };
		context: { [path: string]: undefined | ((value: any) => void)[] };
	}>({ data: {}, context: {} });

	return (
		<flowJVContext.Provider
			value={{
				extraUIConfig,
				schema,
				blocks,
				getValue: (key: IKeyPath) => {
					return get(data.current, key);
				},
				setValue: (key: IKeyPath, value: any) => {
					const path = key.join(".");
					data.current = set(data.current, key, value);
					subscribers.current.data[path]?.forEach((func) =>
						func(value)
					);
					allSubscribers.current.forEach((func) =>
						func({ data: data.current, context: context.current })
					);
				},
				deleteValue: (key) => {
					data.current = unset(data.current, key);
				},
				subscribeAll(func) {
					func({ data: data.current, context: context.current });
					allSubscribers.current.push(func);
					return () => {
						allSubscribers.current = allSubscribers.current.filter(
							(v) => v !== func
						);
					};
				},
				subscribe: ({ data, context, func }) => {
					data.forEach((path) => {
						const p = path.join(".");

						if (!subscribers.current.data[p]) {
							subscribers.current.data[p] = [];
						}
						(subscribers.current.data[p] as any).push(func);
					});
					context.forEach((path) => {
						const p = path.join(".");
						if (!subscribers.current.context[p]) {
							subscribers.current.context[p] = [];
						}
						(subscribers.current.context[p] as any).push(func);
					});
					return () => {
						data.forEach((path) => {
							const p = path.join(".");
							subscribers.current.data[
								p
							] = subscribers.current.data[p]?.filter(
								(f) => f !== func
							);
						});
						context.forEach((path) => {
							const p = path.join(".");
							subscribers.current.context[
								p
							] = subscribers.current.context[p]?.filter(
								(f) => f !== func
							);
						});
					};
				},
				renderSimpleSchema: flowConfig as any,
			}}
		>
			<form
				className={className}
				onSubmit={(e) => {
					e.preventDefault();
					const { isValid } = validateJSONFlow(
						schema,
						{
							data: data.current,
							context: context.current,
						},
						{ aggressive: false }
					);
					onSubmit?.({
						isValid: isValid as any,
						data: data.current as any,
						context: context.current as any,
					});
				}}
			>
				{children}
			</form>
		</flowJVContext.Provider>
	);
}
