// useAuth.ts

import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useState } from "react";

import { postSignIn } from "@/apis/auth/postSignin";
import { postSignup } from "@/apis/auth/postSignup";

type TUserData = {
	email: string;
	nickname: string;
	password: string;
	passwordChecked: string;
};

const useAuth = () => {
	const router = useRouter();
	const queryClient = useQueryClient();

	const login = async (
		data: { email: string; password: string },
		setError: any,
		router: any,
	) => {
		try {
			const res = await postSignIn(data, setError, router);
			router.push("/");
		} catch (error) {
			console.log(error);
		}
	};

	const logout = () => {
		document.cookie =
			"accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

		queryClient.removeQueries("userMe");

		router.push("/");
	};

	const register = async (data: TUserData, setError: any, router: any) => {
		try {
			const res = await postSignup(data, setError, router);
			router.push("/");
		} catch (error) {
			console.log(error);
		}
	};

	return { login, logout, register };
};

export default useAuth;
