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
			router.push("/");
			return;
		}

		if (code) {
			postOAuthSignin(code, "kakao");
			return;
		}
	}, [code, router]);

	return <div>Loding...</div>;
}
