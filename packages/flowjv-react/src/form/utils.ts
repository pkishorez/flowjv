import get from "lodash/get";
import cloneDeep from "lodash/cloneDeep";
import unset from "lodash/unset";
import setWith from "lodash/setWith";
import clone from "lodash/clone";

export const gett = (obj: any, key: string, defaultValue?: any) => {
	if (key === "") {
		return obj || defaultValue;
	}
	return get(obj, key, defaultValue);
};
export const sett = (obj, key, value) => {
	return setWith(clone(obj), key, value, clone);
};
export const unsett = (obj, key) => {
	const cloned = cloneDeep(obj);
	unset(cloned, key);
	return cloned;
};
