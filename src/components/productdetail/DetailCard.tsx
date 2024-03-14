import Image from "next/image";

import { ProductDetail } from "@/types/common";
import cn from "@/utils/cn";

import BasicButton from "../common/button/BasicButton";
import CategoryBadge from "../common/categoryBadge/CategoryBadge";

type Props = {
	productData: ProductDetail;
	isMyProduct: boolean;
};
const kakaoShareIconSrc = "/icons/kakaotalk.svg";
const shareIconSrc = "/icons/share.svg";
const heartOnIconSrc = "/icons/heart_on.svg";
const heartOffIconSrc = "/icons/heart_off.svg";

export default function DetailCard({
	productData,
	isMyProduct = false,
}: Props) {
	const { name, description, image, isFavorite, category } = productData;

	return (
		<div className="flex flex-col items-center  gap-[4rem] md:flex-row md:gap-[2rem]">
			<div className="relative h-[23.6rem] w-[33.5rem] md:h-[19.7rem] md:w-[28rem] lg:h-[25rem] lg:w-[35.5rem] ">
				<Image src={image} fill alt={name} className="object-cover" />
			</div>
			<div className="flex w-[33.5rem] flex-col md:w-[38.4rem] lg:w-[54.5rem]">
				<div className="flex justify-between">
					<CategoryBadge size="small" category={category.name} />
					<Share className="flex md:hidden" />
				</div>
				<div className="flex flex-row justify-between pb-[2rem] pt-[1.1rem] md:pb-[5.15rem] md:pt-[1.25rem] lg:pb-[4.9rem] lg:pt-[1rem]">
					<div className="flex items-center md:gap-[1.5rem]">
						<span className="text-[2rem] font-semibold text-white lg:text-[2.4rem]">
							{name}
						</span>
						<Favorite isFavorite={isFavorite} className="hidden md:flex" />
					</div>
					<Share className="hidden md:flex" />
					<Favorite isFavorite={isFavorite} className="flex md:hidden" />
				</div>
				<div className="text-[1.4rem] text-white lg:text-[1.6rem]">
					{description}
				</div>
				{isMyProduct && (
					<div className="flex  flex-col  gap-[1.5rem] pt-[2rem] md:flex-row  md:gap-[2rem] md:pt-[6rem] ">
						<BasicButton
							label="리뷰 작성하기"
							variant="primary"
							className="md:w-[14rem] lg:w-[18.5rem]"
						/>
						<BasicButton
							label="비교하기"
							variant="secondary"
							className="md:w-[10.7rem] lg:w-[16rem]"
						/>
						<BasicButton
							label="편집하기"
							variant="tertiary"
							className="md:w-[10.7rem] lg:w-[16rem]"
						/>
					</div>
				)}
				{!isMyProduct && (
					<div className="flex  flex-col gap-[1.5rem] pt-[2rem] md:flex-row  md:gap-[2rem] md:pt-[6rem] ">
						<BasicButton label="리뷰 작성하기" variant="primary" />
						<BasicButton
							label="비교하기"
							variant="secondary"
							className="md:w-[20.7rem] lg:w-[24rem]"
						/>
					</div>
				)}
			</div>
		</div>
	);
}

type ShareProps = {
	className: string;
};

export function Share({ className }: ShareProps) {
	return (
		<div className={cn("flex gap-[1rem]", className)}>
			<button className="flex size-[2.4rem] items-center justify-center rounded-[0.6rem] bg-black-bg lg:size-[2.8rem]">
				<div className="relative size-[1.4rem] lg:size-[1.8rem]">
					<Image
						src={kakaoShareIconSrc}
						alt="카카오_공유"
						fill
						className="object-contain"
					/>
				</div>
			</button>
			<button className="flex size-[2.4rem] items-center justify-center rounded-[0.6rem] bg-black-bg lg:size-[2.8rem]">
				<div className="relative size-[1.4rem] lg:size-[1.8rem]">
					<Image
						src={shareIconSrc}
						alt="클립보드_공유"
						fill
						className="object-contain"
					/>
				</div>
			</button>
		</div>
	);
}

type FavoriteProps = {
	isFavorite: boolean;
	className: string;
};

export function Favorite({ isFavorite, className }: FavoriteProps) {
	return (
		<button className={className}>
			<div className="relative size-[2.4rem] lg:size-[2.8rem]">
				<Image
					src={isFavorite ? heartOnIconSrc : heartOffIconSrc}
					alt="찜"
					fill
					className="object-contain"
				/>
			</div>
		</button>
	);
}
