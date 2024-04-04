import clsx from "clsx";

import { ResultOfComparison } from "@/types/compare";
import { ProductDetail } from "@/types/product";

type Props = {
	property: "rating" | "reviewCount" | "favoriteCount";
	product: ProductDetail;
	winningProductIdForEachProperty: ResultOfComparison;
	color: "green" | "pink";
};

export default function EachResult({
	property,
	product,
	winningProductIdForEachProperty,
	color,
}: Props) {
	const displayData = parseFloat(product[property].toFixed(1));

	const isWinner = winningProductIdForEachProperty[property] === product.id;

	const winBadgeClassName = isWinner
		? `text-${color} bg-${color} opacity-75`
		: `text-transparent`;

	return (
		<div className="_flex-col-center gap-1 text-[1.6rem] text-white lg:text-[2rem]">
			<span
				className={clsx(
					winBadgeClassName,
					"select-none rounded-2xl px-2 py-[0.1rem] text-[1.2rem] lg:text-[1.4rem]",
				)}
			>
				승리
			</span>

			{displayData}
		</div>
	);
}
