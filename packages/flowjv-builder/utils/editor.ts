import loadjs from "loadjs";

let loaded = false;
export const loadMonaco = (assetPrefix: string) =>
	new Promise<void>((resolve) => {
		if (loaded) return resolve();
		loaded = true;
		loadjs([`${assetPrefix}/monaco-editor/min/vs/loader.js`], () => {
			(window as any).require.config({
				paths: { vs: "monaco-editor/min/vs" },
			});
			(window as any).require(
				["vs/editor/editor.main.nls", "vs/editor/editor.main"],
				resolve
			);
			monaco.editor.defineTheme("myTheme", {
				base: "vs",
				inherit: true,
				rules: [],
				colors: {
					"editor.lineHighlightBackground": "#00000000",
					"editor.lineHighlightBorder": "#00000000",
				},
			});
		});
	});
export const initialValue = [
	"const data: IUIFlowSchema = ",
	"",
	`{
	type: "object",
	properties: [
	  { type: "string", key: "name", label: "Name" },
	  {
		type: "number",
		key: "age",
		label: "Age",
		validations: [
		  {
			logic: ["<=", 1, ["$ref"], 100],
			err: "Age should be between 1 and 100"
		  }
		]
	  },
	  {
		type: "enum",
		key: "gender",
		label: "Gender",
		uiType: "radio",
		items: [
		  { value: "male", label: "Male" },
		  { value: "female", label: "Female" },
		  { value: "others", label: "Others" }
		]
	  },
	  {
		type: "string",
		key: "email",
		label: "Email",
		validations: [
		  {
			logic: ["str:fmt:email", ["$ref"]],
			err: "Should be a valid email id."
		  }
		]
	  },
	  {
		type: "string",
		uiType: "password",
		key: "password",
		label: "Password",
		validations: [
		  {
			logic: ["<=", 5, ["str:len", ["$ref"]]],
			err: "Password should be minimum of 5 character length"
		  }
		]
	  },
	  {
		type: "string",
		uiType: "password",
		key: "confirmPassword",
		label: "Confirm Password",
		validations: [
		  {
			logic: ["===", ["$ref"], ["$data", "password"]],
			err: "Confirm Password should match the password."
		  }
		]
	  },
	  { type: "boolean", key: "isEmployed", label: "Are you Employed?" },
	  {
		type: "if",
		cond: ["$data", "isEmployed"],
		true: [
		  { type: "number", key: "yearsOfExp", label: "Years Of Experience" }
		]
	  }
	]
  }`,
].join("\n");

export const loadEditor = async (
	ref: HTMLDivElement,
	{
		assetPrefix = "",
		onChange,
	}: {
		assetPrefix?: string;
		onChange?: (v: string) => void;
	}
) => {
	const triggerChange = (value?: string) => {
		if (value) {
			onChange?.(value.substr(value.indexOf("{"), value.length));
		}
	};
	triggerChange(initialValue);
	await loadMonaco(assetPrefix);
	if (!ref) return;

	const types = await fetch(`${assetPrefix}/playground.d.ts`).then((v) =>
		v.text()
	);

	monaco.languages.typescript.typescriptDefaults.addExtraLib(
		types,
		"index.d.ts"
	);

	var jsCode = [initialValue].join("\n");
	const editor = monaco.editor.create(ref, {
		quickSuggestions: true,
		model: monaco.editor.createModel(
			jsCode,
			"typescript",
			monaco.Uri.parse("inmemory://model/main.ts")
		),
		theme: "myTheme",
		lineNumbers: "on",
		minimap: { enabled: false },
		scrollBeyondLastLine: false,
		fontSize: 16,
		automaticLayout: true,
		tabSize: 3,
		insertSpaces: true,
		formatOnType: true,
	});
	triggerChange(editor.getModel()?.getValue());
	editor.onDidChangeCursorPosition(function (e) {
		if (e.position.lineNumber <= 2) {
			editor.setPosition({
				lineNumber: 3,
				column: 1,
			});
		}
	});
	editor.onDidChangeModelContent(() => {
		triggerChange();
	});
};
