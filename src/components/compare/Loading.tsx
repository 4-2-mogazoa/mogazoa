import Image from "next/image";

export default function Loading() {
	const iconSrc = "/icons/loading.svg";

	return (
		<div className="_flex-col-center gap-8">
			<div className="relative h-[3.2rem] w-[3.9rem] overflow-hidden">
				<Image
					src={iconSrc}
					alt="보여주고 있는 상품 데이터가 없음"
					fill
					className="absolute left-0 top-0"
				/>
			</div>
			<p className="text-[1.8rem] text-gray-200 lg:text-[2rem]">
				원하는 상품을 비교해 보세요.
			</p>
		</div>
	);
}
