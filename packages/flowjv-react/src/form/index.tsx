import { IFlowSchema, IKeyPath, validateJSONFlow } from "flowjv";
import { compileSchema, IBlocks } from "flowjv/dist/jsonflow/compile";
import { set, get, unset } from "flowjv/dist/helper/immutable";
import React, { useCallback, useMemo, useRef } from "react";
import { IFlowJVUIConfig } from "./config";

export interface IFlowJVContext {
	schema: IFlowSchema;
	blocks: IBlocks;
	register: (key: IKeyPath, onTouch: (touched: boolean) => void) => void;
	setValue: (key: IKeyPath, value: any) => void;
	getValue: (key: IKeyPath) => any;
	deleteValue: (key: IKeyPath) => void;
	subscribeValidation: (func: (isValid: boolean) => void) => void;
	subscribeData: (
		deps:
			| {
					data: string[];
					context: string[];
			  }
			| "*",
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
	flowConfig,
	schema,
	className,
	onSubmit,
	children,
}: IFlowJVForm<IData, IContext, A, B, C, D, E>) {
	const data = useRef<IData>(initialData as any);
	const context = useRef<IContext>(initialContext as any);

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

	const validationSubscribers = useRef<Set<(isValid: boolean) => void>>(
		new Set()
	);
	const isFormValid = useRef(false);
	const triggerValidation = useCallback(() => {
		const { isValid } = validateJSONFlow(
			schema,
			{
				data: data.current,
				context: context.current,
			},
			{ aggressive: false }
		);
		if (isValid !== isFormValid.current) {
			isFormValid.current = isValid;
			validationSubscribers.current.forEach((func) => func(isValid));
		}
	}, []);

	const registered = useRef<{
		[key: string]:
			| {
					onTouch: Set<any>;
			  }
			| undefined;
	}>({});
	const formContext: IFlowJVContext = {
		schema,
		blocks,
		register(key: IKeyPath, onTouch) {
			const value = registered.current[key.join(".")];
			registered.current[key.join(".")] = {
				...value,
				onTouch: value?.onTouch.add(onTouch) ?? new Set([onTouch]),
			};
		},
		getValue: (key: IKeyPath) => {
			return get(data.current, key);
		},
		setValue: (key: IKeyPath, value: any) => {
			const path = key.join(".");
			data.current = set(data.current, key, value);
			triggerValidation();
			subscribers.current.data[path]?.forEach((func) =>
				func({ data: data.current, context: context.current })
			);
			allSubscribers.current.forEach((func) =>
				func({ data: data.current, context: context.current })
			);
		},
		deleteValue: (key) => {
			data.current = unset(data.current, key);
			triggerValidation();
		},
		subscribeValidation(func) {
			func(isFormValid.current);
			validationSubscribers.current.add(func);
			return () => {
				validationSubscribers.current.delete(func);
			};
		},
		subscribeData: (deps, func) => {
			if (deps === "*") {
				// Subscribe all.
				return;
			}
			const { data: d, context: c } = deps;
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
	};
	return (
		<flowJVContext.Provider value={formContext}>
			<form
				className={className}
				onSubmit={(e) => {
					e.preventDefault();
					// touchAll
					Object.entries(registered.current).forEach(([_, value]) =>
						value?.onTouch.forEach((v) => v(true))
					);
					onSubmit?.({
						isValid: isFormValid.current,
						data: data.current,
						context: context.current,
					});
				}}
			>
				{children}
			</form>
		</flowJVContext.Provider>
	);
}
