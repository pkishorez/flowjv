export const helper = {
	chainOp: (values: any[], operation: (v1: any, v2: any) => any) => {
		return values.reduce(
			(agg, v, i) => (i === 0 ? agg : operation(agg, v)),
			values[0]
		);
	},
	assertChainOp: (
		values: any[],
		operation: (v1: any, v2: any) => boolean
	) => {
		for (let i = 1; i < values.length; i++) {
			if (!operation(values[i - 1], values[i])) {
				return false;
			}
		}
		return true;
	},
};
