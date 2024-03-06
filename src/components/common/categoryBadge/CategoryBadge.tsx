import { cva, type VariantProps } from "class-variance-authority";
import React from "react";

import cn from "@/utils/cn";

const categoryBadgeVariants = cva("_flex-center gap-4 ", {
	variants: {
		size: {
			small:
				"rounded-[0.6rem] px-[0.8rem] py-[0.4rem] text-center text-[1.2rem]",
			large:
				"rounded-[0.8rem] px-[1rem] py-[0.4rem] text-center text-[1.8rem] font-medium",
			smallToLarge:
				"rounded-[0.6rem] px-[0.8rem] py-[0.4rem] text-center text-[1.2rem] lg:rounded-[0.8rem] lg:px-[1rem] lg:py-[0.4rem] lg:text-center lg:text-[1.8rem] lg:font-medium",
		},
		category: {
			음악: "bg-tags-music/10 text-tags-music",
			"영화/드라마": "bg-tags-movie/10 text-tags-movie",
			"강의/책": "bg-tags-book/10 text-tags-book",
			호텔: "bg-tags-hotel/10 text-tags-hotel",
			"가구/인테리어": "bg-tags-interior/10 text-tags-interior",
			식당: "bg-tags-restaurant/10 text-tags-restaurant",
			전자기기: "bg-tags-electronics/10 text-tags-electronics",
			화장품: "bg-tags-cosmetics/10 text-tags-cosmetics",
			"의류/잡화": "bg-tags-clothes/10 text-tags-clothes",
			앱: "bg-tags-app/10 text-tags-app",
		},
	},
});

type Props = React.HTMLAttributes<HTMLDivElement> &
	VariantProps<typeof categoryBadgeVariants> & {
		size: "small" | "large" | "smallToLarge";
		category:
			| "음악"
			| "영화/드라마"
			| "강의/책"
			| "호텔"
			| "가구/인테리어"
			| "식당"
			| "전자기기"
			| "화장품"
			| "의류/잡화"
			| "앱";
	};

export default function CategoryBadge({ size, category }: Props) {
	return (
		<div className={cn(categoryBadgeVariants({ size, category }))}>
			{category}
		</div>
	);
}
