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
	subscribe: (
		deps: {
			data: string[];
			context: string[];
		},
		func: (args: { data: any; context: any }) => void
	) => void;
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

	const allSubscribers = useRef<
		Set<(args: { data: any; context: any }) => void>
	>(new Set());
	const subscribers = useRef<{
		data: {
			[path: string]:
				| undefined
				| Set<(value: { data: any; context: any }) => void>;
		};
		context: {
			[path: string]:
				| undefined
				| Set<(value: { data: any; context: any }) => void>;
		};
	}>({ data: {}, context: {} });

	return (
		<flowJVContext.Provider
			value={{
				schema,
				blocks,
				getValue: (key: IKeyPath) => {
					return get(data.current, key);
				},
				setValue: (key: IKeyPath, value: any) => {
					const path = key.join(".");
					data.current = set(data.current, key, value);
					subscribers.current.data[path]?.forEach((func) =>
						func({ data: data.current, context: context.current })
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
					allSubscribers.current.add(func);
					return () => {
						allSubscribers.current.delete(func);
					};
				},
				subscribe: ({ data: d, context: c }, func) => {
					func({ data: data.current, context: context.current });
					d.forEach((path) => {
						if (!subscribers.current.data[path]) {
							subscribers.current.data[path] = new Set();
						}
						subscribers.current.data[path]?.add(func);
					});
					c.forEach((path) => {
						if (!subscribers.current.context[path]) {
							subscribers.current.context[path] = new Set();
						}
						subscribers.current.context[path]?.add(func);
					});
					return () => {
						d.forEach((path) => {
							subscribers.current.data[path]?.delete(func);
						});
						c.forEach((path) => {
							subscribers.current.context[path]?.delete(func);
						});
					};
				},
				renderSimpleSchema: flowConfig,
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
