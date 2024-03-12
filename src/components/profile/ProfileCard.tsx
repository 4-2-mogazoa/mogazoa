import { UserDetail } from "@/types/user";

import BasicButton from "../common/button/BasicButton";
import ProfileImage from "../common/profileImage/ProfileImage";

type Props = {
	user: UserDetail;
	isMine: boolean;
};

export default function ProfileCard({ user, isMine = true }: Props) {
	return (
		<div className="_flex-col-center w-[33.5rem] gap-[3rem] rounded-[1.2rem] border border-black-border bg-black-bg px-[2rem] py-[3rem] md:w-[50.9rem] lg:w-[34rem]">
			<ProfileImage
				size="large"
				src={"https://github.com/pmndrs/zustand/raw/main/bear.jpg"}
			/>
			<div className="flex w-full flex-col gap-[1rem]">
				<h1 className="self-center text-[2rem] font-semibold text-white">
					{user.nickname}
				</h1>
				<p className="max-w-[29.5rem] text-[1.4rem] text-gray-200">
					세상에 리뷰 못할 제품은 없다. surisuri마수리와 함께라면 당신도
					프로쇼핑러! 안녕하세요, 별점의 화신 surisuri마수리입니다!
				</p>
			</div>
			<div className="flex w-full justify-evenly">
				<div className="_flex-col-center">
					<p className="text-[1.8rem] font-semibold text-white">
						{user.followeesCount}
					</p>
					<p className="text-[1.4rem] text-gray-100">팔로워</p>
				</div>
				<div className="h-[4.8rem] w-[1px] bg-black-border"></div>
				<div className="_flex-col-center">
					<p className="text-[1.8rem] font-semibold text-white">
						{user.followersCount}
					</p>
					<p className="text-[1.4rem] text-gray-100">팔로잉</p>
				</div>
			</div>
			{isMine ? (
				<div className="_flex-col-center w-full gap-[1rem]">
					<BasicButton variant={"primary"} label="프로필 편집" />
					<BasicButton variant={"tertiary"} label="로그아웃" />
				</div>
			) : (
				<BasicButton
					label={user.isFollowing ? "팔로우 취소" : "팔로우"}
					variant={user.isFollowing ? "tertiary" : "primary"}
				/>
			)}
		</div>
	);
}
