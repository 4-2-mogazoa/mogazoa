import { useRouter } from "next/router";
import React, { useEffect } from "react";

import { postOAuthSignin } from "@/apis/auth/postOAuthSignin";
import getCookies from "@/utils/getCookies";

export default function OAuth() {
	const router = useRouter();
	const { code } = router.query;

	console.log(code);

	useEffect(() => {
		if (getCookies().accessToken) {
			console.log("토큰있음 루트로 리다이렉트");
			router.push("/");
			return;
		}

		if (code) {
			console.log("토큰없음 로그인시도 !");
			postOAuthSignin(code, "google");
			return;
		}
	}, [code, router]);

	return <div>Loding...</div>;
}
