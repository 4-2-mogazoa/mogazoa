import { cva, VariantProps } from "class-variance-authority";
import { HTMLMotionProps, motion } from "framer-motion";
import { ButtonHTMLAttributes, forwardRef } from "react";

import cn from "@/utils/cn";

type Props = HTMLMotionProps<"button"> &
	ButtonHTMLAttributes<HTMLButtonElement> &
	VariantProps<typeof buttonVariants> & {
		label: string;
		className?: string;
	};

const buttonVariants = cva(
	"w-full rounded-[0.8rem] py-[1.3rem] text-[1.6rem] font-semibold disabled:text-gray-200 md:py-[1.55rem] md:text-[1.6rem] lg:py-[1.9rem] lg:text-[1.8rem]",
	{
		variants: {
			variant: {
				primary:
					"bg-main-gradient text-white disabled:bg-[#353542] disabled:bg-none",
				secondary: "outline outline-main_blue disabled:outline-[#353542]",
				tertiary:
					"text-gray-100 outline outline-gray-100 disabled:outline-[#353542]",
			},
		},
		defaultVariants: {
			variant: "primary",
		},
	},
);

const BasicButton = forwardRef<HTMLButtonElement, Props>(function BasicButton(
	{ label, variant = "primary", className, disabled, ...props }: Props,
	ref,
) {
	return (
		<motion.button
			className={cn(buttonVariants({ variant }), className)}
			disabled={disabled}
			ref={ref}
			whileHover={{ scale: 0.95, opacity: 0.8 }}
			whileTap={{ scale: 0.95, opacity: 0.8 }}
			{...props}
		>
			<span
				className={cn(
					variant === "secondary" && !disabled && "text-main-gradient",
				)}
			>
				{label}
			</span>
		</motion.button>
	);
});

export default BasicButton;
