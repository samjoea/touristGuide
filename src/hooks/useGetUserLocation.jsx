import { useGeolocated } from 'react-geolocated';

const useGetUserLocation = () => {
	const { coords, isGeolocationAvailable, isGeolocationEnabled } = useGeolocated({
		positionOptions: {
			enableHighAccuracy: false,
		},
		userDecisionTimeout: 5000,
	});
	const locationInfo = {
		isLocation: isGeolocationAvailable,
		isLocationEnabled: isGeolocationEnabled,
		locationData: coords,
	};

	return ( locationInfo );
};

export default useGetUserLocation;