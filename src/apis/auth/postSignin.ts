import axios from "axios";

import { LoginUserData } from "@/types/auth";

import instance from "../axiosInstance";

const url = "auth/signIn";

export const postSignIn = async (
	data: LoginUserData,
	setError?: any,
	router?: any,
) => {
	try {
		const res = await instance.post(url, data);
		const accessToken = res.data.accessToken;
		document.cookie = `accessToken=${accessToken}; path=/`;
		router.push("/");
	} catch (error) {
		if (!axios.isAxiosError(error)) return;

		const errorMessage = error.response?.data.message;

		errorMessage &&
			setError(
				"email",
				{ message: "이메일 혹은 비밀번호를 확인해주세요." },
				{ shouldFocus: true },
			);
	}
};
