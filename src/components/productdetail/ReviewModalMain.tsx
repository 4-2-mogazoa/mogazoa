import Image from "next/image";
import { useState } from "react";

import { starRate } from "@/constants/starRate";

import BasicButton from "../common/button/BasicButton";
import CategoryBadge from "../common/categoryBadge/CategoryBadge";
import AddImageBox from "../common/inputs/AddImageBox";
import TextBox from "../common/inputs/TextBox";
import { productDetailData } from "./MockData";

type Props = {
	type: "create" | "modify";
};

export default function ReviewModal({ type }: Props) {
	const [rating, setRating] = useState(0);
	const [hover, setHover] = useState(0);
	const buttonLabel = type === "create" ? "작성하기" : "수정하기";
	const { rateArray, starOnIconSrc, starOffIconSrc } = starRate;

	return (
		<div className="flex flex-col gap-[2rem] px-[2rem] pb-[2rem] pt-[4rem] md:gap-[4rem] md:px-[4rem] md:pb-[5.023rem] lg:pb-[4rem] lg:pt-[6rem]">
			<div className="flex flex-col gap-[1rem]">
				<CategoryBadge
					size="small"
					category={productDetailData.category.name}
				/>
				<div className="text-[2rem] font-semibold text-white lg:text-[2.4rem]">
					{productDetailData.name}
				</div>
			</div>
			<div className="flex flex-col gap-[1rem] md:gap-[1.5rem] lg:gap-[2rem]">
				<div className=" flex items-center gap-[1.5rem] lg:gap-[2rem]">
					<span className="text-[1.4rem] text-gray-200 lg:text-[1.6rem]">
						별점
					</span>
					<div className="flex gap-[0.2rem] lg:gap-[0.5rem]">
						{rateArray.map((rate, index) => (
							<button
								key={index}
								onMouseEnter={() => setHover(rate)}
								onMouseLeave={() => setHover(0)}
								onClick={() => setRating(rate)}
							>
								<div className="relative size-[2.8rem] md:size-[3.2rem] ">
									<Image
										alt="star_rate"
										src={
											rate <= (hover || rating) ? starOnIconSrc : starOffIconSrc
										}
										fill
										className=" object-cover"
									/>
								</div>
							</button>
						))}
					</div>
				</div>
				<TextBox />
				<AddImageBox />
			</div>
			<BasicButton variant="primary" label={buttonLabel} />
		</div>
	);
}
