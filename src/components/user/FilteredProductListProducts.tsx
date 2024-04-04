import {
	FetchNextPageOptions,
	InfiniteData,
	InfiniteQueryObserverResult,
} from "@tanstack/react-query";
import Link from "next/link";
import { Fragment } from "react";

import ProductCard from "@/components/common/productcard/ProductCard";
import { useIntersect } from "@/hooks/common/useIntersect";
import { ProductsResponse } from "@/types/product";

type Props = {
	data: InfiniteData<ProductsResponse, unknown> | undefined;
	fetchNextPage: (
		options?: FetchNextPageOptions | undefined,
	) => Promise<
		InfiniteQueryObserverResult<InfiniteData<ProductsResponse, unknown>, Error>
	>;
	hasNextPage: boolean;
	isFetching: boolean;
};

export default function FilteredProductListProducts({
	data,
	fetchNextPage,
	hasNextPage,
	isFetching,
}: Props) {
	const intersectRef = useIntersect(
		async (entry, observer) => {
			observer.unobserve(entry.target);
			if (hasNextPage && !isFetching) {
				fetchNextPage();
			}
		},
		{ rootMargin: "200px" },
	);

	return (
		<div className="grid grid-cols-2 gap-[1.5rem] lg:grid-cols-3 lg:gap-[2rem]">
			{data?.pages.map((group, i) => (
				<Fragment key={i}>
					{group.list.map((product, idx, arr) => {
						const isLastItem = idx === arr.length - 1;
						return (
							<Link key={product.id} href={`/productdetail/${product.id}`}>
								<ProductCard
									ref={isLastItem ? intersectRef : null}
									imageData={product.image}
									likeCount={product.favoriteCount}
									productName={product.name}
									rate={product.rating}
									reviewCount={product.reviewCount}
								/>
							</Link>
						);
					})}
				</Fragment>
			))}
		</div>
	);
}
