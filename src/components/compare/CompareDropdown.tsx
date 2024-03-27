import clsx from "clsx";
import { RefObject, useEffect, useRef } from "react";

import { ProductsResponse } from "@/types/product";
import getDataByScroll from "@/utils/getDataByScroll";

type Props = {
	focusIndex: number;
	productList?: ProductsResponse;
	dropdownRef: RefObject<HTMLDivElement>;
	handleAddProduct: (id: number, name: string) => void;
	handleLoadMoreProducts: (nextCursor: number) => void;
};

// TODO: 무한 스크롤 테스트
export default function CompareDropdown({
	focusIndex,
	productList,
	dropdownRef,
	handleAddProduct,
	handleLoadMoreProducts,
}: Props) {
	const scrollRef = useRef<HTMLUListElement>(null);

	const nextCursor = productList?.nextCursor;

	useEffect(() => {
		if (scrollRef.current) {
			scrollRef.current.addEventListener("scroll", handleScroll);
		}

		return () => {
			if (scrollRef.current) {
				scrollRef.current.removeEventListener("scroll", handleScroll);
			}
		};
	}, [nextCursor]);

	const handleScroll = () =>
		getDataByScroll(scrollRef, nextCursor, handleLoadMoreProducts, 10);

	return (
		<div ref={dropdownRef}>
			<ul
				ref={scrollRef}
				className="_scrollbar absolute left-0 top-full z-10 mt-2 flex h-[16.3rem] w-full flex-col gap-2 rounded-[0.8rem] border border-solid border-black-border bg-black-bg p-[1rem] lg:h-[17.1rem]"
			>
				{productList?.list.map(({ id, name }, index) => (
					<li key={id}>
						<button
							className={clsx(
								"w-full rounded-[0.6rem] px-[2rem] py-[0.6rem] text-start text-[1.4rem] leading-[2rem] text-gray-200 hover:bg-black-border hover:text-white focus:bg-black-border focus:text-white focus:outline-none lg:text-[1.6rem] lg:leading-[2.2rem]",
								focusIndex === index && "bg-black-border text-white",
							)}
							onClick={() => handleAddProduct(id, name)}
							type="button"
						>
							{name}
						</button>
					</li>
				))}
			</ul>
		</div>
	);
}
