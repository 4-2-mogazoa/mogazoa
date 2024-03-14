import Image from "next/image";

import Counts from "@/components/common/counts/Counts";

type Props = {
	productName: string;
	imageData: string;
	reviewCount: number;
	likeCount: number;
	rate: number;
};

export default function ProductCard({
	productName,
	imageData,
	reviewCount,
	likeCount,
	rate,
}: Props) {
	const starIconSrc = "/icons/star.svg";
	return (
		<div className="flex max-h-[18.3rem] max-w-[16rem] grow flex-col rounded-[1.2rem] border border-black-border bg-black-bg md:max-h-[25.6rem] md:max-w-[24.7rem] lg:max-h-[30.8rem] lg:max-w-[30rem]">
			<div className="relative h-[14rem] max-w-[14rem] md:h-[22.7rem] md:max-w-[22.7rem] lg:h-[18.4rem] lg:max-w-[28.4rem]">
				<Image
					src={imageData}
					alt={productName}
					className="object-contain"
					fill
				/>
			</div>
			<div className=" p-[1rem] md:px-[1.647rem] md:py-[2rem] lg:px-[2rem] lg:py-[2.5rem]">
				<div className="truncate text-[1.4rem] text-white md:text-[1.6rem] lg:text-[1.8rem]">
					{productName}
				</div>
				<div className="flex flex-col justify-between md:flex-row lg:flex-row">
					<Counts>
						<Counts.Count size="large" text="리뷰" count={reviewCount} />
						<Counts.Count size="large" text="찜" count={likeCount} />
					</Counts>
					<div className="flex items-center">
						<div className="relative mr-[0.2rem] size-[1.2rem] md:size-[1.5rem] lg:size-[1.6rem]">
							<Image
								src={starIconSrc}
								alt="별점"
								className="object-cover"
								fill
							/>
						</div>
						<div className="text-[1.2rem] text-gray-100 md:text-[1.4rem] lg:text-[1.6rem]">
							{rate}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
