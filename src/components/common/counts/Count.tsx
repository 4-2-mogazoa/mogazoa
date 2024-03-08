import { cva, type VariantProps } from "class-variance-authority";
import React from "react";

import cn from "@/utils/cn";

const countVariants = cva("_flex-center gap-2 font-light text-gray-200", {
	variants: {
		size: {
			small: "text-[1rem] lg:text-[1.2rem]",
			medium: "text-[1.2rem] md:text-[1.4rem] lg:text-[1.6rem]",
			large: "text-[1.4rem] lg:text-[1.6rem]",
		},
	},
});

type Props = React.HTMLAttributes<HTMLDivElement> &
	VariantProps<typeof countVariants> & {
		size: "large" | "medium" | "small";
		text: "리뷰" | "찜" | "팔로워" | "조회";
		count: number;
	};

export default function Count({ size, text, count }: Props) {
	const displayCount = Number(count).toLocaleString();

	return (
		<div className={cn(countVariants({ size }))}>
			{text}
			<span>{displayCount}</span>
		</div>
	);
}
