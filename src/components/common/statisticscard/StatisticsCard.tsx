import Image from "next/image";

import calculateDifference from "./calculateDifference";

type StatisticsCardProps = {
	type: "rate" | "like" | "review";
	rateData?: number;
	likeData?: number;
	reviewData?: number;
	rateAvg?: number;
	likeAvg?: number;
	reviewAvg?: number;
};

export default function StatisticsCard({
	type,
	rateData,
	likeData,
	reviewData,
	rateAvg,
	likeAvg,
	reviewAvg,
}: StatisticsCardProps) {
	const typeList = {
		rate: {
			label: "별점 평균",
			productData: rateData,
			avgData: rateAvg,
			icon: "/icons/star_on.svg",
			unit: "점",
			bottomDecription: {
				higher: "더 높아요!",
				lower: "더 낮아요!",
				same: "동일해요!",
			},
		},
		like: {
			label: "찜",
			productData: likeData,
			avgData: likeAvg,
			icon: "/icons/heart_on.svg",
			unit: "개",
			bottomDecription: {
				higher: "더 많아요!",
				lower: "더 적어요!",
				same: "동일해요!",
			},
		},
		review: {
			label: "리뷰",
			productData: reviewData,
			avgData: reviewAvg,
			icon: "/icons/message.svg",
			unit: "개",
			bottomDecription: {
				higher: "더 많아요!",
				lower: "더 적어요!",
				same: "동일해요!",
			},
		},
	};

	const { label, productData, avgData, icon, unit, bottomDecription } =
		typeList[type];

	const result = calculateDifference(productData, avgData, bottomDecription);
	return (
		<div className="flex flex-col gap-[0.5rem] rounded-[1.2rem] border border-[#353542] bg-[#252530] p-[2rem] max-[767px]:min-w-[33.5rem] md:w-full md:items-center md:justify-center md:gap-[1.5rem] md:py-[3rem] lg:gap-[2rem]">
			<div className="flex flex-row gap-[1rem]">
				<span className="text-[1.4rem] text-white md:text-[1.6rem] lg:text-[1.8rem]">
					{label}
				</span>
				<div className="flex items-center md:hidden lg:hidden">
					<div className="relative mr-[0.5rem] size-[1.9rem]  md:size-[2rem] lg:size-[2.4rem]">
						<Image src={icon} alt={label} fill className="object-cover" />
					</div>
					<span className="text-[1.6rem] text-gray-100 md:text-[2rem] lg:text-[2.4rem]">
						{type === "rate" ? productData : productData?.toLocaleString()}
					</span>
				</div>
			</div>
			<div className="hidden md:flex md:items-center lg:flex lg:items-center">
				<div className="relative mr-[0.5rem] size-[1.9rem]  md:size-[2rem] lg:size-[2.4rem]">
					<Image src={icon} alt={label} fill className="object-cover " />
				</div>
				<span className="text-[1.6rem] text-gray-100 md:text-[2rem] lg:text-[2.4rem]">
					{type === "rate" ? productData : productData?.toLocaleString()}
				</span>
			</div>
			<div className="flex flex-row items-center text-[1.2rem] md:flex-col lg:flex-col lg:text-[1.4rem]">
				<span className="text-gray-200">{result.topDescription}&nbsp;</span>
				<span className="text-gray-200">
					{!result.isSame && (
						<span className="text-white">
							{type === "rate" ? result.rateDiff : result.likeReviewDiff}
							{unit}&nbsp;
						</span>
					)}
					{result.bottomDescriptionResult}
				</span>
			</div>
		</div>
	);
}

