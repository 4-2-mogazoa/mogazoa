import { ProductDetail } from "@/types/product";

import CategoryBadge from "../common/categoryBadge/CategoryBadge";

type Props = {
	product: ProductDetail;
};

export default function EachResultTitle({ product }: Props) {
	const {
		name,
		description,
		category: { name: categoryName },
	} = product;

	return (
		<div className="_flex-col-center mt-2 gap-3">
			<CategoryBadge size="small" category={categoryName} />
			<p className="text-center text-[1.8rem] text-white lg:text-[2.4rem]">
				{name}
			</p>
			<p className="_text-overflow text-[1.2rem] text-gray-100 lg:text-[1.4rem]">
				{description}
			</p>
		</div>
	);
}
