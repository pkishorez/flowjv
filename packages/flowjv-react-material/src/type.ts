type StringUI_ = {
	ui?: {
		type?: "password" | "text";
		autoFocus?: boolean;
	};
};
type NumberUI_ = {
	ui?: {
		autoFocus?: boolean;
	};
};
type BooleanUI_ = {
	ui?: {
		autoFocus?: boolean;
	};
};
type EnumUI_ = {
	ui?: {
		type?: "radio" | "select";
		autoFocus?: boolean;
	};
};
type CustomUI_ = {};
type ArrayUI_ = {
	ui?: {
		minLength?: number;
		maxLength?: number;
		length?: number;
	};
};

export namespace UI {
	export type StringUI = StringUI_;
	export type NumberUI = NumberUI_;
	export type BooleanUI = BooleanUI_;
	export type EnumUI = EnumUI_;
	export type CustomUI = CustomUI_;
	export type ArrayUI = ArrayUI_;

	export type GenericUI = [
		StringUI,
		NumberUI,
		BooleanUI,
		EnumUI,
		CustomUI,
		ArrayUI
	];
}
