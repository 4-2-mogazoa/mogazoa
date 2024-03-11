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
			responsive:
				"rounded-[0.6rem] px-[0.8rem] py-[0.4rem] text-center text-[1.2rem] lg:rounded-[0.8rem] lg:px-[1rem] lg:py-[0.4rem] lg:text-center lg:text-[1.8rem] lg:font-medium",
		},
		category: {
			음악: "bg-wildWillow/10 text-wildWillow",
			"영화/드라마": "bg-flamingo/10 text-flamingo",
			"강의/책": "bg-heliotrope/10 text-heliotrope",
			호텔: "bg-christi/10 text-christi",
			"가구/인테리어": "bg-orchid/10 text-orchid",
			식당: "bg-coral/10 text-coral",
			전자기기: "bg-jungleGreen/10 text-jungleGreen",
			화장품: "bg-brilliantRose/10 text-brilliantRose",
			"의류/잡화": "bg-mediumSlateBlue/10 text-mediumSlateBlue",
			앱: "bg-curiousBlue/10 text-curiousBlue",
		},
	},
});

type Props = React.HTMLAttributes<HTMLDivElement> &
	VariantProps<typeof categoryBadgeVariants> & {
		size: "small" | "large" | "responsive";
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
