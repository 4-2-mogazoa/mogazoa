import { useQuery } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/router";
import { useEffect } from "react";

import { getMe, getUserDetail } from "@/apis/user";
import ProfilePageLayout from "@/components/user/ProfilePageLayout";
import { UserDetail } from "@/types/user";

export default function UserPage() {
	const router = useRouter();
	const { data: me, isSuccess } = useQuery({
		queryKey: ["me"],
		queryFn: getMe,
	});

	const { data: user, error } = useQuery<UserDetail, AxiosError>({
		queryKey: ["user", router.query.id],
		queryFn: () => getUserDetail(Number(router.query.id)),
		enabled: !!router.query.id,
		retry: 1,
	});

	useEffect(() => {
		if (router.query.id == me?.id && isSuccess) {
			router.push("/mypage");
		}
	}, [isSuccess, me?.id, router]);

	useEffect(() => {
		if (error && axios.isAxiosError<{ message: string }>(error)) {
			console.log("error", error);
			alert(error.response?.data.message);
			router.back();
		}
	}, [error, router]);

	if (!user) {
		return <div>Loading...</div>;
	}

	return <ProfilePageLayout user={user} />;
}
