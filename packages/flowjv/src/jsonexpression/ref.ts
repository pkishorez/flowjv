export type IRefArrPath = (string | number)[];
export type IRefPath = IRefArrPath | string;

const parsePath = (path: string) =>
	path
		.split(".")
		.map((key) =>
			// Normalize
			Number.isNaN(parseInt(key)) ? key : parseInt(key)
		)
		.filter((v) => (typeof v === "string" ? v.trim() !== "" : true));

const getPathArr = (path: IRefPath) =>
	typeof path === "string" ? parsePath(path) : path;

const getDataFromKey = (data: any, key: string | number) => data?.[key];
export const getDataFromRefPath = (data: any, refPath: IRefPath) =>
	getPathArr(refPath).reduce(getDataFromKey, data);
