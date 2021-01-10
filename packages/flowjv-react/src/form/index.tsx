import React, { useCallback } from "react";

const flowjvContext = React.createContext({
	setValue: (key: string, value: string) => {},
});

interface IFlowJVProps<IData, IContext> {
	data?: IData;
	context?: IContext;
}
export function FlowJV<IData = any, IContext = any>({
	data = {} as any,
	context,
}: IFlowJVProps<IData, IContext>) {
	const setValue = useCallback((key: string, value: string) => {}, []);
	return (
		<flowjvContext.Provider value={{ setValue }}>
			<form></form>
		</flowjvContext.Provider>
	);
}
