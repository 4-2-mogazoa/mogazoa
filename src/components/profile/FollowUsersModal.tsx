import { useQuery } from "@tanstack/react-query";

import { getUserFollowees, getUserFollowers } from "@/apis/user";
import ProfileImage from "@/components/common/profileImage/ProfileImage";
import {
	Followee,
	Follower,
	UserDetail,
	UserResponseByVariant,
} from "@/types/user";

type Props = {
	variant: "followee" | "follower";
	owner: UserDetail;
};

export default function FollowUsersModal({
	variant = "followee",
	owner,
}: Props) {
	const { data: usersResponse } = useQuery<
		UserResponseByVariant[typeof variant]
	>({
		queryKey: [variant, owner.id],
		queryFn: () =>
			variant === "followee"
				? getUserFollowees(owner.id)
				: getUserFollowers(owner.id),
	});
	const users = usersResponse?.list;

	const renderUser = (item: Followee | Follower) => {
		const user =
			variant === "followee"
				? (item as Followee).followee
				: (item as Follower).follower;
		return (
			<li key={user.id}>
				<button className="flex items-center gap-[2rem]">
					<ProfileImage src={user.image} size="medium" />
					<span className="text-[1.6rem] font-medium text-white lg:text-[1.8rem]">
						{user.nickname}
					</span>
				</button>
			</li>
		);
	};

	return (
		<div className="flex flex-col gap-[2rem] px-[2rem]">
			<h3 className="text-[2rem] font-semibold text-white lg:text-[2.4rem]">
				{owner.nickname}님{variant === "followee" ? "을" : "이"} 팔로우하는 유저
			</h3>
			{users?.length ? (
				<ul className="flex flex-col gap-[2rem]">
					{users?.map((item) => renderUser(item))}
				</ul>
			) : (
				<div className="text-center text-[1.8rem] text-gray-400 lg:text-[2rem]">
					팔로우하는 유저가 없습니다.
				</div>
			)}
		</div>
	);
}
