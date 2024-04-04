import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";

import { getMe, getUserDetail } from "@/apis/user";
import Loading from "@/components/user/Loading";
import ProfilePageLayout from "@/components/user/ProfilePageLayout";
import { UserDetail } from "@/types/user";
import getAccessTokenFromReq from "@/utils/getAccessTokenFromReq";

export async function getServerSideProps({
	req,
	params,
}: GetServerSidePropsContext) {
	const queryClient = new QueryClient();
	const userId = Number(params?.id);

	if (Number.isNaN(userId)) {
		return {
			notFound: true,
		};
	}

	await queryClient.prefetchQuery<UserDetail>({
		queryKey: ["user", userId],
		queryFn: () =>
			getUserDetail(userId, {
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			}),
		staleTime: 60 * 1000,
	});

	const accessToken = getAccessTokenFromReq(req);

	if (accessToken) {
		try {
			const me = await getMe({
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			});

			if (me.id === userId) {
				return {
					redirect: {
						destination: "/mypage",
						permanent: false,
					},
				};
			}
		} catch (error) {
			if (isAxiosError(error)) {
				console.log(
					`error:${error.response?.status} ${error.response?.statusText},`,
					error.response?.data.message,
				);
			}
		}
	}

	return {
		props: { dehydratedState: dehydrate(queryClient) },
	};
}

export default function UserPage() {
	const router = useRouter();
	const userId = Number(router.query["id"]);

	const { data: user, error } = useQuery<UserDetail>({
		queryKey: ["user", userId],
		queryFn: () => getUserDetail(userId),
		staleTime: 60 * 1000,
		retry: 0,
	});

	useEffect(() => {
		if (error && isAxiosError<{ message: string }>(error)) {
			console.error("error", error);
			alert(error.response?.data.message);
			window.location.href = "/";
		}
	}, [error, router]);

	if (!user) {
		return <Loading />;
	}

	return <ProfilePageLayout user={user} />;
}
