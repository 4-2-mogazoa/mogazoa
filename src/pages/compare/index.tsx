import CompareForm from "@/components/compare/CompareForm";
import Result from "@/components/compare/Result";
import useCompareQueries from "@/hooks/compare/useCompareQueries";
import { ProductDetail } from "@/types/product";

const firstProduct: ProductDetail = {
	id: 1,
	name: "iphone pro 15",
	description:
		"Super Retina XDR 디스플레이1, ProMotion 기술, 상시표시형 디스플레이",
	image: "/images/testImage.png",
	rating: 4.5,
	reviewCount: 100,
	favoriteCount: 50,
	categoryId: 6,
	updatedAt: "2024-03-13 06:30:20",
	createdAt: "2024-03-13 06:30:20",
	writerId: 1,
	isFavorite: false,
	category: {
		id: 6,
		name: "전자기기",
	},
	categoryMetric: {
		rating: 4.0,
		favoriteCount: 45,
		reviewCount: 110,
	},
};

const secondProduct: ProductDetail = {
	id: 2,
	name: "iphone pro 15 Max",
	description:
		"Super Retina XDR 디스플레이1, ProMotion 기술, 상시표시형 디스플레이",
	image: "/images/testImage.png",
	rating: 4.7,
	reviewCount: 80,
	favoriteCount: 40,
	categoryId: 6,
	updatedAt: "2024-03-13 06:30:20",
	createdAt: "2024-03-13 06:30:20",
	writerId: 1,
	isFavorite: false,
	category: {
		id: 6,
		name: "전자기기",
	},
	categoryMetric: {
		rating: 4.0,
		favoriteCount: 45,
		reviewCount: 110,
	},
};

export default function Index() {
	// const {
	// 	products: { firstProduct, secondProduct },
	// } = useCompareQueries();

	return (
		<div className="h-full min-h-screen bg-[#1c1c22]">
			<div className="_flex-col-center mx-8 gap-24 pb-16 pt-12 md:mx-12 md:max-w-[94rem] md:pb-40 md:pt-16 lg:mx-auto lg:w-[94rem] lg:gap-32 lg:pt-24">
				<CompareForm />
				<div>
					{firstProduct && secondProduct ? (
						<Result firstProduct={firstProduct} secondProduct={secondProduct} />
					) : (
						<div>로딩 중</div>
					)}
				</div>
			</div>
		</div>
	);
}
