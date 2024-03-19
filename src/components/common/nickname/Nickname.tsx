import { cva, type VariantProps } from "class-variance-authority";
import React from "react";

import cn from "@/utils/cn";

/**
 * small - 유저 랭킹 컴포넌트
 * large - 팔로워 컴포넌트
 */
const nicknameVariants = cva("text-white", {
	variants: {
		size: {
			small: "text-[1.4rem] lg:text-[1.6rem]",
			large: "text-[1.6rem] font-medium lg:text-[1.8rem]",
		},
	},
});

type Props = React.HTMLAttributes<HTMLSpanElement> &
	VariantProps<typeof nicknameVariants> & {
		size: "small" | "large";
		nickname: string;
	};

export default function Nickname({ nickname, size }: Props) {
	return <span className={cn(nicknameVariants({ size }))}>{nickname}</span>;
}
