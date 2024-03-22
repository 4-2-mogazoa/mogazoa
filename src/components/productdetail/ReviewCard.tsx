import Image from "next/image";

import { Review } from "@/types/product";

import ProfileImage from "../common/profileImage/ProfileImage";
import ReviewerProfile from "../common/reviewerProfile/ReviewerProfile";
import Thumbs from "../common/thumbs/Thumbs";

type Props = {
	reviewData: Review;
	isMyReview: boolean;
};

export default function ReviewCard({ reviewData, isMyReview }: Props) {
	const { user, reviewImages, createdAt, isLiked, likeCount, content, rating } =
		reviewData;
	const MAX_RATE = 5;
	const rateArray = Array.from({ length: MAX_RATE }, (_, i) => i + 1);
	const starOnIconSrc = "/icons/star_on.svg";
	const starOffIconSrc = "/icons/star_off.svg";

	const handleButtonClick = () => {
		console.log("TODO:좋아요 개수 증가 비로그인 시 로그인요청 모달");
	};

	//TODO: 유저랭크, 팔로워 카운터, 리뷰카운터를 백엔드에서 제공X, qna 확인요청한 상태

	return (
		<div className="flex min-w-[33.5rem] flex-col rounded-[1.2rem] border border-black-border bg-black-bg p-[2rem] md:flex-row lg:p-[3rem]">
			<div className="flex min-w-[11rem] max-[767px]:mb-[2rem] md:mr-[2rem] lg:mr-[3rem]">
				<div className="flex h-[5rem] items-center gap-[1rem]">
					<button>
						<ProfileImage src={reviewData.user.image} size="small" />
					</button>
					<div className="text-[1.4rem] text-white lg:text-[1.6rem]">
						{reviewData.user.nickname}
					</div>
				</div>
				{/**TODO: 버튼 클릭 시 유저 프로필화면 이동 /user/{userId} */}
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
					{reviewImages.map((data) => (
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
						<div className=" text-gray-200">{createdAt}</div>
						{isMyReview && (
							<div className="flex gap-[1rem] font-light text-gray-100 underline">
								<button>수정</button>
								<button>삭제</button>
								{/**TODO: 수정모달 추가, 삭제 alert추가 */}
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

