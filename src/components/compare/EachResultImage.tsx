import Image from "next/image";

import { ProductDetail } from "@/types/product";

type Props = {
	product: ProductDetail;
};

export default function EachResultImage({ product }: Props) {
	const { image: imageSrc, name } = product;
	return (
		<div className="relative size-48 overflow-hidden rounded-full sm:size-64 md:size-80 lg:size-96">
			<Image src={imageSrc} alt={name} fill className="absolute left-0 top-0" />
		</div>
	);
}
