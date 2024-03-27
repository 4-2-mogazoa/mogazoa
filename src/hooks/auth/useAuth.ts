// useAuth.ts

import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";

import { postSignIn } from "@/apis/auth/postSignin";
import { postSignup } from "@/apis/auth/postSignup";
import { LoginUserData, RegistrationUserData } from "@/types/auth";

const useAuth = () => {
	const router = useRouter();
	const queryClient = useQueryClient();

	const login = async (data: LoginUserData, setError: any) => {
		try {
			await postSignIn(data, setError, router);
		} catch (error) {
			console.log("error :", error);
		}
	};

	const signUp = async (data: RegistrationUserData, setError: any) => {
		try {
			await postSignup(data, setError, router);
		} catch (error) {
			console.log("error :", error);
		}
	};

	const logout = () => {
		document.cookie =
			"accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

		queryClient.removeQueries({ queryKey: ["userMe"] });

		router.push("/");
	};

	return { login, logout, signUp };
};

export default useAuth;
