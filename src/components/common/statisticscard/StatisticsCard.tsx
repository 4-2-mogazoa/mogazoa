import Image from "next/image";

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
	const typeLabel =
		type === "rate" ? "별점 평균" : type === "like" ? "찜" : "리뷰";
	const typeIcon =
		type === "rate"
			? "/icons/star.svg"
			: type === "like"
				? "/icons/heart_on.svg"
				: "/icons/message.svg";
	const reviewComma = reviewData?.toLocaleString("ko-KR");
	const data =
		type === "rate"
			? rateData || 0
			: type === "like"
				? likeData || 0
				: reviewData || 0;
	const avgData =
		type === "rate"
			? rateAvg || 0
			: type === "like"
				? likeAvg || 0
				: reviewAvg || 0;
	function calculateDifference(data: number, avgData: number) {
		const isBigger = data > avgData;
		const isSame = data === avgData;
		const diffRate = (isBigger ? data - avgData : avgData - data).toFixed(1);
		const diffLikeNReview = Math.ceil(
			isBigger ? data - avgData : avgData - data,
		);
		const biggerRate = isBigger && type === "rate";
		const biggerLikeNReview =
			(isBigger && type === "like") || (isBigger && type === "review");
		const comparisonRate = biggerRate ? "더 높아요!" : "더 낮아요!";
		const comparisonLikeNReview = biggerLikeNReview
			? "더 많아요!"
			: "더 적어요!";
		return {
			isSame,
			diffRate,
			diffLikeNReview,
			comparisonRate,
			comparisonLikeNReview,
		};
	}
	const dataDiff = calculateDifference(data, avgData);

	return (
		<div className="flex h-[8.2rem] min-w-[33.5rem] flex-col justify-center rounded-[1.2rem] border border-[#353542] bg-[#252530] px-[2rem] md:min-h-[16.9rem] md:min-w-[21.8rem] md:items-center md:gap-[2rem] lg:h-[19rem] lg:w-[30rem] lg:items-center lg:gap-[2rem]">
			<div className="flex flex-row gap-[1rem]">
				<span className="text-[1.4rem] text-white md:text-[1.6rem] lg:text-[1.8rem]">
					{typeLabel}
				</span>
				<div className="flex items-center md:hidden lg:hidden">
					<div className="relative mr-[0.5rem] size-[1.9rem]  md:size-[2rem] lg:size-[2.4rem]">
						<Image
							src={typeIcon}
							alt={typeLabel}
							fill
							className="object-cover"
						/>
					</div>

					<span className="text-[1.6rem] text-gray-100 md:text-[2rem] lg:text-[2.4rem]">
						{rateData}
					</span>
					<span className="text-[1.6rem] text-gray-100 md:text-[2rem] lg:text-[2.4rem] ">
						{likeData}
					</span>
					<span className="text-[1.6rem] text-gray-100 md:text-[2rem] lg:text-[2.4rem] ">
						{reviewComma}
					</span>
				</div>
			</div>
			<div className="hidden md:flex md:items-center lg:flex lg:items-center">
				<div className="relative mr-[0.5rem] size-[1.9rem]  md:size-[2rem] lg:size-[2.4rem]">
					<Image
						src={typeIcon}
						alt={typeLabel}
						fill
						className="object-cover "
					/>
				</div>
				<span className="text-[1.6rem] text-gray-100 md:text-[2rem] lg:text-[2.4rem]">
					{rateData}
				</span>
				<span className="text-[1.6rem] text-gray-100 md:text-[2rem] lg:text-[2.4rem] ">
					{likeData}
				</span>
				<span className="text-[1.6rem] text-gray-100 md:text-[2rem] lg:text-[2.4rem] ">
					{reviewComma}
				</span>
			</div>
			{!dataDiff.isSame && (
				<div className="flex flex-row items-center text-[1.2rem] md:flex-col lg:flex-col lg:text-[1.4rem]">
					<span className="text-gray-200">
						같은 카테고리의 제품들보다&nbsp;
					</span>
					{rateData && (
						<span className="text-gray-200">
							<span className="text-white">{dataDiff.diffRate}점 </span>
							{dataDiff.comparisonRate}
						</span>
					)}
					{likeData && (
						<span className="text-gray-200">
							<span className="text-white">{dataDiff.diffLikeNReview}개 </span>
							{dataDiff.comparisonLikeNReview}
						</span>
					)}
					{reviewData && (
						<span className="text-gray-200">
							<span className="text-white">{dataDiff.diffLikeNReview}개 </span>
							{dataDiff.comparisonLikeNReview}
						</span>
					)}
				</div>
			)}
			{dataDiff.isSame && (
				<div className="flex flex-row items-center text-[1.2rem] text-gray-200 md:flex-col lg:flex-col lg:text-[1.4rem]">
					<span>같은 카테고리의 제품들과&nbsp;</span>
					<span>동일해요!</span>
				</div>
			)}
		</div>
	);
}
