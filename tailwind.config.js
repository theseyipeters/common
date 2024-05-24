/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{js,jsx,ts,tsx}"],
	theme: {
		extend: {
			colors: {
				black: {
					1: "#000000",
					2: "#404040",
					3: "#686868",
				},

				white: {
					1: "#ffffff",
					2: "#FFF8F0",
				},

				green: {
					1: "#7A8717",
					2: "#06CB5D",
				},

				gray: {
					1: "#D9D9D9",
					2: "#A6A6A6",
					3: "#D1D1D1",
				},
			},

			letterSpacing: {
				tight: "-2%",
				tighter: "-1%",
			},
		},
	},
	plugins: [],
};
