/* eslint-disable @typescript-eslint/no-redeclare */
import type { AppProps } from "next/app";
import { ReactElement } from "react";
import { StoreProvider } from "../hooks/use-store-context";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps): ReactElement {
	return (
		<StoreProvider>
			<Component {...pageProps} />
		</StoreProvider>
	);
}

export default MyApp;
