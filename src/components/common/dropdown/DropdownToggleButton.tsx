import { cva, VariantProps } from "class-variance-authority";
import clsx from "clsx";
import { motion } from "framer-motion";
import Image from "next/image";
import { ButtonHTMLAttributes, useContext, useEffect } from "react";

import cn from "@/utils/cn";

import { DropdownContext } from "./Dropdown";

type DropdownButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
	VariantProps<typeof dropdownButtonVariants>;

const dropdownButtonVariants = cva(
	"flex w-full items-center justify-between rounded-[0.8rem]",
	{
		variants: {
			variant: {
				basic:
					"bg-[#252530] px-[2rem] py-[1.25rem] outline outline-[#353542] md:py-[1.5rem] lg:py-[2rem]",
				small: "w-[6.2rem] md:w-[14rem] lg:w-[16rem]",
			},
		},
	},
);

export default function DropdownToggleButton({
	variant = "basic",
	...props
}: DropdownButtonProps) {
	const { isOpen, setIsOpen, selectedItem, placeholder, setButtonVariant } =
		useContext(DropdownContext);
	const dropdownIcon = "/icons/drop_down.svg";

	useEffect(() => {
		setButtonVariant(variant as string);
	}, [setButtonVariant, variant]);

	return (
		<button
			aria-haspopup="listbox"
			aria-expanded={isOpen}
			className={cn(
				dropdownButtonVariants({ variant }),
				isOpen && "outline-[#5097FA]",
			)}
			onClick={() => setIsOpen(!isOpen)}
			{...props}
		>
			<span
				className={clsx(
					"text-[1.4rem] text-gray-200 lg:text-[1.6rem]",
					variant === "small" && isOpen && "text-white",
				)}
			>
				{selectedItem ? selectedItem.name : placeholder}
			</span>
			<motion.div
				animate={isOpen ? "open" : "close"}
				variants={{ open: { rotate: 180 }, close: { rotate: 0 } }}
			>
				<Image
					src={dropdownIcon}
					alt="드랍다운 아이콘"
					width={30}
					height={30}
				/>
			</motion.div>
		</button>
	);
}
