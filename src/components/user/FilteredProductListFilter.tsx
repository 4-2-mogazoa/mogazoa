import { Dispatch, SetStateAction, useEffect, useState } from "react";

import Dropdown from "@/components/common/dropdown/Dropdown";
import { BREAK_POINT } from "@/constants/breakPoint";
import useWindowWidth from "@/hooks/common/useWindowWidth";
import { UserProductType } from "@/types/product";
import cn from "@/utils/cn";

export const productsFilter: ProductFilter[] = [
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

export type ProductFilter = {
	id: number;
	name: string;
	type: UserProductType;
};

type Props = {
	currentFilter: ProductFilter;
	setFilter: Dispatch<SetStateAction<ProductFilter>>;
};

export default function FilteredProductListFilter({
	currentFilter,
	setFilter,
}: Props) {
	const [isLarge, setIsLarge] = useState(false);
	const currentWidth = useWindowWidth();

	const handleSelectFilter = (filter: ProductFilter) => {
		setFilter(filter);
	};

	useEffect(() => {
		setIsLarge(currentWidth >= BREAK_POINT.lg);
	}, [currentWidth]);

	return isLarge ? (
		<ul className="flex gap-[4rem]">
			{productsFilter.map((filter) => (
				<li key={filter.id}>
					<button onClick={() => handleSelectFilter(filter)}>
						<span
							className={cn(
								"text-[2rem] text-gray-200",
								filter.id === currentFilter.id && "font-semibold text-white",
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
	);
}
