import { useQuery } from "@tanstack/react-query";

import { getProductDetail } from "@/apis/products";
import { getUserMe } from "@/apis/review";

import DetailCard from "./DetailCard";

export default function ProductDetail({ id }: { id: number }) {
	const productData = useQuery({
		queryKey: ["productDetail", id],
		queryFn: () => getProductDetail(id),
		enabled: !!id,
	}).data;
	const myData = useQuery({
		queryKey: ["usersMe"],
		queryFn: () => getUserMe(),
	}).data;

	return (
		<div className="w-full lg:w-[94rem]">
			{productData && (
				<DetailCard
					productData={productData}
					isMyProduct={productData.writerId === myData?.id}
				/>
			)}
		</div>
	);
}
