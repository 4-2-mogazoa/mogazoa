import { cva, type VariantProps } from "class-variance-authority";
import React from "react";

import cn from "@/utils/cn";

const rankingVariants = cva(
	"_flex-center gap-4 rounded-[5rem] px-[0.6rem] py-[0.2rem] text-center text-base lg:px-[0.8rem] lg:text-[1.2rem]",
	{
		variants: {
			rank: {
				1: "bg-pink/10 text-pink",
				2: "bg-green/10 text-green",
				3: "bg-gray-100/10 text-gray-100",
				4: "bg-gray-100/10 text-gray-100",
				5: "bg-gray-100/10 text-gray-100",
			},
		},
	},
);

type Props = React.HTMLAttributes<HTMLDivElement> &
	VariantProps<typeof rankingVariants> & {
		rank: 1 | 2 | 3 | 4 | 5;
	};

export default function Ranking({ rank }: Props) {
	return <div className={cn(rankingVariants({ rank }))}>{rank}등</div>;
}
