import axios from "axios";

export const postOAuthSigninTest = async (token: string | string[]) => {
	try {
		document.cookie = `code=${token}; path=/`;
		window.location.href = `/oauth/signup/kakao`;
	} catch (error) {
		if (!axios.isAxiosError(error)) return;

		const errorMessage = error.response?.data.message;
		alert(errorMessage);
	}
};
