import ProductDetail from "./ProductDetail";
import ProductReview from "./ProductReview";
import ProductStatistics from "./ProductStatistics";

export default function ProductDetailPageLayout() {
	return (
		<main className="_flex-col-center gap-[6rem] bg-[#1C1C22] px-[2rem] py-[3rem] md:px-[3rem] md:py-[4rem] lg:py-[6rem]">
			<ProductDetail />
			<ProductStatistics />
			<ProductReview />
		</main>
	);
}
