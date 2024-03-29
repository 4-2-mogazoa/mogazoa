import StatisticsCard from "../common/statisticscard/StatisticsCard";
import { productDetailData } from "./MockData";

export default function ProductStatistics() {
	return (
		<div className="flex w-full flex-col lg:w-[94rem] lg:pt-[2rem]">
			<span className="pb-[3rem] text-[1.8rem] text-white md:text-[1.6rem] lg:text-[2rem]">
				상품 통계
			</span>
			<div className="flex flex-col gap-[1.5rem] md:flex-row lg:gap-[2rem] ">
				<StatisticsCard
					type="rate"
					rateData={productDetailData.rating}
					rateAvg={productDetailData.categoryMetric.rating}
				/>
				<StatisticsCard
					type="like"
					likeData={productDetailData.favoriteCount}
					likeAvg={productDetailData.categoryMetric.favoriteCount}
				/>
				<StatisticsCard
					type="review"
					reviewData={productDetailData.reviewCount}
					reviewAvg={productDetailData.categoryMetric.reviewCount}
				/>
			</div>
		</div>
	);
}
