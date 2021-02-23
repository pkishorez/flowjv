import { useContext, useEffect, useState } from "react";
import { flowJVContext } from "..";

export function FormSpy({ children }: { children: ({ data: any }) => any }) {
	const { subscribeData } = useContext(flowJVContext);
	const [data, setData] = useState(null);
	useEffect(() => {
		return subscribeData(null, ({ data: d }) => {
			setData(d);
		});
	}, [subscribeData, setData]);

	return children({ data });
}
