import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { useCallback } from "react";

import { deleteFollow, postFollow } from "@/apis/follow";
import BasicButton from "@/components/common/button/BasicButton";
import MovingPageModal from "@/components/common/modal/MovingPageModal";
import ProfileImage from "@/components/common/profileImage/ProfileImage";
import { moveModalText } from "@/constants/modalText";
import useAuth from "@/hooks/auth/useAuth";
import { useModalActions } from "@/store/modal";
import { UserDetail } from "@/types/user";
import getCookies from "@/utils/getCookies";

import FollowUsersModal from "./FollowUsersModal";
import ProfileModifyModal from "./ProfileModifyModal";

type Props = {
	user: UserDetail;
	isMine: boolean;
};

export default function ProfileCard({ user, isMine = true }: Props) {
	const queryClient = useQueryClient();
	const { openModal, closeModal } = useModalActions();
	const { logout } = useAuth();

	const followMutation = useMutation({
		mutationFn: (userId: number) =>
			user.isFollowing ? deleteFollow(userId) : postFollow(userId),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["user", user.id] });
		},
		onError: (error) => {
			if (!isAxiosError(error)) {
				return;
			}

			if (error.response?.status !== 401) {
				openModal(
					<div className="p-[1.5rem] text-center text-[1.8rem] text-gray-400 lg:text-[2rem]">
						{error?.response?.data.message || "팔로우 실패했습니다."}
					</div>,
				);

				return;
			}

			if (getCookies().accessToken) {
				document.cookie =
					"accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
			}
			const modalId = openModal(
				<MovingPageModal
					description={moveModalText.signin}
					closeModal={() => closeModal(modalId)}
					url="/signin"
				/>,
			);
		},
	});

	const handleOpenProfileModifyModal = () => {
		const modalId = openModal(
			<ProfileModifyModal user={user} closeModal={() => closeModal(modalId)} />,
			{ isCloseClickOutside: false },
		);
	};

	const handleOpenFolloweesModal = () => {
		openModal(<FollowUsersModal variant="followee" owner={user} />);
	};

	const handleOpenFollowersModal = () => {
		openModal(<FollowUsersModal variant="follower" owner={user} />);
	};

	const handleClickFollow = useCallback(() => {
		followMutation.mutate(user.id);
	}, [followMutation, user.id]);

	return (
		<section className="_flex-col-center w-[33.5rem] gap-[3rem] rounded-[1.2rem] border border-black-border bg-black-bg px-[2rem] py-[3rem] md:w-[50.9rem] lg:w-[34rem]">
			<h2 className="sr-only">기본 정보</h2>
			<ProfileImage size="large" src={user.image} />
			<div className="flex w-full flex-col gap-[1rem]">
				<strong className="truncate text-center text-[2rem] font-semibold text-white">
					{user?.nickname}
				</strong>
				<p className="text-center text-[1.4rem] text-gray-200">
					{user?.description}
				</p>
			</div>
			<div className="flex w-full justify-evenly">
				<button className="_flex-col-center" onClick={handleOpenFolloweesModal}>
					<span className="text-[1.8rem] font-semibold text-white">
						{user?.followeesCount}
					</span>
					<span className="text-[1.4rem] text-gray-100">팔로잉</span>
				</button>
				<div className="h-[4.8rem] w-[1px] bg-black-border"></div>
				<button className="_flex-col-center" onClick={handleOpenFollowersModal}>
					<span className="text-[1.8rem] font-semibold text-white">
						{user?.followersCount}
					</span>
					<span className="text-[1.4rem] text-gray-100">팔로워</span>
				</button>
			</div>
			{isMine ? (
				<div className="_flex-col-center w-full gap-[1rem] md:gap-[1.5rem] lg:gap-[2rem]">
					<BasicButton
						variant={"primary"}
						label="프로필 편집"
						onClick={handleOpenProfileModifyModal}
					/>
					<BasicButton variant={"tertiary"} label="로그아웃" onClick={logout} />
				</div>
			) : (
				<BasicButton
					label={user?.isFollowing ? "팔로우 취소" : "팔로우"}
					variant={user?.isFollowing ? "tertiary" : "primary"}
					onClick={handleClickFollow}
				/>
			)}
		</section>
	);
}
