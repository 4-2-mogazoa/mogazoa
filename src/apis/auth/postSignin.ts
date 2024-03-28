import axios from "axios";
import { UseFormSetError } from "react-hook-form";

import { LoginUserData } from "@/types/auth";

import instance from "../axiosInstance";

const url = "auth/signIn";

export const postSignIn = async (
	data: LoginUserData,
	setError?: UseFormSetError<LoginUserData>,
) => {
	try {
		const res = await instance.post(url, data);

		// 토큰 관련
		const accessToken = res.data.accessToken;
		document.cookie = `accessToken=${accessToken}; path=/`;

		// 리다이렉트
		window.location.href = "/";

		// 사용처측 데이터핸들링용 return
		return res;
	} catch (error) {
		if (!axios.isAxiosError(error)) return;

		const errorMessage = error.response?.data.message;

		if (setError) {
			errorMessage &&
				setError(
					"email",
					{ message: "이메일 혹은 비밀번호를 확인해주세요." },
					{ shouldFocus: true },
				);
		} else {
			console.error("setError가 정의되지 않았습니다.");
		}
	}
};
