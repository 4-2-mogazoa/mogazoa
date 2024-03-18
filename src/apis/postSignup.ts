import axios from "axios";

const url = "https://mogazoa-api.vercel.app/2-2/auth/signUp";

type Props = {
	email?: string;
	nickname?: string;
	password?: string;
	passwordCkd?: string;
};

export const postSignup = async (data: Props) => {
	const userData = {
		email: data.email,
		nickname: data.nickname,
		password: data.password,
		passwordConfirmation: data.passwordCkd,
	};
	try {
		const res = await axios.post(url, userData);
	} catch (error) {
		if (axios.isAxiosError(error)) {
			console.log(error.response);
		}
	}
};
