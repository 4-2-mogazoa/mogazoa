import { useRouter } from "next/router";
import React from "react";

import AuthContainer from "@/components/auth/AuthContainer";
import OAuthSignupForm from "@/components/auth/form/OAuthSignupForm";

export default function OAuthSignupLayout() {
	const router = useRouter();
	const { platform } = router.query;

	// TODO: 추후 404페이지의 제작완성시 return <404Page />; 로 변경예정
	if (platform !== "kakao" && platform !== "google") {
		return;
	}

	return (
		<AuthContainer>
			<OAuthSignupForm />
		</AuthContainer>
	);
}
