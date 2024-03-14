import { useEffect, useState } from "react";

import Dropdown from "@/components/common/dropdown/Dropdown";
import ProductCard from "@/components/common/productcard/ProductCard";
import { BREAK_POINT } from "@/constants/breakPoint";
import useWindowWidth from "@/hooks/common/useWindowWidth";
import cn from "@/utils/cn";

const productsFilter = [
	{
		id: 0,
		name: "리뷰 남긴 상품",
		// func: getUserReviewedProducts,
	},
	{
		id: 1,
		name: "등록한 상품",
		// func: getUserCreatedProducts,
	},
	{
		id: 2,
		name: "찜한 상품",
		// func: getUserFavoriteProducts,
	},
];

const products = [
	{
		updatedAt: "2024-03-13 06:30:20",
		createdAt: "2024-03-13 06:30:20",
		writerId: "e03eb43c-ef66-47d5-a9b8-13c75732c4c1",
		categoryId: "b7d9f987-c081-4367-8cfe-5919a9178658",
		favoriteCount: 4,
		reviewCount: 34,
		rating: 1.01,
		image: "/images/sample.png",
		name: "Eco-Friendly Water",
		id: "13de02b2-00cb-4d0e-b533-12e66f3cb843",
	},
	{
		updatedAt: "2024-03-13 06:30:20",
		createdAt: "2024-03-13 06:30:20",
		writerId: "29357f52-c5d2-47e0-a562-fc282e517da0",
		categoryId: "156f1aca-93c2-48c5-be99-a93bc223e852",
		favoriteCount: 15,
		reviewCount: 45,
		rating: 4.97,
		image: "/images/sample.png",
		name: "Wireless Bluetooth Headphones",
		id: "e23cc50c-6d17-4b97-a890-e37276e7f8fa",
	},
	{
		updatedAt: "2024-03-13 06:30:20",
		createdAt: "2024-03-13 06:30:20",
		writerId: "003d0145-376e-4057-9bfb-9be84048aed8",
		categoryId: "00c02c64-fd88-4e03-8161-ed66dc1986bd",
		favoriteCount: 30,
		reviewCount: 26,
		rating: 3.4,
		image: "/images/sample.png",
		name: "Organic Cotton T-Shirt",
		id: "be89bdc1-6ab6-490e-9493-2dff3583247c",
	},
	{
		updatedAt: "2024-03-13 06:30:20",
		createdAt: "2024-03-13 06:30:20",
		writerId: "585d8124-0b0c-44c7-9a54-8b63ed84dc5e",
		categoryId: "03ed98ae-7c61-44e1-8cc6-1b9bcf5ca300",
		favoriteCount: 99,
		reviewCount: 50,
		rating: 1.85,
		image: "/images/sample.png",
		name: "Portable Solar Charger",
		id: "d7652fc0-ec1d-4c87-8b58-7b16bd96eaed",
	},
	{
		updatedAt: "2024-03-13 06:30:20",
		createdAt: "2024-03-13 06:30:20",
		writerId: "fb821593-d622-42e8-97b1-3536a2144bfb",
		categoryId: "446a341b-f48d-4cec-8bc1-ac0005ddb635",
		favoriteCount: 100,
		reviewCount: 0,
		rating: 4.3,
		image: "/images/sample.png",
		name: "Smart Home Thermostat",
		id: "6d7691d0-9c52-439f-8930-fe4a05f49112",
	},
	{
		updatedAt: "2024-03-13 06:30:20",
		createdAt: "2024-03-13 06:30:20",
		writerId: "b469d1dc-4141-47df-b333-0dc9587c193c",
		categoryId: "ccb1ae94-1c84-442a-b4ee-adb8d796a597",
		favoriteCount: 62,
		reviewCount: 30,
		rating: 1.21,
		image: "/images/sample.png",
		name: "Noise-Cancelling Earbuds",
		id: "4d7857ce-fb31-44e4-aa1b-861eb30a138e",
	},
	{
		updatedAt: "2024-03-13 06:30:20",
		createdAt: "2024-03-13 06:30:20",
		writerId: "c5aa7916-4d47-47b3-b061-97ed4c8b2d25",
		categoryId: "a4029d56-a853-4d2d-abf6-9748862f5447",
		favoriteCount: 10,
		reviewCount: 43,
		rating: 4.53,
		image: "/images/sample.png",
		name: "Sustainable Bamboo Sunglasses",
		id: "a11ee8fb-015b-4018-8fcc-8c2dd3dae57e",
	},
	{
		updatedAt: "2024-03-13 06:30:20",
		createdAt: "2024-03-13 06:30:20",
		writerId: "7acf32ea-01e7-4b38-88f7-d10b7a69378d",
		categoryId: "483f1f74-35c7-43d2-afa4-66b2f3c7bb06",
		favoriteCount: 27,
		reviewCount: 48,
		rating: 2.42,
		image: "/images/sample.png",
		name: "Ergonomic Office Chair",
		id: "2c73e26a-4f65-4e8e-b51f-c7830982a2df",
	},
	{
		updatedAt: "2024-03-13 06:30:20",
		createdAt: "2024-03-13 06:30:20",
		writerId: "8c9e14f6-4cc0-43bf-9956-31e2cc9df010",
		categoryId: "1af8057a-6fb7-4e56-99f6-67cd8b25b2c7",
		favoriteCount: 53,
		reviewCount: 46,
		rating: 1.47,
		image: "/images/sample.png",
		name: "Compact Camping Tent",
		id: "cf7e82bc-253e-4412-8964-838e3b622084",
	},
	{
		updatedAt: "2024-03-13 06:30:20",
		createdAt: "2024-03-13 06:30:20",
		writerId: "2797731b-acba-45a9-ac5b-555a2c042818",
		categoryId: "52aec8f5-fd56-4fbe-ad89-73240efe02f5",
		favoriteCount: 81,
		reviewCount: 32,
		rating: 2.77,
		image: "/images/sample.png",
		name: "High-Speed USB Flash Drive",
		id: "23344369-17f8-4dcf-835c-7681559e603a",
	},
];

