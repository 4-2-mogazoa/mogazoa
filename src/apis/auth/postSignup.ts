import axios from "axios";
import { UseFormSetError } from "react-hook-form";

import { RegistrationUserData } from "@/types/auth";

import instance from "../axiosInstance";
import { postSignIn } from "./postSignin";

const url = "auth/signUp";

export const postSignup = async (
	data: RegistrationUserData,
	setError: UseFormSetError<RegistrationUserData>,
) => {
	const userData = {
		email: data.email,
		nickname: data.nickname,
		password: data.password,
		passwordConfirmation: data.passwordChecked,
	};

	try {
		await instance.post(url, userData);

		// 회원가입 성공시 회원가입 데이터로 로그인 진행
		await postSignIn({ email: userData.email, password: userData.password });

		// 리다이렉트용
		window.location.href = "/";
	} catch (error) {
		if (!axios.isAxiosError(error)) return;

		const errorMessage = error.response?.data.message;

		errorMessage === "이미 사용중인 이메일입니다." &&
			setError("email", { message: errorMessage }, { shouldFocus: true });
		errorMessage === "이미 사용중인 닉네임입니다." &&
			setError("nickname", { message: errorMessage }, { shouldFocus: true });
	}
};
