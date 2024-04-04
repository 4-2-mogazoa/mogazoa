import axios from "axios";
import { UseFormSetError } from "react-hook-form";

import getCookies from "@/utils/getCookies";

import instance from "../axiosInstance";

export const postOAuthSignup = async (
	data: { nickname: string },
	platform: string | string[] | undefined,
) => {
	const url = `auth/signUp/${platform}`;

	const { code } = getCookies();
	const token = code;

	const OAuthSignupData = {
		nickname: data.nickname,
		redirectUri: "http://localhost:3000/oauth/test",
		token: token,
	};
	try {
		const res = await instance.post(url, OAuthSignupData);

		//SetUp Cookie
		document.cookie = `accessToken=${res.data.accessToken}`;

		//Delete AuthorizationToken
		document.cookie = `code=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`;

		//Redirect
		window.location.href = "/";

		return res;
	} catch (error) {
		if (!axios.isAxiosError(error)) return;

		const errorMessage = error.response?.data.message;

		/**
		 * 에러 처리를 setError로 안하고 강제 리다이렉트 시키는이유 :
		 * 발급받은 카카오 인가토큰의 경우 ' 한번 ' api 요청을 시도하면 try...catch 상관없이
		 * 토큰이 파기되어 다음 요청부터는 ' 잘못된 인가토큰 ' 에러를 반환받게됨
		 * 어떠한 에러 상관없이 ' 한번 ' 만 사용 가능하다면 ' 한번 ' 요청실패시 강제로 리다이렉트 처리를 시켜
		 * 새로운 인가토큰을 발급받게 유도시킴
		 */

		// alert error
		alert(errorMessage);

		//Delete AuthorizationToken
		document.cookie = `code=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`;

		//Redirect
		window.location.href = "/";
	}
};
