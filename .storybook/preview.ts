import type { Preview } from "@storybook/react";
import "../src/styles/globals.css";

const preview: Preview = {
	parameters: {
		actions: { argTypesRegex: "^on[A-Z].*" },
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/i,
			},
		},
		backgrounds: {
			values: [
				{
					name: "default",
					value: "#1C1C22",
				},
				{
					name: "white",
					value: "white",
				},
			],
		},
	},
};

export default preview;
