import { useQuery } from "@tanstack/react-query";

import { getMe } from "@/apis/user";
import ProfilePageLayout from "@/components/user/ProfilePageLayout";
import { UserDetail } from "@/types/user";

export default function MyPage() {
	const { data: me } = useQuery<UserDetail>({
		queryKey: ["me"],
		queryFn: getMe,
	});

	if (!me) {
		return <div>Loading...</div>;
	}
	return <ProfilePageLayout user={me} />;
}
