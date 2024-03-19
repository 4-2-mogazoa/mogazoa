import axios from "axios";

import getCookies from "@/utils/getCookies";

const instance = axios.create({
	baseURL: "https://mogazoa-api.vercel.app/2-2/",
	headers: {
		"Content-type": "application/json",
	},
});

instance.interceptors.request.use(
	(config) => {
		const token = getCookies()["accessToken"];
		if (token) {
			config.headers["Authorization"] = `Bearer ${token}`;
		}
		return config;
	},
	(error) => {
		return Promise.reject(error);
	},
);

export default instance;
