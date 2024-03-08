import type { Config } from "tailwindcss";

const config: Config = {
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			fontFamily: {
				Pretendard: ["Pretendard"],
			},
			colors: {
				white: "#F1F1F5",
				black: {
					100: "#2E2E3A",
					200: "#21212A",
					300: "#17171C",
					bg: "#252530",
					border: "#353542",
				},
				gray: {
					100: "#9FA6B2",
					200: "#6E6E82",
				},
				main_blue: "#5097FA",
				main_indigo: "#5363FF",
				yellow: "#FFC83C",
				green: "#05D58B",
				pink: "#FF2F9F",
				red: "#FF0000",
			},
			backgroundImage: ({ theme }) => ({
				"main-gradient": `linear-gradient(to right, ${theme("colors.main_blue")}, ${theme("colors.main_indigo")})`,
			}),
		},
	},
	plugins: [],
};
export default config;

// extend: {
//   backgroundImage: {
//     "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
//     "gradient-conic":
//       "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
//   },
// },
