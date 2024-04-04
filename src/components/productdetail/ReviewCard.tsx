import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import Image from "next/image";
import { useRouter } from "next/router";

import { deleteReviewLike, postReviewLike } from "@/apis/review";
import { getMe } from "@/apis/user";
import { moveModalText } from "@/constants/modalText";
import { starRate } from "@/constants/starRate";
import { useModalActions } from "@/store/modal";
import { Review, ReviewImages, ReviewResponsePage } from "@/types/review";

import MovingPageModal from "../common/modal/MovingPageModal";
import ProfileImage from "../common/profileImage/ProfileImage";
import Thumbs from "../common/thumbs/Thumbs";
import ReviewAlertModal from "./ReviewAlertModal";
import ReviewModal from "./ReviewModal";

type Props = {
	reviewData: Review;
	isMyReview: boolean;
	order?: string;
};

export default function ReviewCard({ reviewData, isMyReview, order }: Props) {
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

	const { error } = useQuery({
		queryKey: ["me"],
		queryFn: () => getMe(),
		retry: false,
	});

	const { mutate: toggleLike } = useMutation({
		mutationFn: () => (isLiked ? deleteReviewLike(id) : postReviewLike(id)),
		onMutate: () => {
			const previous: ReviewResponsePage | undefined = queryClient.getQueryData(
				["review", productId, order],
			);
			if (!previous) {
				throw new Error("error!");
			}

			const updateData = () => {
				const updatedList = previous.pages[0].list.map((prev) =>
					prev.id === id
						? {
								...prev,
								isLiked: !prev.isLiked,
								likeCount: prev.isLiked
									? prev.likeCount - 1
									: prev.likeCount + 1,
							}
						: prev,
				);

				return {
					...previous,
					pages: [
						{
							...previous.pages[0],
							list: updatedList,
						},
						...previous.pages.slice(1),
					],
				};
			};
			queryClient.setQueryData(["review", productId, order], updateData());
			return previous;
		},
		onError: (error, variables, context) => {
			queryClient.setQueryData(["review", productId, order], context);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["review", productId, order] });
		},
	});

	const handleButtonClick = () => {
		if (isAxiosError(error)) {
			if (error.request.status === 401) {
				const modalId = openModal(
					<MovingPageModal
						closeModal={() => closeModal(modalId)}
						description={moveModalText.signin}
						url="/signin"
					/>,
				);
				return;
			}
		}

		if (isMyReview) {
			const modalId = openModal(
				<ReviewAlertModal
					closeModal={() => closeModal(modalId)}
					type="reviewLike"
				/>,
			);
			return;
		}

		toggleLike();
	};

	const handleReviewModifyButton = () => {
		const modalId = openModal(
			<ReviewModal
				type="modify"
				closeModal={() => closeModal(modalId)}
				productId={productId}
				reviewData={reviewData}
			/>,
		);
	};

	const handleReviewDeleteButton = () => {
		const modalId = openModal(
			<ReviewAlertModal
				closeModal={() => closeModal(modalId)}
				reviewId={id}
				productId={productId}
				type="delete"
			/>,
		);
	};

	return (
		<div className="flex min-w-[33.5rem] flex-col rounded-[1.2rem] border border-black-border bg-black-bg p-[2rem] md:flex-row lg:p-[3rem]">
			<div className="flex max-[767px]:mb-[2rem] md:mr-[2rem] md:w-[20%] md:overflow-hidden md:whitespace-normal lg:mr-[3rem]">
				<button
					className="flex h-[5rem] items-center gap-[1rem]"
					onClick={() => router.push(`/user/${user.id}`)}
				>
					<ProfileImage src={user.image} size="small" />
					<div className="text-start text-[1.4rem] text-white md:overflow-hidden md:whitespace-normal lg:text-[1.6rem]">
						{user.nickname}
					</div>
				</button>
			</div>
			<div className="flex flex-col gap-[2rem] md:w-[80%]">
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
