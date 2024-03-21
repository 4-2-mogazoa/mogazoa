import axios from "axios";

import instance from "./axiosInstance";

const url = "auth/signIn";

type TUserData = {
	email: string;
	password: string;
};

export const postSignup = async (
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

		errorMessage === "이메일 혹은 비밀번호를 확인해주세요." &&
			setError("email", { message: errorMessage }, { shouldFocus: true });
	}
};
