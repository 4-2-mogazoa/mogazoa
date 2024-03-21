import axios from "axios";

import instance from "./axiosInstance";

const url = "auth/signIn";

type TUserData = {
	email: string;
	password: string;
};

export const postSignIn = async (
	data: TUserData,
	setError: any,
	router: any,
) => {
	const userData = {
		email: data.email,
		password: data.password,
	};

	try {
		const res = await instance.post(url, userData);
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
