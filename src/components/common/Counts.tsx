import { cva, type VariantProps } from "class-variance-authority";
import React from "react";

import { cn } from "../../utils/utils";
import Count from "./Count";

const countsVariants = cva("_flex-center gap-4", {
	variants: {
		gapBreakpoint: {
			tablet: "md:gap-6",
			pc: "xl:gap-6",
		},
	},
});

type Props = React.HTMLAttributes<HTMLDivElement> &
	VariantProps<typeof countsVariants> & {
		gapBreakpoint: "tablet" | "pc";
		children: React.ReactNode;
	};

export default function Counts({ gapBreakpoint, children }: Props) {
	return (
		<div className={cn(countsVariants({ gapBreakpoint }))}>{children}</div>
	);
}

Counts.Count = Count;
