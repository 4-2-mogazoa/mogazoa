import Image from "next/image";

import Counts from "../counts/Counts";

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
	return (
		<div className="flex h-[18.3rem] w-[16rem] flex-col rounded-[1.2rem] border border-[#353542] bg-[#252530] md:h-[25.6rem] md:w-[24.7rem] lg:h-[30.8rem] lg:w-[30rem]">
			<div className="relative size-[14rem] md:size-[22.7rem] lg:size-[28.4rem]">
				<Image
					src={imageData}
					alt={productName}
					className="object-cover"
					fill
				/>
			</div>
			<div className=" p-[1rem] md:px-[1.647rem] md:py-[2rem] lg:px-[2rem] lg:py-[2.5rem]">
				<div className="text-[1.4rem] text-white md:text-[1.6rem] lg:text-[1.8rem]">
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
								src="./icons/star.svg"
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
