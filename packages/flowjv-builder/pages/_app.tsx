import { AppProps } from "next/app";
import React from "react";
import "../styles/index.scss";

export default function MyApp({ Component, pageProps }: AppProps) {
	React.useEffect(() => {
		// Remove the server-side injected CSS.
		const jssStyles = document.querySelector("#jss-server-side");
		if (jssStyles) {
			jssStyles.parentElement.removeChild(jssStyles);
		}
	}, []);
	return <Component {...pageProps} />;
}
