// useAuth.ts

import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";

import { postOAuthSignup } from "@/apis/auth/postOAuthSignup";
import { postSignIn } from "@/apis/auth/postSignin";
import { postSignup } from "@/apis/auth/postSignup";
import { LoginUserData, RegistrationUserData } from "@/types/auth";

const useAuth = () => {
	const queryClient = useQueryClient();
	const router = useRouter();

	const { platform } = router.query;

	const login = async (data: LoginUserData, setError: any) => {
		try {
			await postSignIn(data, setError);
		} catch (error) {
			console.log("error :", error);
		}
	};

	const signUp = async (data: RegistrationUserData, setError: any) => {
		try {
			await postSignup(data, setError);
		} catch (error) {
			console.log("error :", error);
		}
	};

	const OAuthSignUp = async (data: { nickname: string }) => {
		try {
			await postOAuthSignup(data, platform);
		} catch (error) {
			console.log("error :", error);
		}
	};

	const logout = () => {
		document.cookie =
			"accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

		queryClient.removeQueries({ queryKey: ["me"] });

		window.location.href = "/";
	};

	return { login, logout, signUp, OAuthSignUp };
};

export default useAuth;
