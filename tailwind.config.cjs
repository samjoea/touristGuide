/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./index.html',
		'./src/**/*.{js,ts,jsx,tsx}'
	],
	theme: {
		extend: {
			colors: {
				primaryTeal: '#008080',
			},
			fontFamily: {
				poppins: 'Poppins'
			}
		},
	},
	plugins: [],
};
