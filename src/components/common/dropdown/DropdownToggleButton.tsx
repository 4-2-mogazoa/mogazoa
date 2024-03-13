import { cva, VariantProps } from "class-variance-authority";
import { motion } from "framer-motion";
import Image from "next/image";
import { ButtonHTMLAttributes, useContext, useEffect } from "react";

import cn from "@/utils/cn";

import { DropdownContext } from "./Dropdown";

type DropdownButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
	VariantProps<typeof dropdownButtonVariants> & {
		placeholder?: string;
		className?: string;
	};

const dropdownButtonVariants = cva(
	"flex w-full items-center justify-between rounded-[0.8rem] text-[1.4rem] text-gray-200 lg:text-[1.6rem]",
	{
		variants: {
			variant: {
				basic:
					"bg-[#252530] px-[2rem] py-[1.25rem] outline outline-[#353542] md:py-[1.5rem] lg:py-[2rem]",
				small: "gap-[1rem]",
			},
		},
	},
);

export default function DropdownToggleButton({
	variant = "basic",
	placeholder,
	className,
	...props
}: DropdownButtonProps) {
	const { isOpen, setIsOpen, selectedItem, setButtonVariant } =
		useContext(DropdownContext);
	const dropdownIconSrc = "/icons/drop_down.svg";

	useEffect(() => {
		setButtonVariant(variant as string);
	}, [setButtonVariant, variant]);

	return (
		<button
			aria-haspopup="listbox"
			aria-expanded={isOpen}
			className={cn(
				dropdownButtonVariants({ variant }),
				className,
				isOpen && "outline-[#5097FA]",
			)}
			onClick={() => setIsOpen(!isOpen)}
			{...props}
		>
			<span className={cn(variant === "small" && isOpen && "text-white")}>
				{selectedItem ? selectedItem.name : placeholder}
			</span>
			<motion.div
				animate={isOpen ? "open" : "close"}
				variants={{ open: { rotate: 180 }, close: { rotate: 0 } }}
			>
				<Image
					src={dropdownIconSrc}
					alt="드랍다운 아이콘"
					width={24}
					height={24}
				/>
			</motion.div>
		</button>
	);
}
