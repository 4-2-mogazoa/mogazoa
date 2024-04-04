import { useRouter } from "next/router";
import React, { useEffect } from "react";

import AuthContainer from "@/components/auth/AuthContainer";
import OAuthSignupForm from "@/components/auth/form/OAuthSignupForm";
import getCookies from "@/utils/getCookies";

export default function OAuthSignupLayout() {
	const router = useRouter();
	const { platform } = router.query;

	// 엑세스토큰이 존재하거나 인가토큰 미존재시 리다이렉트
	useEffect(() => {
		if (getCookies().accessToken || !getCookies().code) {
			console.log("엑세스토큰이 존재하거나 인가토큰이 없어요");
			router.push("/");
			return;
		}

		// kakao, google로 이동시 강제리다이렉트
		if (platform) {
			if (platform !== "kakao" && platform !== "google") {
				console.log("카카오나 구글이 아니에요");
				router.push("/");
				return;
			}
		}
	}, [platform, router]);

	return (
		<AuthContainer>
			<OAuthSignupForm />
		</AuthContainer>
	);
}
