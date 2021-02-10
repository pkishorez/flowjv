import React from "react";
import "../styles/index.css";
import { StylesProvider } from "@material-ui/core/styles";

function MyApp({ Component, pageProps }: any) {
	return (
		<StylesProvider injectFirst>
			<Component {...pageProps} />
		</StylesProvider>
	);
}

export default MyApp;
