import React from "react";
import { ISimpleType } from "flowjv";

export type IFlowJVUIConfig = <
	stringUI = any,
	numberUI = any,
	booleanUI = any,
	enumUI = any,
	customUI = any
>(
	block: ISimpleType<stringUI, numberUI, booleanUI, enumUI, customUI>
) => React.ReactElement;
