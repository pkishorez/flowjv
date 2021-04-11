import React from "react";
import { IKeyPath, ISimpleType } from "flowjv";
import { IFlowJVContext } from ".";
import { IArrayType } from "flowjv/dist/jsonflow/flow/composite/array";

export type IFlowJVUIConfigRef = {
	setFocus(): void;
};

export interface ISimpleConfig<
	stringUI,
	numberUI,
	booleanUI,
	enumUI,
	customUI
> {
	path: IKeyPath;
	type: "simple";
	schema: ISimpleType<
		{},
		{},
		stringUI,
		numberUI,
		booleanUI,
		enumUI,
		customUI
	>;
	value: any;
	setValue: IFlowJVContext["setValue"];
	deleteValue: IFlowJVContext["deleteValue"];
	errors: string[];
	onTouch: (touched?: boolean) => void;
	registerRef: (args: IFlowJVUIConfigRef) => void;
	touched: boolean;
}
export type IPropertyWrapperConfig = {
	type: "propertyWrapper";
	children: any;
};

export interface IArrayConfig<
	stringUI,
	numberUI,
	booleanUI,
	enumUI,
	customUI,
	Array
> {
	path: IKeyPath;
	type: "array";
	schema: IArrayType<
		{},
		{},
		stringUI,
		numberUI,
		booleanUI,
		enumUI,
		customUI,
		Array
	>;
	uniqueIndexes: number[];
	value: any[];
	insertAtIndex: (index: number) => void;
	deleteAtIndex: (index: number) => void;
}

export type IFlowJVUIConfig<
	stringUI = {},
	numberUI = {},
	booleanUI = {},
	enumUI = {},
	customUI = {},
	Array = {}
> = (
	args:
		| ISimpleConfig<stringUI, numberUI, booleanUI, enumUI, customUI>
		| IPropertyWrapperConfig
		| IArrayConfig<stringUI, numberUI, booleanUI, enumUI, customUI, Array>
) => React.ReactElement | null;
