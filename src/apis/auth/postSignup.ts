import axios from "axios";

import { RegistrationUserData } from "@/types/auth";

import instance from "../axiosInstance";
import { postSignIn } from "./postSignin";

const url = "auth/signUp";

export const postSignup = async (
	data: RegistrationUserData,
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
		await postSignIn({ email: userData.email, password: userData.password });
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
