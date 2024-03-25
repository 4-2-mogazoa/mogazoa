import { useRouter } from "next/router";

import Header from "@/components/common/menu/Header";
import { UserDetail } from "@/types/user";

import ActivityDetails from "./ActivityDetails";
import FilteredProductList from "./FilteredProductList";
import ProfileCard from "./ProfileCard";

type Props = {
	user: UserDetail;
};

export default function ProfilePageLayout({ user }: Props) {
	const router = useRouter();
	const isMine = router.asPath.includes("mypage");

	return (
		<>
			<Header />
			<main className="_flex-col-center gap-[6rem] bg-[#1C1C22] px-[2rem] py-[3rem] lg:flex-row lg:items-start lg:p-[6rem]">
				<h1 className="sr-only">프로필 페이지</h1>
				<ProfileCard user={user} isMine={isMine} />
				<div className="flex flex-col gap-[6rem]">
					<ActivityDetails user={user} />
					<FilteredProductList user={user} />
				</div>
			</main>
		</>
	);
}
