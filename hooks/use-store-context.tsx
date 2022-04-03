/* eslint-disable @typescript-eslint/no-redeclare */
import { createContext, ReactElement, useContext, useReducer } from "react";
import { CoffeeStore } from "../lib/types/types";

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
	payload: { latLong: string };
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

interface StoreContext {
	store: Store;
	dispatch: React.Dispatch<Actions>;
}

export const StoreContext = createContext({} as StoreContext);
StoreContext.displayName = "LatLongStoreContext";

export const useLatLongStoreContext = (): StoreContext => useContext(StoreContext);

interface Props {
	children: ReactElement;
}

export function StoreProvider({ children }: Props) {
	const [store, dispatch] = useReducer(storeReducer, initialStore);

	return (
		// eslint-disable-next-line react/jsx-no-constructed-context-values
		<StoreContext.Provider value={{ store, dispatch }}>{children}</StoreContext.Provider>
	);
}
