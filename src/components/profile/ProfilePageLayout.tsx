import { useRouter } from "next/router";

import { UserDetail } from "@/types/user";

import ActivityDetails from "./ActivityDetails";
import FilteredProductList from "./FilteredProductList";
import ProfileCard from "./ProfileCard";

const dummyUser: UserDetail = {
	id: 1,
	createdAt: "2024-03-12T09:00:00.000Z",
	updatedAt: "2024-03-12T12:00:00.000Z",
	teamId: "team123",
	nickname: "Froggy",
	description:
		"세상에 리뷰 못할 제품은 없다. surisuri마수리와 함께라면 당신도 프로쇼핑러! 안녕하세요, 별점의 화신 surisuri마수리입니다!",
	image: "https://example.com/path/to/image.jpg",
	followeesCount: 5,
	followersCount: 8,
	isFollowing: false,
};

export default function ProfilePageLayout() {
	const router = useRouter();
	const isMine = router.asPath.includes("my");

	return (
		<main className="_flex-col-center gap-[6rem] bg-[#1C1C22] px-[2rem] py-[3rem] lg:flex-row lg:items-start lg:p-[6rem]">
			<h1 className="sr-only">프로필 페이지</h1>
			<ProfileCard user={dummyUser} isMine={isMine} />
			<div className="flex flex-col gap-[6rem]">
				<ActivityDetails />
				<FilteredProductList />
			</div>
		</main>
	);
}
