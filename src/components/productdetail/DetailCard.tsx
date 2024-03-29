import clsx from "clsx";
import Image from "next/image";

import { ProductDetail } from "@/types/product";
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

export default function DetailCard({ productData, isMyProduct }: Props) {
	const { name, description, image, isFavorite, category } = productData;

	return (
		<div className="flex min-w-[33.5rem] flex-col items-center md:flex-row lg:justify-between">
			<div className="relative min-h-[19.7rem] min-w-[28rem] lg:ml-[3rem]">
				<Image src={image} fill alt={name} className="object-cover" />
			</div>
			<div className="flex flex-col">
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
				<div className="text-[1.4rem] text-white lg:max-w-[54.5rem] lg:text-[1.6rem]">
					{description}
				</div>
				<div className="flex flex-col gap-[1.5rem] pt-[2rem] md:flex-row md:gap-[2rem] md:pt-[6rem]">
					<BasicButton
						label="리뷰 작성하기"
						variant="primary"
						className={clsx("md:lg:max-w-[34.5rem]", {
							"lg:max-w-[18.5rem]": isMyProduct,
						})}
					/>
					{/**TODO: 리뷰 작성 모달, 비로그인 시 로그인 요청 모달*/}
					<BasicButton
						label="비교하기"
						variant="secondary"
						className={clsx("md:max-w-[12.3rem] lg:max-w-[18rem]", {
							"md:max-w-[10.7rem] lg:max-w-[16rem]": isMyProduct,
						})}
					/>
					{/**TODO: 비교상품 없을 경우 alert표시, 하나 있을 경우 확인할지 안할지 모달 표시 확인하면 /compare 이동, 두개 있을 경우 비교 상품 교체 모달 비로그인시 로그인 요청 모달*/}
					{isMyProduct && (
						<BasicButton
							label="편집하기"
							variant="tertiary"
							className="md:max-w-[10.7rem] lg:max-w-[16rem]"
						/>
					)}
				</div>
				{/**TODO: 상품 편집 모달 추가*/}
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
						className="object-cover"
					/>
				</div>
			</button>
			{/**TODO: 카카오공유는 배포이후 추가 가능*/}
			<button className={buttonCn}>
				<div className={imageDivCn}>
					<Image
						src={shareIconSrc}
						alt="클립보드_공유"
						fill
						className="object-cover"
					/>
				</div>
			</button>
			{/**TODO: 클립보드 복사 기능 추가*/}
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
					className="object-cover"
				/>
			</div>
		</button>
	);
}

