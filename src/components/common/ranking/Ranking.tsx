import { cva, type VariantProps } from "class-variance-authority";
import React from "react";

import cn from "@/utils/cn";

const rankingVariants = cva(
	"_flex-center w-fit gap-4 rounded-[5rem] px-[0.6rem] py-[0.2rem] text-center text-base lg:px-[0.8rem] lg:text-[1.2rem]",
	{
		variants: {
			variant: {
				default: "bg-gray-100/10 text-gray-100",
				1: "bg-pink/10 text-pink",
				2: "bg-green/10 text-green",
			},
		},
		defaultVariants: {
			variant: "default",
		},
	},
);

type Props = React.HTMLAttributes<HTMLDivElement> &
	VariantProps<typeof rankingVariants> & {
		rank: number;
	};

export default function Ranking({ rank }: Props) {
	const variant = rank === 1 || rank === 2 ? rank : "default";

	return <div className={cn(rankingVariants({ variant }))}>{rank}등</div>;
}
