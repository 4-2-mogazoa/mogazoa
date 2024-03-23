import axios from "axios";

import instance from "../axiosInstance";

const url = "auth/signUp";

type TUserData = {
	email: string;
	nickname: string;
	password: string;
	passwordChecked: string;
};

export const postSignup = async (
	data: TUserData,
	setError: any,
	router: any,
) => {
	const userData = {
		email: data.email,
		nickname: data.nickname,
		password: data.password,
		passwordConfirmation: data.passwordChecked,
	};

	try {
		const res = await instance.post(url, userData);
		router.push("/");
	} catch (error) {
		if (!axios.isAxiosError(error)) return;

		const errorMessage = error.response?.data.message;

		errorMessage === "이미 사용중인 이메일입니다." &&
			setError("email", { message: errorMessage }, { shouldFocus: true });
		errorMessage === "이미 사용중인 닉네임입니다." &&
			setError("nickname", { message: errorMessage }, { shouldFocus: true });
	}
};
