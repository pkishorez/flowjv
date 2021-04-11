import { IFlowSchema, IKeyPath, validateJSONFlow } from "flowjv";
import { compileSchema, IBlocks } from "flowjv/dist/jsonflow/compile";
import { set, get, unset, insertIndex } from "flowjv/dist/helper/immutable";
import React, { useCallback, useEffect, useMemo, useRef } from "react";
import { IFlowJVUIConfig, IFlowJVUIConfigRef } from "./config";
import { getDependencies } from "flowjv/dist/jsonexpression";

type IFormValidationResult = ReturnType<typeof validateJSONFlow>;
export interface IFlowJVContext {
	schema: IFlowSchema;
	getBlock(key: IKeyPath): IBlocks[0] | undefined;
	register: (
		key: IKeyPath,
		args: IFlowJVUIConfigRef & {
			setTouch(touched?: boolean): void;
		}
	) => void;
	setValue: (key: IKeyPath, value: any) => void;
	getValue: (key: IKeyPath) => any;
	deleteValue: (key: IKeyPath) => void;
	insertIndex: (key: IKeyPath, value: any) => void;
	deleteIndex: (key: IKeyPath) => void;
	subscribeValidation: (
		func: (validation: IFormValidationResult) => void
	) => void;
	subscribeData: (
		deps: ReturnType<typeof getDependencies>,
		func: (args: { data: any; context: any }) => void
	) => void;
	renderSchema: IFlowJVUIConfig;
}
export const flowJVContext = React.createContext<IFlowJVContext>({} as any);

export interface IFlowJVForm<
	IData = {},
	IContext = {},
	A = {},
	B = {},
	C = {},
	D = {},
	E = {},
	F = {}
> {
	initialData?: Partial<IData>;
	context?: Partial<IContext>;
	flowConfig: IFlowJVUIConfig<A, B, C, D, E, F>;
	schema: IFlowSchema;
	children: any;
	schemaUI?: IFlowJVUIConfig<A, B, C, D, E, F>;
	renderMap?: {
		[key: string]: IFlowJVUIConfig<A, B, C, D, E, F>;
	};
	className?: string;
	onChange?: ({ data }: { data: IData }) => void;
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
	E = {},
	F = {}
>({
	initialData = {},
	context: initialContext = {},
	flowConfig,
	schema,
	className,
	onSubmit,
	children,
	renderMap,
	schemaUI,
	onChange,
}: IFlowJVForm<IData, IContext, A, B, C, D, E, F>) {
	const data = useRef<IData>(initialData as any);
	const context = useRef<IContext>(initialContext as any);

	const blocks = useMemo(() => compileSchema(schema), [schema]);

	const allSubscribers = useRef<
		Set<(args: { data: any; context: any }) => void>
	>(new Set());
	const subscribers = useRef<{
		data: {
			[path: string]:
				| undefined
				| Set<(value: { data: any; context: any }) => void>;
		};
	}>({ data: {} });

	const validationSubscribers = useRef<
		Set<(args: IFormValidationResult) => void>
	>(new Set());
	const formValidation = useRef<IFormValidationResult>();
	const triggerValidation = useCallback(() => {
		const result = validateJSONFlow(
			schema,
			{
				data: data.current,
				context: context.current,
			},
			{ aggressive: false }
		);
		if (result.isValid !== formValidation.current?.isValid) {
			validationSubscribers.current.forEach((func) => func(result));
		}
		formValidation.current = result;
	}, []);

	const triggerSubscriptions = useCallback((paths: IKeyPath[]) => {
		paths.forEach((path) => {
			subscribers.current.data[path.join(".")]?.forEach((func) =>
				func({ data: data.current, context: context.current })
			);
		});
		allSubscribers.current.forEach((func) =>
			func({ data: data.current, context: context.current })
		);
	}, []);

	useEffect(() => {
		// This is for FormSpy.
		onChange && allSubscribers.current.add(onChange);
		triggerSubscriptions([]);
	}, []);

	const registered = useRef<{
		[key: string]: IFlowJVUIConfigRef & {
			setTouch(touched?: boolean): void;
		};
	}>({});
	const formContext: IFlowJVContext = {
		schema,
		getBlock(key: IKeyPath) {
			if (key.length === 0) {
				const value: IBlocks[0] = {
					deps: [],
					items: [
						{
							deps: [],
							condPath: [],
							schema,
						},
					],
				};
				return value;
			}
			return blocks[
				key.map((v) => (typeof v === "number" ? "$" : v)).join(".")
			];
		},
		register(key, { setFocus, setTouch }) {
			if (!registered.current) return;

			registered.current[key.join(".")] = {
				...registered.current,
				setFocus,
				setTouch,
			};
		},
		getValue: (key: IKeyPath) => {
			return get(data.current, key);
		},
		setValue: (key: IKeyPath, value: any) => {
			data.current = set(data.current, key, value);
			triggerValidation();
			triggerSubscriptions([key]);
		},
		deleteValue: (key) => {
			data.current = unset(data.current, key);
			triggerValidation();
		},
		insertIndex(key, value) {
			data.current = insertIndex(data.current, key, value);
			triggerValidation();
			key.pop();
			triggerSubscriptions([key]);
		},
		deleteIndex(key) {
			data.current = unset(data.current, key);
			triggerValidation();
			key.pop();
			triggerSubscriptions([key]);
		},
		subscribeValidation(func) {
			const validation = formValidation.current;
			if (validation) {
				func(validation);
			}
			validationSubscribers.current.add(func);
			return () => {
				validationSubscribers.current.delete(func);
			};
		},
		subscribeData: (deps, func) => {
			if (deps === null) {
				// Subscribe all.
				allSubscribers.current.add(func);
				return;
			}
			const d = deps;
			func({ data: data.current, context: context.current });
			d.forEach((path) => {
				if (!subscribers.current.data[path]) {
					subscribers.current.data[path] = new Set();
				}
				subscribers.current.data[path]?.add(func);
			});
			return () => {
				d.forEach((path) => {
					subscribers.current.data[path]?.delete(func);
				});
			};
		},
		renderSchema: (props) => {
			if (props.type === "array" || props.type === "simple") {
				const path = props.path.join(".");
				if (renderMap?.[path]) {
					const result = renderMap[path](props as any);
					if (result !== null) return result;
				}
			}
			if (schemaUI) {
				const result = schemaUI(props as any);
				if (result !== null) return result;
			}
			// Check for renderMap
			return (flowConfig as any)(props);
		},
	};

	useEffect(() => {
		// Call validation the first time.
		triggerValidation();
	}, []);
	return (
		<flowJVContext.Provider value={formContext}>
			<form
				className={className}
				onSubmit={(e) => {
					e.preventDefault();
					// touchAll
					if (registered.current) {
						Object.entries(
							registered.current
						).forEach(([_, value]) => value?.setTouch(true));
					}
					const validationResult = formValidation.current;

					// Focus on the first error field.
					if (!validationResult?.isValid) {
						const errorKey = validationResult?.errors[0]?.key.join(
							"."
						);
						if (errorKey) {
							registered.current?.[errorKey]?.setFocus();
						}
					}
					onSubmit?.({
						isValid: !!validationResult?.isValid,
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
