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
	const initialValue = [
		"const data: IUIFlowSchema = ",
		"",
		"{",
		'   type: "object",',
		"   properties: [",
		"      {}",
		"   ]",
		"}",
	].join("\n");

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
	const triggerChange = () => {
		const value = editor.getModel()?.getValue();
		if (value) {
			onChange?.(value.substr(value.indexOf("{"), value.length));
		}
	};
	triggerChange();
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
