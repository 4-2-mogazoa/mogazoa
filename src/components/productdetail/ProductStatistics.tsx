import { useQuery } from "@tanstack/react-query";

import { getProductDetail } from "@/apis/products";

import StatisticsCard from "../common/statisticscard/StatisticsCard";
import NoneReview from "./NoneReview";

export default function ProductStatistics({ id }: { id: number }) {
	const {
		data: productData,
		isLoading,
		isFetching,
		isError,
	} = useQuery({
		queryKey: ["productDetail", id],
		queryFn: () => getProductDetail(id),
		enabled: !!id,
		staleTime: 60 * 1000,
		retry: false,
	});

	return (
		<div className="flex w-full flex-col lg:w-[94rem] lg:pt-[2rem]">
			<span className="pb-[3rem] text-[1.8rem] text-white md:text-[1.6rem] lg:text-[2rem]">
				상품 통계
			</span>
			{productData && !isError && !isLoading && !isFetching && (
				<div className="flex flex-col gap-[1.5rem] md:flex-row lg:gap-[2rem] ">
					<StatisticsCard
						type="rate"
						rateData={productData.rating}
						rateAvg={productData.categoryMetric.rating}
					/>
					<StatisticsCard
						type="like"
						likeData={productData.favoriteCount}
						likeAvg={productData.categoryMetric.favoriteCount}
					/>
					<StatisticsCard
						type="review"
						reviewData={productData.reviewCount}
						reviewAvg={productData.categoryMetric.reviewCount}
					/>
				</div>
			)}
			{(isLoading || isFetching) && <NoneReview type="loading" />}
			{isError && <NoneReview type="error" />}
		</div>
	);
}
