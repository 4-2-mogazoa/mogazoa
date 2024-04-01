import { motion } from "framer-motion";
import React from "react";

export default function Index() {
	const REST_API_KEY = "2796d654f832a9463263f1f3a898514c";
	const REDIRECT_URL = "http://localhost:3000/oauth";
	const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URL}&response_type=code`;

	const TEST_REDIRECT_URL = "http://localhost:3000/oauth/test";
	const KAKAO_TEST_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${TEST_REDIRECT_URL}&response_type=code`;

	console.log("link :", process.env.NEXT_PUBLIC_KAKAO_AUTH_URL);

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
					회원가입 테스트!
				</motion.a>
			</div>
		</>
	);
}
