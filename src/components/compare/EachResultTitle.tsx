import { ProductDetail } from "@/types/product";

type Props = {
	product: ProductDetail;
};

export default function EachResultTitle({ product }: Props) {
	const { name, description } = product;

	return (
		<div className="_flex-col-center gap-3">
			<p className="text-center text-[1.8rem] text-white lg:text-[2.4rem]">
				{name}
			</p>
			<p className="_text-overflow text-[1.2rem] text-gray-100 lg:text-[1.4rem]">
				{description}
			</p>
		</div>
	);
}
