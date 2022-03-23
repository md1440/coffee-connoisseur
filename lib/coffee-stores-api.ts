import { CoffeeStore } from './types/types';

export default async function fetchCoffeeStores() {
	const options = {
		method: "GET",
		headers: {
			Accept: "application/json",
			Authorization: process.env.FOURSQUARE_API_KEY as string,
		},
	};

	const res = await fetch("https://api.foursquare.com/v3/places/nearby?ll=52.53%2C13.41&query=cafe&limit=12", options);
	const resSerialized = await res.json();
  const data: CoffeeStore[] = [...resSerialized.results];

  return data
}
