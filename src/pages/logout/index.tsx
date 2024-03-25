import { useQuery } from "@tanstack/react-query";
import React from "react";

import { getUser } from "@/apis/auth/getUser";
import Header from "@/components/common/menu/Header";
import useAuth from "@/hooks/auth/useAuth";

export default function Index() {
	const { logout } = useAuth();
	const { data } = useQuery({
		queryKey: ["userData"],
		queryFn: getUser,
	});

	console.log(data);
	return (
		<div>
			<Header />
			<button
				className="mt-8 bg-black-300 p-8 text-white"
				onClick={() => {
					logout();
				}}
			>
				logout
			</button>
			<p>{data ? data.nickname : "없음"}</p>
		</div>
	);
}
