import React, { useEffect, useRef } from "react";
import getConfig from "next/config";
import loadjs from "loadjs";

export default function PlayGround() {
	const ref = useRef<HTMLDivElement | null>(null);
	useEffect(() => {
		if (!ref.current) {
			return;
		}
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
					["vs/editor/editor.main"],
					async function () {
						if (!ref.current) return;
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

						// extra libraries
						var libUri = "inmemory://model/index.d.ts";
						monaco.languages.typescript.typescriptDefaults.addExtraLib(
							types,
							libUri
						);
						monaco.languages.typescript.typescriptDefaults.setCompilerOptions(
							{
								lib: [],
								typeRoots: ["inmemory://model"],
								types: ["*.d.ts"],
								moduleResolution:
									monaco.languages.typescript
										.ModuleResolutionKind.NodeJs,
								sourceRoot: "inmemory://model",
							}
						);
						// When resolving definitions and references, the editor will try to use created models.
						// Creating a model for the library allows "peek definition/references" commands to work with the library.

						var jsCode = [
							// `import {IUIFlowSchema} from 'inmemory://model/playground';\n`,
							`const data: IUIFlowSchema = {};`,
						].join("\n");
						monaco.editor.create(ref.current, {
							quickSuggestions: true,
							model: monaco.editor.createModel(
								jsCode,
								"typescript",
								monaco.Uri.parse("inmemory://model/main.tsx")
							),
							theme: "myTheme",
							lineNumbers: "on",
							minimap: { enabled: false },
							scrollBeyondLastLine: false,
							fontSize: 16,
							automaticLayout: true,
							tabSize: 2,
							insertSpaces: true,
						});
					}
				);
			}
		);
	}, [ref]);
	return (
		<div className="fixed top-0 right-0 left-0 bottom-0 flex p-5">
			<div className="flex flex-col self-stretch flex-grow">
				<h2>Code</h2>
				<div className="flex-grow" ref={ref}></div>
			</div>
			<div className="w-1/2">
				<h2>PlayGround</h2>
			</div>
		</div>
	);
}
