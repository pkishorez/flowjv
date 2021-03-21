import React from "react";
import "../styles/index.css";
import {
	StylesProvider,
	createMuiTheme,
	ThemeProvider,
} from "@material-ui/core/styles";
import { teal, brown } from "@material-ui/core/colors";

const theme = createMuiTheme({
	palette: {
		primary: teal,
		secondary: brown,
	},
});
function MyApp({ Component, pageProps }: any) {
	return (
		<StylesProvider injectFirst>
			<ThemeProvider theme={theme}>
				<Component {...pageProps} />
			</ThemeProvider>
		</StylesProvider>
	);
}

export default MyApp;
