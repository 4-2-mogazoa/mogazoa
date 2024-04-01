import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useEffect } from "react";

import { getProductDetail } from "@/apis/products";

import AddProductButton from "../common/button/AddProductButton";
import ProductDetail from "./ProductDetail";
import ProductReview from "./ProductReview";
import ProductStatistics from "./ProductStatistics";

export default function ProductDetailPageLayout() {
	const router = useRouter();
	const productId = Number(router.query.id);

	const { error } = useQuery({
		queryKey: ["productDetail", productId],
		queryFn: () => getProductDetail(productId),
		enabled: !!productId,
		staleTime: 60 * 1000,
	});

	useEffect(() => {
		if (router.isReady && isNaN(productId)) {
			router.push("/");
		}

		if (
			(error as any)?.response?.data?.message === "상품을 찾을 수 없습니다."
		) {
			router.push("/");
		}
	}, [productId, router.isReady, error]);

	return (
		<main className="_flex-col-center gap-[6rem] bg-[#1C1C22] px-[2rem] py-[3rem] md:px-[3rem] md:py-[4rem] lg:py-[6rem]">
			<ProductDetail id={productId} />
			<ProductStatistics id={productId} />
			<ProductReview id={productId} />
			<AddProductButton />
		</main>
	);
}
