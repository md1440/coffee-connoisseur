import { useContext, useState } from "react";
import { StoreContext } from '../pages/_app';

export default function useTrackLocation() {
	const [locationErrMsg, setLocationErrMsg] = useState("");
	// const [latLong, setLatLong] = useState("");
	const { store, dispatch } = useContext(StoreContext)
	const [isFindingLocation, setIsFindingLocation] = useState(false);

	const success = (position: GeolocationPosition) => {
		const { latitude } = position.coords;
		const { longitude } = position.coords;

		// setLatLong(`${latitude}, ${longitude}`);
		dispatch({
			type: 'SetLatLong',
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
			// setLocationErrMsg("Locating…");
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
