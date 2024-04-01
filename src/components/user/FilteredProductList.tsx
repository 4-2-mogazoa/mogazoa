import { useInfiniteQuery } from "@tanstack/react-query";
import { useState } from "react";

import { getUserProducts } from "@/apis/user";
import { UserDetail } from "@/types/user";

import FilteredProductListFilter, {
	ProductFilter,
	productsFilter,
} from "./FilteredProductListFilter";
import FilteredProductListProducts from "./FilteredProductListProducts";
import Loading from "./Loading";
import NoProducts from "./NoProducts";

export default function FilteredProductList({ user }: { user: UserDetail }) {
	const [currentFilter, setFilter] = useState<ProductFilter>(productsFilter[0]);

	const { data, fetchNextPage, hasNextPage, isFetching, isLoading } =
		useInfiniteQuery({
			queryKey: ["products", user?.id, currentFilter.type],
			queryFn: ({ pageParam }) =>
				getUserProducts(user.id, currentFilter.type, pageParam),
			initialPageParam: 0,
			getNextPageParam: (lastPage) => lastPage.nextCursor,
			staleTime: 60 * 1000 * 2,
		});

	return (
		<section className="flex flex-col gap-[3rem]">
			<h2 className="sr-only">{currentFilter.name}</h2>
			<FilteredProductListFilter
				currentFilter={currentFilter}
				setFilter={setFilter}
			/>
			{isLoading && <Loading />}
			{!isLoading && !data?.pages[0].list.length ? (
				<NoProducts />
			) : (
				<FilteredProductListProducts
					data={data}
					fetchNextPage={fetchNextPage}
					hasNextPage={hasNextPage}
					isFetching={isFetching}
				/>
			)}
		</section>
	);
}
