import BasicButton from "@/components/common/button/BasicButton";
import ProfileImage from "@/components/common/profileImage/ProfileImage";
import { UserDetail } from "@/types/user";

type Props = {
	user: UserDetail;
	isMine: boolean;
};

export default function ProfileCard({ user, isMine = true }: Props) {
	return (
		<section className="_flex-col-center w-[33.5rem] gap-[3rem] rounded-[1.2rem] border border-black-border bg-black-bg px-[2rem] py-[3rem] md:w-[50.9rem] lg:w-[34rem]">
			<h2 className="sr-only">기본 정보</h2>
			<ProfileImage
				size="large"
				src={"https://github.com/pmndrs/zustand/raw/main/bear.jpg"}
			/>
			<div className="flex w-full flex-col gap-[1rem]">
				<strong className="self-center text-[2rem] font-semibold text-white">
					{user.nickname}
				</strong>
				<p className="text-[1.4rem] text-gray-200">{user.description}</p>
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
				<div className="_flex-col-center w-full gap-[1rem] md:gap-[1.5rem] lg:gap-[2rem]">
					<BasicButton variant={"primary"} label="프로필 편집" />
					<BasicButton variant={"tertiary"} label="로그아웃" />
				</div>
			) : (
				<BasicButton
					label={user.isFollowing ? "팔로우 취소" : "팔로우"}
					variant={user.isFollowing ? "tertiary" : "primary"}
				/>
			)}
		</section>
	);
}
