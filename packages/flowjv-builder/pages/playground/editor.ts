import getConfig from "next/config";
import loadjs from "loadjs";

export const loadEditor = (
	ref: HTMLDivElement,
	{
		onChange,
	}: {
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

	loadjs(
		[
			`${
				getConfig().publicRuntimeConfig.assetPrefix
			}/monaco-editor/min/vs/loader.js`,
		],
		() => {
			(window as any).require.config({
				paths: { vs: "monaco-editor/min/vs" },
			});
			(window as any).require(
				["vs/editor/editor.main.nls", "vs/editor/editor.main"],
				async function () {
					if (!ref) return;
					monaco.editor.defineTheme("myTheme", {
						base: "vs",
						inherit: true,
						rules: [],
						colors: {
							"editor.lineHighlightBackground": "#00000000",
							"editor.lineHighlightBorder": "#00000000",
						},
					});
					const types = await fetch(
						`${
							getConfig().publicRuntimeConfig.assetPrefix
						}/playground.d.ts`
					).then((v) => v.text());

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
							onChange?.(
								value.substr(value.indexOf("{"), value.length)
							);
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
				}
			);
		}
	);
};
