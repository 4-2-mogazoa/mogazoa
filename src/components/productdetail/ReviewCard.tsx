import Image from "next/image";

import { Review } from "@/types/product";

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
		console.log("TODO:좋아요 개수 증가");
	};

	const reviewerData = {
		image: user.image,
		rank: 1,
		nickname: user.nickname,
		followersCount: 162,
		reviewCount: 37,
	};
	//TODO: 유저랭크, 팔로워 카운터, 리뷰카운터를 백엔드에서 제공안해서, api 수정 요청하거나 userId로 유저 정보/랭킹 조회 데이터 가져와야함

	return (
		<div className="flex flex-col gap-[3rem] rounded-[1.2rem] border border-black-border bg-black-bg p-[2rem] md:flex-row lg:p-[3rem]">
			<div className="flex min-w-[17rem] flex-row justify-between md:flex-col md:justify-normal md:gap-[1rem] lg:gap-[1.5rem]">
				<ReviewerProfile reviewerData={reviewerData} />
				<div className="flex items-end md:justify-center">
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
			<div className="flex min-w-[29.5rem] flex-col gap-[2rem] lg:min-w-[65rem]">
				<span className="text-[1.2rem] text-[white] lg:text-[1.6rem]">
					{content}
				</span>
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
						<div className="text-gray-200">{createdAt}</div>
						{isMyReview && (
							<div className="flex gap-[1rem] font-light text-gray-100 underline">
								<button>수정</button>
								<button>삭제</button>
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
