import clsx from "clsx";
import Image from "next/image";

import { ProductDetail } from "@/types/products";
import cn from "@/utils/cn";

import BasicButton from "../common/button/BasicButton";
import CategoryBadge from "../common/categoryBadge/CategoryBadge";

type Props = {
	productData: ProductDetail;
	isMyProduct: boolean;
};

type ShareProps = {
	className: string;
};

type FavoriteProps = {
	isFavorite: boolean;
	className: string;
};

const imageCn = "object-contain";

export default function DetailCard({ productData, isMyProduct }: Props) {
	const { name, description, image, isFavorite, category } = productData;
	const mobileHiddenCn = "hidden md:flex";
	const onlyMobileCn = "flex md:hidden";

	return (
		<div className="flex flex-col items-center gap-[4rem] md:flex-row md:gap-[2rem]">
			<div className="relative h-[23.6rem] w-[33.5rem] md:h-[19.7rem] md:w-[28rem] lg:h-[25rem] lg:w-[35.5rem] ">
				<Image src={image} fill alt={name} className={imageCn} />
			</div>
			<div className="flex w-[33.5rem] flex-col md:w-[38.4rem] lg:w-[54.5rem]">
				<div className="flex justify-between">
					<CategoryBadge size="small" category={category.name} />
					<Share className={onlyMobileCn} />
				</div>
				<div className="flex flex-row justify-between pb-[2rem] pt-[1.1rem] md:pb-[5.15rem] md:pt-[1.25rem] lg:pb-[4.9rem] lg:pt-[1rem]">
					<div className="flex items-center md:gap-[1.5rem]">
						<span className="text-[2rem] font-semibold text-white lg:text-[2.4rem]">
							{name}
						</span>
						<Favorite isFavorite={isFavorite} className={mobileHiddenCn} />
					</div>
					<Share className={mobileHiddenCn} />
					<Favorite isFavorite={isFavorite} className={onlyMobileCn} />
				</div>
				<div className="text-[1.4rem] text-white lg:text-[1.6rem]">
					{description}
				</div>
				<div className="flex flex-col gap-[1.5rem] pt-[2rem] md:flex-row md:gap-[2rem] md:pt-[6rem]">
					<BasicButton
						label="리뷰 작성하기"
						variant="primary"
						className={clsx("md:w-[24.6rem] lg:w-[34.5rem]", {
							"md:w-[14rem] lg:w-[18.5rem]": isMyProduct,
						})}
					/>
					<BasicButton
						label="비교하기"
						variant="secondary"
						className={clsx("md:w-[12.3rem] lg:w-[18rem]", {
							"md:w-[10.7rem] lg:w-[16rem]": isMyProduct,
						})}
					/>
					{isMyProduct && (
						<BasicButton
							label="편집하기"
							variant="tertiary"
							className="md:w-[10.7rem] lg:w-[16rem]"
						/>
					)}
				</div>
			</div>
		</div>
	);
}

export function Share({ className }: ShareProps) {
	const buttonCn =
		"flex size-[2.4rem] items-center justify-center rounded-[0.6rem] bg-black-bg lg:size-[2.8rem]";
	const imageDivCn = "relative size-[1.4rem] lg:size-[1.8rem]";
	const kakaoShareIconSrc = "/icons/kakaotalk.svg";
	const shareIconSrc = "/icons/share.svg";
	return (
		<div className={cn("flex gap-[1rem]", className)}>
			<button className={buttonCn}>
				<div className={imageDivCn}>
					<Image
						src={kakaoShareIconSrc}
						alt="카카오_공유"
						fill
						className={imageCn}
					/>
				</div>
			</button>
			<button className={buttonCn}>
				<div className={imageDivCn}>
					<Image
						src={shareIconSrc}
						alt="클립보드_공유"
						fill
						className={imageCn}
					/>
				</div>
			</button>
		</div>
	);
}

export function Favorite({ isFavorite, className }: FavoriteProps) {
	const heartOnIconSrc = "/icons/heart_on.svg";
	const heartOffIconSrc = "/icons/heart_off.svg";
	return (
		<button className={className}>
			<div className="relative size-[2.4rem] lg:size-[2.8rem]">
				<Image
					src={isFavorite ? heartOnIconSrc : heartOffIconSrc}
					alt="찜"
					fill
					className={imageCn}
				/>
			</div>
		</button>
	);
}
