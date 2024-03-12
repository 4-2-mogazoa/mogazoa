import { UserDetail } from "@/types/user";

import ProfileCard from "./ProfileCard";

const dummyUser: UserDetail = {
	id: 1,
	createdAt: "2024-03-12T09:00:00.000Z",
	updatedAt: "2024-03-12T12:00:00.000Z",
	teamId: "team123",
	nickname: "Froggy",
	image: "https://example.com/path/to/image.jpg",
	followeesCount: 5,
	followersCount: 8,
	isFollowing: false,
};

export default function ProfilePageLayout({}) {
	return (
		<div className="_flex-col-center gap-[6rem] bg-[#1C1C22] px-[2rem] py-[3rem] lg:p-[6rem]">
			<ProfileCard user={dummyUser} isMine={true} />
		</div>
	);
}
