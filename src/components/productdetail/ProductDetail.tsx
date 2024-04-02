import { useQuery } from "@tanstack/react-query";

import { getProductDetail } from "@/apis/products";
import { getMe } from "@/apis/user";

import DetailCard from "./DetailCard";
import NoneReview from "./NoneReview";

export default function ProductDetail({ id }: { id: number }) {
	const {
		data: productData,
		isFetching,
		isLoading,
		isError,
	} = useQuery({
		queryKey: ["productDetail", id],
		queryFn: () => getProductDetail(id),
		enabled: !!id,
		staleTime: 60 * 1000,
		retry: false,
	});
	const myData = useQuery({
		queryKey: ["me"],
		queryFn: () => getMe(),
		retry: false,
	}).data;

	return (
		<div className="w-full lg:w-[94rem]">
			{productData && !isError && (
				<DetailCard
					productData={productData}
					isMyProduct={productData.writerId === myData?.id}
				/>
			)}
			{(isLoading || isFetching) && <NoneReview type="loading" />}
			{isError && <NoneReview type="error" />}
		</div>
	);
}
