import clsx from "clsx";
import Link from "next/link";
import { LegacyRef, RefObject, useEffect, useState } from "react";
import { forwardRef } from "react";

import CategoryFilterButton from "@/components/common/categoryFilterButton/CategoryFilter";
import ProductCard from "@/components/common/productcard/ProductCard";
import SortDropdown from "@/components/home/SortDropdown";
import { BREAK_POINT } from "@/constants/breakPoint";
import useWindowWidth from "@/hooks/common/useWindowWidth";
import { GetProductsParams, Order, ProductsResponse } from "@/types/product";

type ProductListType = {
	type: "rating" | "review" | "category" | "search";
	selectedCategoryName?: string | null;
	handleSelectOrder?: (order: Order) => void;
	params?: GetProductsParams;
	products?: ProductsResponse;
};

const ProductList = forwardRef<HTMLDivElement, ProductListType>(
	function ProductList(
		{
			type,
			selectedCategoryName,
			handleSelectOrder,
			params,
			products,
		}: ProductListType,
		ref,
	) {
		const currentWidth = useWindowWidth();
		const [isWrapPoint, setIsWrapPoint] = useState(false);

		const searchKeyword = params?.keyword;

		useEffect(() => {
			setIsWrapPoint(BREAK_POINT.md < currentWidth && currentWidth < 1787);
		}, [currentWidth]);

		return (
			<div className="flex w-[100%] flex-col gap-[3rem] text-[2rem] font-semibold text-white md:max-w-[63rem] lg:mt-[6rem] lg:max-w-[95rem] lg:text-[2.4rem]">
				<div
					className={clsx(
						"ml-[2rem] md:ml-[4rem] lg:m-0",
						type === "category" ? "flex flex-row justify-between" : "",
					)}
				>
					{type === "review"
						? "지금 핫한 상품"
						: type === "rating"
							? "별점이 높은 상품"
							: ""}
					{type === "review" ? (
						<span className="text-main-gradient ml-[1rem]">TOP 6</span>
					) : (
						""
					)}
					{type === "category" ? (
						<div className="flex w-[100%] flex-col items-center justify-between md:flex-row">
							<div>
								{searchKeyword
									? `${selectedCategoryName}의 '${searchKeyword}'로 검색한 상품`
									: `${selectedCategoryName}의 모든 상품`}
							</div>
							<div className="mt-[3rem] flex h-fit w-[100%] flex-row items-center justify-between md:m-0 md:w-fit">
								<CategoryFilterButton category={selectedCategoryName} />
								<SortDropdown onSelect={handleSelectOrder} />
							</div>
						</div>
					) : (
						""
					)}
					{type === "search" ? (
						<div className="flex w-[100%] flex-col justify-between md:flex-row">
							<div>{`'${searchKeyword}'로 검색한 상품`}</div>
							<div className="mt-[3rem] flex h-fit w-[100%] flex-row justify-between md:m-0 md:w-fit">
								<CategoryFilterButton category={selectedCategoryName} />
								<SortDropdown onSelect={handleSelectOrder} />
							</div>
						</div>
					) : (
						""
					)}
				</div>
				<div
					className={clsx(
						"ml-[2rem] grid max-w-[33rem] grid-cols-2 gap-[1.5rem] md:ml-[4rem] md:max-w-[55rem]",
						isWrapPoint
							? "lg:m-0 lg:min-w-[53rem]"
							: "lg:m-0 lg:min-w-[95rem] lg:grid-cols-3 lg:gap-[2rem]",
					)}
				>
					{products &&
						products.list.map((product) => (
							<Link
								href={`/productdetail/${product.id}`}
								key={product.id}
								className="hover:rounded-[1.2rem] hover:border-[0.01rem] hover:border-main_blue md:max-w-[24.7rem] lg:max-w-[30rem]"
							>
								<ProductCard
									productName={product.name}
									imageData={product.image}
									reviewCount={product.reviewCount}
									likeCount={product.favoriteCount}
									rate={product.rating}
								/>
							</Link>
						))}
					<div ref={ref}></div>
				</div>
				{products && products.list.length === 0 && (
					<div className="mt-[20rem] text-center text-5xl text-gray-400">
						상품 준비 중
						<p className="mt-[5rem] text-3xl">
							더 나은 구성을 위해 상품 준비 중입니다.
							<br />
							조금만 기다려주세요!
						</p>
					</div>
				)}
			</div>
		);
	},
);

export default ProductList;
