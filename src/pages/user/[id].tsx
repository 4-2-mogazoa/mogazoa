import {
	GetServerSidePropsContext,
	GetServerSidePropsResult,
	InferGetServerSidePropsType,
} from "next";

import { getMe, getUserDetail } from "@/apis/user";
import ProfilePageLayout from "@/components/user/ProfilePageLayout";
import { UserDetail } from "@/types/user";
import getAccessTokenFromReq from "@/utils/getAccessTokenFromReq";

export async function getServerSideProps({
	req,
	params,
}: GetServerSidePropsContext): Promise<
	GetServerSidePropsResult<{ user: UserDetail }>
> {
	const paramId = Number(params?.id);

	if (Number.isNaN(paramId)) {
		return {
			notFound: true,
		};
	}

	const user = await getUserDetail(paramId);
	const accessToken = getAccessTokenFromReq(req);

	if (accessToken) {
		const me = await getMe({
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
		});

		if (me.id === paramId) {
			return {
				redirect: {
					destination: "/mypage",
					permanent: false,
				},
			};
		}
	}

	return {
		props: { user },
	};
}

export default function UserPage({
	user,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
	return <ProfilePageLayout user={user} />;
}
