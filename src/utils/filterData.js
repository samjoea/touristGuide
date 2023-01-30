export const filterData = (data, match) => {
	const results = data.filter(val => val?.name.includes(match));
	return results;
};