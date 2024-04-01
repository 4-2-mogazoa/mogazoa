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
	});
	const myData = useQuery({
		queryKey: ["me"],
		queryFn: () => getMe(),
	}).data;

	return (
		<div className="w-full lg:w-[94rem]">
			{productData && (
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
