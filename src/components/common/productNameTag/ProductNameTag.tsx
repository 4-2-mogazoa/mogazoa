import { cva, type VariantProps } from "class-variance-authority";
import Image from "next/image";
import React from "react";

import cn from "@/utils/cn";

const productNameTagVariants = cva(
	"_flex-center w-fit gap-4 rounded-[0.6rem] px-[1rem] py-[0.8rem] text-[1.4rem] md:text-[1.6rem]",
	{
		variants: {
			color: {
				green: "bg-green/10 text-green",
				pink: "bg-pink/10 text-pink",
			},
		},
	},
);

type Props = React.HTMLAttributes<HTMLDivElement> &
	VariantProps<typeof productNameTagVariants> & {
		color: "green" | "pink";
		productName: string;
		handleDeleteButtonClick: () => void;
		className?: string;
	};

export default function ProductNameTag({
	color,
	productName,
	handleDeleteButtonClick,
	className,
}: Props) {
	const deleteIconSrc = "/icons/close.svg";

	return (
		<button
			className={cn(productNameTagVariants({ color, className }))}
			onClick={handleDeleteButtonClick}
		>
			{productName}
			<div className="_flex-center size-[1.7rem] rounded-[0.6rem] bg-[#000000]/50 p-[0.2rem] md:size-[1.9rem]">
				<div className="relative size-[1.3rem] md:size-[1.5rem]">
					<Image src={deleteIconSrc} alt="상품 삭제하기" fill />
				</div>
			</div>
		</button>
	);
}
