/* eslint-disable @typescript-eslint/no-redeclare */
import type { AppProps } from "next/app";
import { createContext, ReactElement, useReducer } from "react";
import { CoffeeStore } from "../lib/types/types";
import "../styles/globals.css";

export interface Store {
	latLong: string;
	coffeeStores: CoffeeStore[];
}

const initialStore: Store = {
	latLong: "",
	coffeeStores: [],
};

export interface SetLatLong {
	type: "SetLatLong";
	payload: { latLong: string}
}

export interface SetCoffeeStores {
	type: "SetCoffeeStores";
	payload: { coffeeStores: CoffeeStore[] };
}

export type Actions = SetLatLong | SetCoffeeStores;

export function storeReducer(store: Store, action: Actions): Store {
	switch (action.type) {
		case "SetLatLong":
			return { ...store, latLong: action.payload.latLong };
		case "SetCoffeeStores":
			return { ...store, coffeeStores: action.payload.coffeeStores };
		default:
			return store;
	}
}

export interface StoreContext {
	store: Store;
	dispatch: React.Dispatch<Actions>;
}

export const StoreContext = createContext({} as StoreContext);

export interface Props {
	children: ReactElement;
}

export function StoreProvider({ children }: Props) {
	const [store, dispatch] = useReducer(storeReducer, initialStore);

	return (
		// eslint-disable-next-line react/jsx-no-constructed-context-values
		<StoreContext.Provider value={{ store, dispatch }}>{children}</StoreContext.Provider>
	);
}

function MyApp({ Component, pageProps }: AppProps): ReactElement {
	return (
		<StoreProvider>
			<Component {...pageProps} />
		</StoreProvider>
	);
}

export default MyApp;
