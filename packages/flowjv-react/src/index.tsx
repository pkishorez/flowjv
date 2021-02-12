import { IFlowSchema } from "flowjv";
import React from "react";
import { FlowJVForm, IFlowJVForm } from "./form";
import { IFlowJVUIConfig } from "./form/config";

export function setupFlowJV<
	String = {},
	Number = {},
	Boolean = {},
	Enum = {},
	Custom = {}
>(func: IFlowJVUIConfig<String, Number, Boolean, Enum, Custom>) {
	type flowSchema = <IData = {}, IContext = {}>(
		schema: IFlowSchema<
			IData,
			IContext,
			String,
			Number,
			Boolean,
			Enum,
			Custom
		>
	) => IFlowSchema<IData, IContext, String, Number, Boolean, Enum, Custom>;
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
				Custom
			>
				{...props}
				flowConfig={func}
			/>
		),
	};
}

export { AutoFlow, IsValid } from "./form/components";