type ProductFilter = {
	id: number;
	name: string;
	// func: () => void;
};

export default function FilteredProductList() {
	const [currentFilter, setFilter] = useState<ProductFilter>(productsFilter[0]);
	const [isLarge, setIsLarge] = useState(false);
	const currentWidth = useWindowWidth();

	const handleSelectFilter = (filter: ProductFilter) => {
		setFilter(filter);
	};

	useEffect(() => {
		setIsLarge(currentWidth >= BREAK_POINT.lg);
	}, [currentWidth]);

	return (
		<section className="flex flex-col gap-[3rem]">
			<h2 className="sr-only">{currentFilter.name}</h2>
			{isLarge ? (
				<ul className="flex gap-[4rem]">
					{productsFilter.map((filter) => (
						<li key={filter.id}>
							<button onClick={() => handleSelectFilter(filter)}>
								<span
									className={cn(
										"text-[2rem] text-gray-200",
										filter.id === currentFilter.id &&
											"font-semibold text-white",
									)}
								>
									{filter.name}
								</span>
							</button>
						</li>
					))}
				</ul>
			) : (
				<Dropdown
					items={productsFilter}
					defaultItem={productsFilter[0]}
					onSelect={handleSelectFilter}
					className="w-[15rem]"
				>
					<Dropdown.Button
						variant={"small"}
						className="text-[1.8rem] font-semibold text-white lg:text-[2rem]"
					/>
					<Dropdown.List />
				</Dropdown>
			)}
			<div className="grid grid-cols-2 gap-[1.5rem] lg:grid-cols-3 lg:gap-[2rem]">
				{products.map((product) => (
					<ProductCard
						key={product.id}
						imageData={product.image}
						likeCount={product.favoriteCount}
						productName={product.name}
						rate={product.rating}
						reviewCount={product.reviewCount}
					/>
				))}
			</div>
		</section>
	);
}
