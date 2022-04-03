import { useState } from "react";
import { useLatLongStoreContext } from "./use-store-context";

export default function useTrackLocation() {
	const [locationErrMsg, setLocationErrMsg] = useState("");
	const { store, dispatch } = useLatLongStoreContext();
	const [isFindingLocation, setIsFindingLocation] = useState(false);

	const success = (position: GeolocationPosition) => {
		const { latitude } = position.coords;
		const { longitude } = position.coords;

		dispatch({
			type: "SetLatLong",
			payload: { latLong: `${latitude}, ${longitude}` },
		});
		setLocationErrMsg("");
		setIsFindingLocation(false);
	};

	const error = () => {
		setIsFindingLocation(false);
		setLocationErrMsg("Unable to retrieve your location");
	};

	const handleTrackLocation = () => {
		setIsFindingLocation(true);

		if (!navigator.geolocation) {
			setLocationErrMsg("Geolocation is not supported by your browser");
			setIsFindingLocation(false);
		} else {
			navigator.geolocation.getCurrentPosition(success, error);
		}
	};

	return {
		// latLong,
		handleTrackLocation,
		locationErrMsg,
		isFindingLocation,
	};
}
