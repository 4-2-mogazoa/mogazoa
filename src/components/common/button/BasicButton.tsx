import { cva, VariantProps } from "class-variance-authority";
import clsx from "clsx";
import { ButtonHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

type Props = ButtonHTMLAttributes<HTMLButtonElement> &
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

export default function BasicButton({
	label,
	variant = "primary",
	className,
	disabled,
	...props
}: Props) {
	return (
		<button
			className={twMerge(buttonVariants({ variant }), className)}
			disabled={disabled}
			{...props}
		>
			<span
				className={clsx(
					variant === "secondary" && !disabled && "text-main-gradient",
				)}
			>
				{label}
			</span>
		</button>
	);
}
