import React from "react";
import { IKeyPath, ISimpleType } from "flowjv";
import { IFlowJVContext } from ".";
import { IArrayType } from "flowjv/dist/jsonflow/flow/composite/array";

export type IFlowJVUIConfigRef = {
	setFocus(): void;
};

export type IFlowJVUIConfig<
	stringUI = {},
	numberUI = {},
	booleanUI = {},
	enumUI = {},
	customUI = {}
> = (
	args:
		| {
				path: IKeyPath;
				schemaType: "simple";
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
		| {
				path: IKeyPath;
				schemaType: "array";
				schema: IArrayType<
					{},
					{},
					stringUI,
					numberUI,
					booleanUI,
					enumUI,
					customUI
				>;
				uniqueIndexes: number[];
				value: any[];
				insertAtIndex: (index: number) => void;
				deleteAtIndex: (index: number) => void;
		  }
) => React.ReactElement | null;
