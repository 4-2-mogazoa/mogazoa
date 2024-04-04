import { useRouter } from "next/router";
import React, { useEffect } from "react";

import { postOAuthSignin } from "@/apis/auth/postOAuthSignin";
import LodingSpinner from "@/components/common/spinner/LodingSpinner";
import getCookies from "@/utils/getCookies";

export default function OAuth() {
	const router = useRouter();
	const { code } = router.query;

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

	return (
		<div className="flex h-screen w-full items-center justify-center bg-[#1c1c22]">
			<LodingSpinner />
		</div>
	);
}
