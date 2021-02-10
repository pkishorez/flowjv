export type IKeyPath = (string | number)[];

export const stringToKeyPath = (path: string) =>
	normalizeKeyPath(path.split("."));

export const normalizeKeyPath = (keyPath: IKeyPath) => {
	return keyPath
		.map((key) => (isNaN(parseInt(key + "")) ? key : parseInt(key + "")))
		.filter((v) => (v + "").trim() !== "");
};

export const set = (obj: any, keyPath: IKeyPath, value: any): any => {
	keyPath = normalizeKeyPath(keyPath);
	if (keyPath.length === 0) {
		return value;
	}
	const key = keyPath.shift();
	if (typeof key === "string") {
		if (!obj) {
			obj = {};
		}
		return { ...obj, [key]: set(obj[key], keyPath, value) };
	} else if (typeof key === "number") {
		if (obj == null) {
			obj = [];
		}
		if (!(obj instanceof Array)) {
			throw { msg: "object should be of type array.", obj };
		}
		obj[key] = set(obj[key], keyPath, value);
		return [...obj];
	}
	throw new Error("Key should be one of either string|number.");
};
export const get = (obj: any, keyPath: IKeyPath, defaultValue?: any) => {
	keyPath = normalizeKeyPath(keyPath);
	const result = keyPath.reduce((agg, key) => agg?.[key], obj);
	return result == null ? defaultValue : result;
};
export const unset = (obj: any, keyPath: IKeyPath) => {
	keyPath = normalizeKeyPath(keyPath);
	if (keyPath.length === 0 || obj == null) return obj;
	if (keyPath.length === 1) {
		const key = keyPath[0];
		if (typeof key === "string") {
			const newobj = { ...obj };
			delete newobj[key];
			return !!obj[key] ? newobj : obj;
		} else {
			if (!(obj instanceof Array)) {
				throw new Error("obj should be of type Array.");
			}
			return obj[key] ? obj.filter((v, i) => i !== key) : obj;
		}
	}
	const key = keyPath.shift();
	if (key == null) {
		throw new Error("Key cannot be undefined.");
	}
	const updatedObject = unset(obj[key], keyPath) as any;

	// if object updates...
	if (obj[key] !== updatedObject) {
		if (obj instanceof Array) {
			const newobj = [...obj];
			newobj[key as number] = updatedObject;
			return newobj;
		} else {
			return { ...obj, [key]: updatedObject };
		}
	}
	return obj;
};

export const Immutable = (obj: any) => {
	return {
		get(keyPath: IKeyPath, defaultValue?: any) {
			return Immutable(get(obj, keyPath, defaultValue));
		},
		set(keyPath: IKeyPath, value: any) {
			return Immutable(set(obj, keyPath, value));
		},
		unset(keyPath: IKeyPath) {
			return Immutable(unset(obj, keyPath));
		},
		value() {
			return obj;
		},
	};
};
