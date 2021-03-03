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
				(window as any).require(["vs/editor/editor.main"], function () {
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

					var editor = monaco.editor.create(ref.current, {
						theme: "myTheme",
						lineNumbers: "on",
						minimap: { enabled: false },
						scrollBeyondLastLine: false,
						fontSize: 16,
						value: [
							"function x() {",
							'\tconsole.log("Hello world!");',
							"}",
						].join("\n"),
						language: "typescript",
						automaticLayout: true,
					});
				});
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
