import { cva, type VariantProps } from "class-variance-authority";
import Image from "next/image";
import React from "react";

import cn from "@/utils/cn";

const thumbsVariants = cva(
	"_flex-center gap-2 rounded-[10rem] border border-solid border-black-border bg-black-bg px-[1rem] py-[0.6rem] text-[1.2rem] hover:bg-black-100 lg:px-[1.2rem] lg:text-[1.4rem]",
	{
		variants: {
			isLiked: {
				true: "text-pink",
				false: "text-gray-100",
			},
		},
	},
);

type Props = React.HTMLAttributes<HTMLButtonElement> &
	VariantProps<typeof thumbsVariants> & {
		isLiked: boolean;
		likeCount: number;
		handleButtonClick: () => void;
	};

export default function Thumbs({
	isLiked,
	likeCount,
	handleButtonClick,
}: Props) {
	const iconSrc = isLiked ? "/icons/like_on.svg" : "/icons/like_off.svg";

	return (
		<button
			className={cn(thumbsVariants({ isLiked }))}
			onClick={handleButtonClick}
		>
			<div className="relative size-[1.4rem] overflow-hidden lg:size-[1.8rem]">
				<Image src={iconSrc} alt="좋아요" fill />
			</div>
			{likeCount}
		</button>
	);
}
