// Generated by dts-bundle-generator v5.7.0

export declare type IJSONExpression<IData = any, IContext = any> =
	| number
	| string
	| boolean
	| IOperation<IData, IContext>
	| IFunctionExectution<IData, IContext>
	| {
			func: IFunctionExectution<IData, IContext>;
			deps: {
				data?: string[];
				context?: string[];
			};
	  };
export declare type IFunctionExectution<IData, IContext> = ({
	data,
	context,
	ref,
}: {
	data: Partial<IData>;
	context: IContext;
	ref: any;
}) => any;
export declare type IOperation<IData = any, IContext = any> =
	| IDataAccessOperation<IData, IContext>
	| ITernaryOperation
	| INegationOperation
	| ILogicalOperation
	| IComparisonOperation
	| INumberOperation
	| IStringOperation;
export declare type IDataAccessOperation<IData, IContext> =
	| ["$data", string, string?]
	| ["$context", string, string?]
	| ["$ref"];
export declare type ITernaryOperation = [
	"?:",
	IJSONExpression,
	IJSONExpression,
	IJSONExpression
];
export declare type INegationOperation = ["!", IJSONExpression];
export declare type ILogicalOperation =
	| ["enum", IJSONExpression, ...IJSONExpression[]]
	| ["===", IJSONExpression, IJSONExpression, ...IJSONExpression[]]
	| ["!==", IJSONExpression, IJSONExpression, ...IJSONExpression[]]
	| ["||", IJSONExpression, IJSONExpression, ...IJSONExpression[]]
	| ["&&", IJSONExpression, IJSONExpression, ...IJSONExpression[]];
export declare type IComparisonOperation =
	| [">", IJSONExpression, IJSONExpression, ...IJSONExpression[]]
	| [">=", IJSONExpression, IJSONExpression, ...IJSONExpression[]]
	| ["<", IJSONExpression, IJSONExpression, ...IJSONExpression[]]
	| ["<=", IJSONExpression, IJSONExpression, ...IJSONExpression[]];
export declare type INumberOperation =
	| ["+", IJSONExpression, IJSONExpression, ...IJSONExpression[]]
	| ["-", IJSONExpression, IJSONExpression, ...IJSONExpression[]]
	| ["*", IJSONExpression, IJSONExpression, ...IJSONExpression[]]
	| ["/", IJSONExpression, IJSONExpression, ...IJSONExpression[]]
	| ["%", IJSONExpression, IJSONExpression, ...IJSONExpression[]];
export declare type IStringOperation =
	| ["str:fmt:email", IJSONExpression]
	| ["str:len", IJSONExpression];
export interface ISimpleCommon<IData = {}, IContext = {}> {
	isRequired?: boolean;
	validations?: IValidation<IData, IContext>[];
	errMsgs?: {
		type?: string;
		required?: string;
	};
}
export declare type ISimpleStringType<
	IData = {},
	IContext = {},
	uiType = {}
> = uiType & {
	type: "string";
	label?: string;
} & ISimpleCommon<IData, IContext>;
export declare type ISimpleNumberType<
	IData = {},
	IContext = {},
	uiType = {}
> = uiType & {
	type: "number";
	label?: string;
} & ISimpleCommon<IData, IContext>;
export declare type ISimpleBooleanType<
	IData = {},
	IContext = {},
	uiType = {}
> = uiType & {
	type: "boolean";
	label?: string;
} & ISimpleCommon<IData, IContext>;
export declare type ISimpleEnumType<
	IData = {},
	IContext = {},
	uiType = {}
> = uiType & {
	type: "enum";
	label?: string;
	items: {
		label?: string;
		value: any;
	}[];
} & ISimpleCommon<IData, IContext>;
export declare type ISimpleCustomType<
	IData = {},
	IContext = {},
	uiType = {}
> = uiType & {
	type: "custom";
} & ISimpleCommon<IData, IContext>;
export declare type ISimpleType<
	IData = {},
	IContext = {},
	stringUI = {},
	numberUI = {},
	booleanUI = {},
	enumUI = {},
	customUI = {}
> =
	| ISimpleStringType<IData, IContext, stringUI>
	| ISimpleNumberType<IData, IContext, numberUI>
	| ISimpleBooleanType<IData, IContext, booleanUI>
	| ISimpleEnumType<IData, IContext, enumUI>
	| ISimpleCustomType<IData, IContext, customUI>;
export interface IValidation<IData = {}, IContext = {}> {
	logic: IJSONExpression<IData, IContext>;
	err: string;
}
export declare type IIfConditionType<
	IData = {},
	IContext = {},
	A = {},
	B = {},
	C = {},
	D = {},
	E = {},
	F = {}
> = {
	type: "if";
	cond: IJSONExpression<IData, IContext>;
	true: (
		| IObjectProperty<IData, IContext, A, B, C, D, E, F>
		| IObjectCondition<IData, IContext, A, B, C, D, E, F>
	)[];
	false?: (
		| IObjectProperty<IData, IContext, A, B, C, D, E, F>
		| IObjectCondition<IData, IContext, A, B, C, D, E, F>
	)[];
};
export declare type ISwitchType<
	IData = {},
	IContext = {},
	A = {},
	B = {},
	C = {},
	D = {},
	E = {},
	F = {}
> = {
	type: "switch";
	blockId?: string;
	switch: IJSONExpression<IData, IContext>;
	cases: {
		[key: string]: IObjectProperty<IData, IContext, A, B, C, D, E, F>[];
	};
};
export declare type IArrayType<
	IData = {},
	IContext = {},
	A = {},
	B = {},
	C = {},
	D = {},
	E = {},
	F = {}
> = F & {
	type: "array";
	label?: string;
	itemSchema:
		| IObjectType<IData, IContext, A, B, C, D, E, F>
		| ISimpleType<IData, IContext, A, B, C, D, E>;
	isRequired?: boolean;
	errMsgs?: {
		type?: string;
		required?: string;
	};
};
export declare type IObjectCondition<
	IData = {},
	IContext = {},
	A = {},
	B = {},
	C = {},
	D = {},
	E = {},
	F = {}
> =
	| IIfConditionType<IData, IContext, A, B, C, D, E, F>
	| ISwitchType<IData, IContext, A, B, C, D, E, F>;
export declare type IObjectProperty<
	IData = {},
	IContext = {},
	A = {},
	B = {},
	C = {},
	D = {},
	E = {},
	F = {}
> = (
	| ISimpleType<IData, IContext, A, B, C, D, E>
	| IObjectType<IData, IContext, A, B, C, D, E, F>
	| IArrayType<IData, IContext, A, B, C, D, E, F>
) & {
	key: string;
};
export declare type IObjectType<
	IData = {},
	IContext = {},
	A = {},
	B = {},
	C = {},
	D = {},
	E = {},
	F = {}
> = {
	type: "object";
	properties: (
		| IObjectProperty<IData, IContext, A, B, C, D, E, F>
		| IObjectCondition<IData, IContext, A, B, C, D, E, F>
	)[];
};
export declare type IFlowSchema<
	IData = {},
	IContext = {},
	A = {},
	B = {},
	C = {},
	D = {},
	E = {},
	F = {}
> = IObjectType<IData, IContext, A, B, C, D, E, F>;
export declare type IUIFlowSchema = IFlowSchema<
	{
		uiType?: "password" | "text";
	},
	{},
	{},
	{
		uiType?: "radio" | "select";
	},
	{},
	{
		minLength?: number;
		maxLength?: number;
		length?: number;
	}
>;

export {};
