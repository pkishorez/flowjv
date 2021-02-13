import { useContext, useEffect, useState } from "react";
import { flowJVContext } from "..";

export function IsValid({
	children,
}: {
	children: ({ isValid: boolean }) => any;
}) {
	const { subscribeValidation } = useContext(flowJVContext);
	const [isValid, setIsValid] = useState(false);

	useEffect(() => {
		subscribeValidation(({ isValid }) => setIsValid(isValid));
	}, [subscribeValidation, setIsValid]);

	return children({ isValid });
}
