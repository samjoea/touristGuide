import { useQuery} from '@tanstack/react-query';
import { useState } from 'react';
import { countryCodes } from '../data';
import { filterData, getClientCountry } from '../utils';

const useGetCountry = () => {
	const [getCountry, setGetCountry] = useState(null);
	const { isLoading } = useQuery({
		queryKey: ['country'],
		queryFn: getClientCountry,
		retry: false,
		placeholderData: () => {
			const {name} = filterData(countryCodes, 'Ghana')[0];
			return name;
		},
		onSuccess: (data) => {
			setGetCountry(data);
		}
	});
	if (isLoading) return null;
	if(getCountry) {
		const country = getCountry.country;
		const {flag, name, dial_code} = filterData(countryCodes, country)[0];
		return (`${flag} ${name} (${dial_code})`);
	}
};

export default useGetCountry;