import React, { useState } from "react";
import { IJSONFlow } from "flowjv";

interface IConfig {}
interface IFlowJVProps {
	schema: IJSONFlow;
	defaultValue: any;
}

export const setupFlowJV = (config: IConfig) => {
	return ({ schema, defaultValue }: IFlowJVProps) => {
		const [state, setState] = useState(defaultValue);

		const render = (schema: IJSONFlow, ref: string) => {
			switch (schema.type) {
				case "object": {
					// Loop over all the elements.
					return schema.properties.map((value) => value);
				}
				case "boolean":
				case "number":
				case "string": {
					return schema.validations?.map(({ logic }) => ({ logic }));
				}
			}
		};
		return render(schema, "");
	};
};
