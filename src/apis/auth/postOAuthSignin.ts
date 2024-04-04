import axios from "axios";

import instance from "../axiosInstance";

export const postOAuthSignin = async (
	token: string | string[],
	platform: "kakao" | "google",
) => {
	// Kakao | Google
	const url = `auth/signIn/${platform}`;

	const OAuthSignupData = {
		redirectUri: "http://localhost:3000/oauth",
		token: token,
	};
	try {
		const res = await instance.post(url, OAuthSignupData);

		//SetUp Cookie
		document.cookie = `accessToken=${res.data.accessToken}`;

		//Redirect
		window.location.href = "/";

		return res;
	} catch (error) {
		if (!axios.isAxiosError(error)) return;

		const errorMessage = error.response?.data.message;
		const statusCode = error.response?.status;

		// 보안을위해 인가토큰의 만료기간을 1분으로설정
		const expirationTime = new Date();
		expirationTime.setTime(expirationTime.getTime() + 60000);

		if (statusCode === 403) {
			document.cookie = `code=${token}; expires=${expirationTime.toUTCString()}; path=/`;
			window.location.href = `/oauth/signup/${platform}`;
		} else {
			alert(errorMessage);
		}
	}
};
