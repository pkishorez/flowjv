import { IFlowSchema } from "flowjv";
import React from "react";
import { FlowJVForm, IFlowJVForm } from "./form";
import { IFlowJVUIConfig, IFlowJVUIExtrasConfig } from "./form/config";

export function setupFlowJV<
	String = {},
	Number = {},
	Boolean = {},
	Enum = {},
	Custom = {}
>(
	func: IFlowJVUIConfig<String, Number, Boolean, Enum, Custom>,
	extraUIConfig?: IFlowJVUIExtrasConfig
) {
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
			props: Omit<
				IFlowJVForm<IFormData, IFormContext>,
				"flowConfig" | "extraUIConfig"
			>
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
				extraUIConfig={extraUIConfig}
			/>
		),
	};
}

export { AutoFlow } from "./form/components";
