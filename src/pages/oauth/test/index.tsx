import { useRouter } from "next/router";
import React, { useEffect } from "react";

import { postOAuthSigninTest } from "@/apis/auth/directOAuthSignupTest";

export default function OAuth({}: {}) {
	const router = useRouter();
	const { code } = router.query;

	useEffect(() => {
		if (code) {
			console.log("회원가입 테스트 !");
			postOAuthSigninTest(code);
			return;
		}
	}, [code]);

	return <div>회원가입 테스트용!</div>;
}
