import { cva, type VariantProps } from "class-variance-authority";
import React from "react";

import cn from "@/utils/cn";

import Count from "./Count";

const countsVariants = cva("_flex-center gap-4", {
	variants: {
		gapBreakpoint: {
			atTablet: "md:gap-6",
			atPc: "lg:gap-6",
		},
	},
});

type Props = React.HTMLAttributes<HTMLDivElement> &
	VariantProps<typeof countsVariants> & {
		gapBreakpoint: "atTablet" | "atPc";
		children: React.ReactNode;
	};

export default function Counts({ gapBreakpoint, children }: Props) {
	return (
		<div className={cn(countsVariants({ gapBreakpoint }))}>{children}</div>
	);
}

Counts.Count = Count;
