import { motion } from "framer-motion";
import React from "react";

import { GOOGLE_AUTH_URL, KAKAO_AUTH_URL } from "@/constants/oauth";

export default function Index() {
	//카카오 회원가입 테스트용
	const TEST_REDIRECT_URL = "http://localhost:3000/oauth/test";
	const KAKAO_TEST_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_REDIRECT_URL}&redirect_uri=${TEST_REDIRECT_URL}&response_type=code`;

	return (
		<>
			<h1 className=" pl-5 pt-5 text-[2rem] font-normal">TEST PAGE</h1>
			<div className="flex gap-5 p-5">
				<motion.a
					className="bg-black-300 p-10 text-[2rem] text-white"
					href={KAKAO_AUTH_URL}
					whileHover={{ scale: 0.95, opacity: 0.9 }}
				>
					카카오 접근
				</motion.a>

				<motion.a
					className=" bg-sky-400 p-10 text-[2rem] text-white"
					href={KAKAO_TEST_AUTH_URL}
					whileHover={{ scale: 0.95, opacity: 0.9 }}
				>
					카카오 회원가입 테스트!
				</motion.a>

				<motion.a
					className="bg-black-300 p-10 text-[2rem] text-white"
					href={GOOGLE_AUTH_URL}
					whileHover={{ scale: 0.95, opacity: 0.9 }}
				>
					구글 접근
				</motion.a>
			</div>
		</>
	);
}
