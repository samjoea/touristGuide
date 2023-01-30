import axios from 'axios';

export const getClientCountry = async () => {
	try {
		const { data } = await axios.get(`https://www.iplocate.io/api/lookup/?apikey=${import.meta.env.VITE_APP_LOCATION_API_KEY}`);
		return data;
	} catch (error) {
		return error.response;
	}
};