import { useRouter } from "next/router";

import AddProductButton from "../common/button/AddProductButton";
import ProductDetail from "./ProductDetail";
import ProductReview from "./ProductReview";
import ProductStatistics from "./ProductStatistics";

export default function ProductDetailPageLayout() {
	const router = useRouter();
	const productId = Number(router.query.id);

	return (
		<main className="_flex-col-center gap-[6rem] bg-[#1C1C22] px-[2rem] py-[3rem] md:px-[3rem] md:py-[4rem] lg:py-[6rem]">
			<ProductDetail id={productId} />
			<ProductStatistics id={productId} />
			<ProductReview id={productId} />
			<AddProductButton />
		</main>
	);
}
