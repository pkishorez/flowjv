const { colors } = require("tailwindcss/defaultTheme");

// tailwind.config.js
module.exports = {
	purge: [
		"./pages/**/*.{js,ts,jsx,tsx}",
		"./components/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		extend: {
			colors: {
				...colors,
				teal: {
					50: "#F0FDFA",
					100: "#CCFBF1",
					200: "#99F6E4",
					300: "#5EEAD4",
					400: "#2DD4BF",
					500: "#14B8A6",
					600: "#0D9488",
					700: "#0F766E",
					800: "#115E59",
					900: "#134E4A",
				},
				orange: {
					50: "#FFF7ED",
					100: "#FFEDD5",
					200: "#FED7AA",
					300: "#FDBA74",
					400: "#FB923C",
					500: "#F97316",
					600: "#EA580C",
					700: "#C2410C",
					800: "#9A3412",
					900: "#7C2D12",
				},
			},
		},
	},
	darkMode: false, // or 'media' or 'class'
	variants: {
		extend: {},
	},
	plugins: [],
};
