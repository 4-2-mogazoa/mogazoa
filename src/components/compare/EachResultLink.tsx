import Image from "next/image";
import Link from "next/link";

import { ProductDetail } from "@/types/product";

type Props = {
	product: ProductDetail;
};

export default function EachResultLink({ product }: Props) {
	const { id } = product;

	return (
		<Link
			href={`productdetail/${id}`}
			className="_flex-center gap-1 p-3 text-[1.4rem] text-gray-100 hover:text-white"
		>
			<Image
				src="/icons/search.svg"
				alt="상품 상세 페이지로 이동"
				width={14}
				height={14}
			/>
			더 알아보기
		</Link>
	);
}
