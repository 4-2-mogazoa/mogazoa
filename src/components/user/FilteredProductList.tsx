import { useInfiniteQuery } from "@tanstack/react-query";
import { Fragment, useEffect, useState } from "react";

import { getUserProducts } from "@/apis/user";
import Dropdown from "@/components/common/dropdown/Dropdown";
import ProductCard from "@/components/common/productcard/ProductCard";
import { BREAK_POINT } from "@/constants/breakPoint";
import useWindowWidth from "@/hooks/common/useWindowWidth";
import { UserProductType } from "@/types/product";
import { UserDetail } from "@/types/user";
import cn from "@/utils/cn";

const productsFilter: ProductFilter[] = [
	{
		id: 0,
		name: "리뷰 남긴 상품",
		type: "reviewed-products",
	},
	{
		id: 1,
		name: "등록한 상품",
		type: "created-products",
	},
	{
		id: 2,
		name: "찜한 상품",
		type: "favorite-products",
	},
];

type ProductFilter = {
	id: number;
	name: string;
	type: UserProductType;
};

export default function FilteredProductList({ user }: { user: UserDetail }) {
	const [currentFilter, setFilter] = useState<ProductFilter>(productsFilter[0]);
	const [isLarge, setIsLarge] = useState(false);
	const currentWidth = useWindowWidth();

	const { data } = useInfiniteQuery({
		queryKey: ["products", user?.id, currentFilter.type],
		queryFn: ({ pageParam }) =>
			getUserProducts(user.id, currentFilter.type, pageParam),
		initialPageParam: 0,
		getNextPageParam: (lastPage) => lastPage.nextCursor,
	});

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
				{data?.pages.map((group, i) => (
					<Fragment key={i}>
						{group.list.map((product) => (
							<ProductCard
								key={product.id}
								imageData={product.image}
								likeCount={product.favoriteCount}
								productName={product.name}
								rate={product.rating}
								reviewCount={product.reviewCount}
							/>
						))}
					</Fragment>
				))}
			</div>
		</section>
	);
}
