import axios from "axios";

import instance from "../axiosInstance";

const url = "users/me";

export const getUser = async () => {
	try {
		const res = await instance.get(url);
		return res.data;
	} catch (error) {
		if (!axios.isAxiosError(error)) return;

		const errorMessage = error.response?.data.message;
		throw new Error(errorMessage);
	}
};
