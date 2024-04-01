import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { Fragment } from "react";

import { getUserFollowees, getUserFollowers } from "@/apis/user";
import ProfileImage from "@/components/common/profileImage/ProfileImage";
import { useIntersect } from "@/hooks/common/useIntersect";
import { useModalActions } from "@/store/modal";
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
	const { closeAllModals } = useModalActions();
	const { data, fetchNextPage, hasNextPage, isFetching } = useInfiniteQuery<
		UserResponseByVariant[typeof variant]
	>({
		queryKey: [variant, owner.id],
		queryFn: ({ pageParam }) =>
			variant === "followee"
				? getUserFollowees(owner.id, pageParam as number)
				: getUserFollowers(owner.id, pageParam as number),
		initialPageParam: 0,
		getNextPageParam: (lastPage) => lastPage.nextCursor,
	});

	const intersectRef = useIntersect<HTMLLIElement>(
		async (entry, observer) => {
			observer.unobserve(entry.target);
			if (hasNextPage && !isFetching) {
				fetchNextPage();
			}
		},
		{ rootMargin: "50px" },
	);

	return (
		<div className="flex max-h-[50rem] flex-col gap-[2rem] px-[2rem] md:max-h-[55rem] lg:max-h-[60rem]">
			<h3 className="text-[2rem] font-semibold text-white lg:text-[2.4rem]">
				{owner.nickname}님{variant === "followee" ? "을" : "이"} 팔로우하는 유저
			</h3>
			{data?.pages[0].list.length ? (
				<ul className="flex flex-col gap-[2rem] overflow-auto">
					{data.pages.map((users, i) => (
						<Fragment key={i}>
							{users.list.map((item, idx, arr) => {
								const isLastItem = idx === arr.length - 1;
								const user =
									variant === "followee"
										? (item as Followee).followee
										: (item as Follower).follower;
								return (
									<li key={user.id} ref={isLastItem ? intersectRef : null}>
										<Link
											href={`/user/${user.id}`}
											className="flex items-center gap-[2rem]"
											onClick={closeAllModals}
										>
											<ProfileImage src={user.image} size="medium" />
											<span className="text-[1.6rem] font-medium text-white lg:text-[1.8rem]">
												{user.nickname}
											</span>
										</Link>
									</li>
								);
							})}
						</Fragment>
					))}
				</ul>
			) : (
				<div className="text-center text-[1.8rem] text-gray-400 lg:text-[2rem]">
					팔로우하는 유저가 없습니다.
				</div>
			)}
		</div>
	);
}
