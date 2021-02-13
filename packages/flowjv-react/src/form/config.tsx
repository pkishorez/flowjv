import React from "react";
import { IKeyPath, ISimpleType } from "flowjv";
import { IFlowJVContext } from ".";

export type IFlowJVUIConfigRef = {
	setFocus(): void;
};

export type IFlowJVUIConfig<
	stringUI = {},
	numberUI = {},
	booleanUI = {},
	enumUI = {},
	customUI = {}
> = (args: {
	path: IKeyPath;
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
	simpleRef: (args: IFlowJVUIConfigRef) => void;
	touched: boolean;
}) => React.ReactElement | null;
