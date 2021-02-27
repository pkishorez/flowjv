import { IFlowSchema } from "flowjv";
import React from "react";
import { FlowJVForm, IFlowJVForm } from "./form";
import { IFlowJVUIConfig } from "./form/config";

export function setupFlowJV<
	String = {},
	Number = {},
	Boolean = {},
	Enum = {},
	Custom = {},
	Array = {}
>(func: IFlowJVUIConfig<String, Number, Boolean, Enum, Custom, Array>) {
	type flowSchema = <IData = {}, IContext = {}>(
		schema: IFlowSchema<
			IData,
			IContext,
			String,
			Number,
			Boolean,
			Enum,
			Custom,
			Array
		>
	) => IFlowSchema<
		IData,
		IContext,
		String,
		Number,
		Boolean,
		Enum,
		Custom,
		Array
	>;
	return {
		flowSchema: ((schema: IFlowSchema) => schema) as flowSchema,
		FlowJVForm: <IFormData, IFormContext>(
			props: Omit<IFlowJVForm<IFormData, IFormContext>, "flowConfig">
		) => (
			<FlowJVForm<
				IFormData,
				IFormContext,
				String,
				Number,
				Boolean,
				Enum,
				Custom,
				Array
			>
				{...props}
				flowConfig={func}
			/>
		),
	};
}

export { AutoFlow, IsValid, FormSpy } from "./form/components";
