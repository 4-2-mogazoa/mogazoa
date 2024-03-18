import axios from "axios";

const url = "https://mogazoa-api.vercel.app/2-2/auth/signUp";

type TUserData = {
	email?: string;
	nickname?: string;
	password?: string;
	passwordCkd?: string;
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
		passwordConfirmation: data.passwordCkd,
	};

	try {
		const res = await axios.post(url, userData);
		router.push("/");
	} catch (error) {
		if (!axios.isAxiosError(error)) return;

		const errorMessage = error.response?.data.message;

		if (errorMessage === "이미 사용중인 닉네임입니다.") {
			setError("nickname", { message: errorMessage }, { shouldFocus: true });
		} else if (errorMessage === "이미 사용중인 이메일입니다.") {
			setError("email", { message: errorMessage }, { shouldFocus: true });
		}
	}
};
