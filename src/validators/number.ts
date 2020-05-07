export type INumberValidatorType = {
	$type: "number";
	validate?: (
		| ["<", [number, number] | number]
		| [">", [number, number] | number]
		| ["<=", [number, number] | number]
		| [">=", [number, number] | number]
		| ["==", number]
	)[];
};
