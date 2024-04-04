import clsx from "clsx";
import Link from "next/link";
import { useEffect, useState } from "react";

import {
	getCategoryProducts,
	getPoPularProducts,
	getRatedProducts,
	getSearchedProducts,
} from "@/apis/products";
import CategoryFilterButton from "@/components/common/categoryFilterButton/CategoryFilter";
import ProductCard from "@/components/common/productcard/ProductCard";
import SortDropdown from "@/components/home/SortDropdown";
import { BREAK_POINT } from "@/constants/breakPoint";
import useWindowWidth from "@/hooks/common/useWindowWidth";
import { Product } from "@/types/product";

type ProductListType = {
	type: "rating" | "review" | "category" | "search";
	selectedCategoryId?: number | null;
	selectedCategoryName?: string | null;
	searchKeyword?: string;
};

export default function ProductList({
	type,
	selectedCategoryId,
	selectedCategoryName,
	searchKeyword,
}: ProductListType) {
	const currentWidth = useWindowWidth();
	const [isWrapPoint, setIsWrapPoint] = useState(false);
	const [products, setProducts] = useState<Product[]>([]);
	const [popularProducts, setPopularProducts] = useState<Product[]>([]);
	const [ratedProducts, setRatedProducts] = useState<Product[]>([]);
	const [searchProducts, setSearchProducts] = useState<Product[]>([]);
	const [categoryProducts, setCategoryProducts] = useState<Product[]>([]);

	const productsToShow =
		type === "review"
			? popularProducts
			: type === "rating"
				? ratedProducts
				: type === "category"
					? categoryProducts
					: type === "search"
						? searchProducts
						: [];

	const getMainProducts = async () => {
		if (type === "review") {
			try {
				const data = await getPoPularProducts();
				setPopularProducts(data);
			} catch (error) {
				alert("상품 목록을 불러오는 데 실패하였습니다. :" + error);
			}
		} else if (type === "rating") {
			try {
				const data = await getRatedProducts();
				setRatedProducts(data);
			} catch (error) {
				alert("상품 목록을 불러오는 데 실패하였습니다. :" + error);
			}
		}
	};

	useEffect(() => {
		getMainProducts();
	});

	const getSearchProducts = async () => {
		if (searchKeyword) {
			const data = await getSearchedProducts(searchKeyword);
			setSearchProducts(data);
		}
	};

	useEffect(() => {
		getSearchProducts();
	}, [searchKeyword]);

	const getCategoryProduct = async () => {
		if (selectedCategoryId) {
			const data = await getCategoryProducts(selectedCategoryId);
			setCategoryProducts(data);
		}
	};

	useEffect(() => {
		getCategoryProduct();
	}, [selectedCategoryId]);

	useEffect(() => {
		setIsWrapPoint(BREAK_POINT.md < currentWidth && currentWidth < 1787);
	}, [currentWidth]);

	const [sortOption, setSortOption] = useState(() => {
		switch (type) {
			case "rating":
				return "rating";
			case "review":
				return "review";
			case "category":
				return "category";
			case "search":
				return "search";
		}
	});

	const sortProducts = (products: any[]) => {
		const compareByValueOrDate = (a: any, b: any, valueKey: string) => {
			if (a[valueKey] !== b[valueKey]) {
				return b[valueKey] - a[valueKey];
			} else {
				return (
					new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
				);
			}
		};
		const compareByDate = (a: any, b: any, valueKey: string) => {
			const dateComparison =
				new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
			if (dateComparison !== 0) {
				return dateComparison;
			} else {
				return b[valueKey] - a[valueKey];
			}
		};

		switch (type) {
			case "rating":
				return products.sort((a, b) => compareByValueOrDate(a, b, "rating"));
			case "review":
				return products.sort((a, b) =>
					compareByValueOrDate(a, b, "reviewCount"),
				);
			case "category":
				switch (sortOption) {
					case "최신순":
						return products.sort((a, b) => compareByDate(a, b, "rating"));
					case "별점 높은순":
						return products.sort((a, b) =>
							compareByValueOrDate(a, b, "rating"),
						);
					case "좋아요순":
						return products.sort((a, b) =>
							compareByValueOrDate(a, b, "favoriteCount"),
						);
					default:
						return products.sort((a, b) => compareByDate(a, b, "rating"));
				}
			case "search":
				switch (sortOption) {
					case "최신순":
						return products.sort((a, b) => compareByDate(a, b, "rating"));
					case "별점 높은순":
						return products.sort((a, b) =>
							compareByValueOrDate(a, b, "rating"),
						);
					case "좋아요순":
						return products.sort((a, b) =>
							compareByValueOrDate(a, b, "favoriteCount"),
						);
					default:
						return products.sort((a, b) => compareByDate(a, b, "rating"));
				}
		}
	};

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
					<div className="flex w-[100%] flex-col justify-between md:flex-row">
						<div>
							{searchKeyword
								? `${selectedCategoryName}의 '${searchKeyword}'로 검색한 상품`
								: `${selectedCategoryName}의 모든 상품`}
						</div>
						<div className="mt-[3rem] flex h-fit w-[100%] flex-row justify-between md:m-0 md:w-fit">
							<CategoryFilterButton category={selectedCategoryName} />
							<SortDropdown onSelect={(option) => setSortOption(option)} />
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
							<SortDropdown onSelect={(option) => setSortOption(option)} />
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
				{productsToShow.map((product) => (
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
			</div>
			{popularProducts.length === 0 ||
				ratedProducts.length === 0 ||
				searchProducts.length === 0 ||
				(categoryProducts.length === 0 && (
					<div className="mt-[20rem] text-center text-5xl text-gray-400">
						상품 준비 중
						<p className="mt-[5rem] text-3xl">
							더 나은 구성을 위해 상품 준비 중입니다.
							<br />
							조금만 기다려주세요!
						</p>
					</div>
				))}
		</div>
	);
}
