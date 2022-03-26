import { createApi } from "unsplash-js";
import { CoffeeStore, Venue } from "./types/types";

// unsplash api
const unsplashApi = createApi({
	accessKey: process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY as string,
	// ...other fetch options
});

const getListOfCoffeeStorePhotos = async () => {
	const photos = await unsplashApi.search.getPhotos({
		query: "coffee store",
		perPage: 40,
	});

	// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
	const unsplashResults = photos!.response!.results || [];
	// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
	return unsplashResults!.map(photo => photo.urls.small);
};

// fourqsuare api
const getUrlForCoffeeStores = (latLong: string, query: string, limit: number) => {
	const latLongArr = latLong.split(",");
	const latLongTransform = latLongArr.map(el => String(Number(el.trim()).toFixed(2)));

	return `https://api.foursquare.com/v3/places/nearby?ll=${latLongTransform.join(",")}&query=${query}&limit=${limit}`;
};

export default async function fetchCoffeeStores(latLong = "52.53,13.41", query = "coffee", limit = 24) {
	try {
		const photos = await getListOfCoffeeStorePhotos();

		const options = {
			method: "GET",
			headers: {
				Accept: "application/json",
				Authorization: process.env.NEXT_PUBLIC_FOURSQUARE_API_KEY as string,
			},
		};

		const res = await fetch(getUrlForCoffeeStores(latLong, query, limit), options);
		const data = await res.json();
		console.log(data)

		return (
			data.results?.map((venue: Venue, idx: number) => {
				const neighbourhood = venue.location.neighborhood;
				return {
					...venue,
					id: venue.fsq_id,
					address: venue.location.address || venue.location.cross_street || "",
					name: venue.name,
					neighbourhood:
						(neighbourhood && neighbourhood.length > 0 && neighbourhood[0]) || venue.location.cross_street || "",
					imgUrl: photos[idx],
				};
			}) || []
		);
	} catch (error) {
		if (!process.env.NEXT_PUBLIC_FOURSQUARE_API_KEY || !process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY) {
			console.error("🚨 Make sure to setup your API keys, checkout the docs on Github 🚨");
		}
		console.log("Something went wrong fetching coffee stores", error);
		return [];
	}
}
