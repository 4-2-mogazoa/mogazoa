import { useMutation, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { useRouter } from "next/router";

import { deleteReviewLike, postReviewLike } from "@/apis/review";
import { starRate } from "@/constants/starRate";
import { useModalActions } from "@/store/modal";
import { Review, ReviewImages } from "@/types/review";

import ProfileImage from "../common/profileImage/ProfileImage";
import Thumbs from "../common/thumbs/Thumbs";
import ReviewAlertModal from "./ReviewAlertModal";
import ReviewModal from "./ReviewModal";

type Props = {
	reviewData: Review;
	isMyReview: boolean;
};

export default function ReviewCard({ reviewData, isMyReview }: Props) {
	const router = useRouter();
	const queryClient = useQueryClient();
	const {
		user,
		reviewImages,
		createdAt,
		isLiked,
		likeCount,
		content,
		rating,
		id,
		productId,
	} = reviewData;

	const { rateArray, starOnIconSrc, starOffIconSrc } = starRate;

	const { openModal, closeModal } = useModalActions();

	const { mutate: toggleLike } = useMutation({
		mutationFn: () => (isLiked ? deleteReviewLike(id) : postReviewLike(id)),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["review"] });
		},
	});

	const handleButtonClick = () => {
		if (isMyReview) {
			const reviewLikeAlert = openModal(
				<ReviewAlertModal
					closeModal={() => closeModal(reviewLikeAlert)}
					type="reviewLike"
				/>,
				{
					isCloseClickOutside: true,
					isCloseESC: true,
				},
			);
			return;
		}
		toggleLike();
	};

	const handleReviewModifyButton = () => {
		const reviewModify = openModal(
			<ReviewModal
				type="modify"
				closeModal={() => closeModal(reviewModify)}
				productId={productId}
				reviewData={reviewData}
			/>,
			{
				isCloseClickOutside: true,
				isCloseESC: true,
			},
		);
	};

	const handleReviewDeleteButton = () => {
		const reviewDelete = openModal(
			<ReviewAlertModal
				closeModal={() => closeModal(reviewDelete)}
				reviewId={id}
				productId={productId}
				type="delete"
			/>,
			{
				isCloseClickOutside: true,
				isCloseESC: true,
			},
		);
	};

	return (
		<div className="flex min-w-[33.5rem] flex-col rounded-[1.2rem] border border-black-border bg-black-bg p-[2rem] md:flex-row lg:p-[3rem]">
			<div className="flex min-w-[11rem] max-[767px]:mb-[2rem] md:mr-[2rem] lg:mr-[3rem]">
				<button
					className="flex h-[5rem] items-center gap-[1rem]"
					onClick={() => router.push(`/profile/${user.id}`)}
				>
					<ProfileImage src={user.image} size="small" />
					<div className="text-[1.4rem] text-white lg:text-[1.6rem]">
						{user.nickname}
					</div>
				</button>
			</div>
			<div className="flex w-full flex-col gap-[2rem]">
				<div className="flex gap-[3rem]">
					<div className="flex gap-[0.2rem]">
						{rateArray.map((index) => (
							<div
								key={index}
								className="relative size-[1.2rem] lg:size-[1.8rem]"
							>
								<Image
									src={index <= rating ? starOnIconSrc : starOffIconSrc}
									alt="별점"
									fill
									className="object-contain"
								/>
							</div>
						))}
					</div>
				</div>
				<div className="text-[1.2rem] text-[white] lg:text-[1.6rem]">
					{content}
				</div>
				<div className="flex gap-[1rem] lg:gap-[2rem]">
					{reviewImages.map((data: ReviewImages) => (
						<div
							key={data.id}
							className="relative size-[6rem] md:size-[8rem] lg:size-[10rem]"
						>
							<Image
								src={data.source}
								alt={data.source}
								fill
								className="rounded-[2rem] object-cover"
							/>
						</div>
					))}
				</div>
				<div className="flex justify-between">
					<div className="flex items-center gap-[1.5rem] text-[1.2rem] md:gap-[2rem] md:text-[1.4rem]">
						<div className=" text-gray-200">
							{createdAt.substring(0, createdAt.indexOf("T"))}
						</div>
						{isMyReview && (
							<div className="flex gap-[1rem] font-light text-gray-100 underline">
								<button onClick={handleReviewModifyButton}>수정</button>
								<button onClick={handleReviewDeleteButton}>삭제</button>
							</div>
						)}
					</div>
					<Thumbs
						isLiked={isLiked}
						likeCount={likeCount}
						handleButtonClick={handleButtonClick}
					/>
				</div>
			</div>
		</div>
	);
}
