import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";

import { getMe } from "@/apis/user";
import ProfilePageLayout from "@/components/user/ProfilePageLayout";
import getAccessTokenFromReq from "@/utils/getAccessTokenFromReq";

export async function getServerSideProps({ req }: GetServerSidePropsContext) {
	const accessToken = getAccessTokenFromReq(req);
	if (!accessToken) {
		return {
			redirect: {
				destination: "/signin",
				permanent: false,
			},
		};
	}

	const me = await getMe({
		headers: {
			Authorization: `Bearer ${accessToken}`,
		},
	});

	return {
		props: { me },
	};
}

export default function MyPage({
	me,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
	return <ProfilePageLayout user={me} />;
}
