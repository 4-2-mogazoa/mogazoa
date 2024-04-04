import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import clsx from "clsx";
import Image from "next/image";
import { useEffect } from "react";

import { deleteFavorite, postFavorite } from "@/apis/products";
import { getMe } from "@/apis/user";
import ProductModal from "@/components/common/modal/product/ProductModal";
import useCompareModal from "@/hooks/compare/useCompareModal";
import { useModalActions } from "@/store/modal";
import { ProductDetail } from "@/types/product";
import cn from "@/utils/cn";
import getCookies from "@/utils/getCookies";
import { moveModalText } from "@/utils/modalText";

import BasicButton from "../common/button/BasicButton";
import CategoryBadge from "../common/categoryBadge/CategoryBadge";
import MovingPageModal from "../common/modal/MovingPageModal";
import ReviewAlertModal from "./ReviewAlertModal";
import ReviewModal from "./ReviewModal";

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
	id: number;
	isMyProduct: boolean;
};

export default function DetailCard({ productData, isMyProduct }: Props) {
	const { name, description, image, isFavorite, category, id } = productData;
	const { openModal, closeModal } = useModalActions();

	const { isError } = useQuery({
		queryKey: ["me"],
		queryFn: () => getMe(),
		retry: false,
	});

	const cookie = getCookies();
	const accessToken = cookie["accessToken"];

	const handleReviewCreateButton = () => {
		if (isError) {
			const modalId = openModal(
				<MovingPageModal
					closeModal={() => closeModal(modalId)}
					description={moveModalText.signin}
					url="/signin"
				/>,
				{
					isCloseClickOutside: true,
					isCloseESC: true,
				},
			);
			return;
		}

		const modalId = openModal(
			<ReviewModal
				type="create"
				closeModal={() => closeModal(modalId)}
				productId={id}
			/>,
			{
				isCloseClickOutside: true,
				isCloseESC: true,
			},
		);
	};

	const handleEditButtonClick = () => {
		const modal = openModal(
			<ProductModal
				type="edit"
				productId={id}
				closeModal={() => closeModal(modal)}
			/>,
		);
	};

	const { compareButtonText, handleCompareButtonClick } = useCompareModal(
		productData,
		accessToken,
	);

	return (
		<div className="flex min-w-[33.5rem] flex-col items-center md:flex-row lg:justify-between">
			<div className="relative min-h-[21rem] min-w-[28rem] md:mr-[3rem] lg:mx-[6rem]">
				<Image src={image} fill alt={name} className="object-contain" />
			</div>
			<div className="flex w-full flex-col">
				<div className="flex justify-between">
					<CategoryBadge size="small" category={category.name} />
					<Share className="flex md:hidden" />
				</div>
				<div className="flex flex-row justify-between pb-[2rem] pt-[1.1rem] md:pb-[5.15rem] md:pt-[1.25rem] lg:pb-[4.9rem] lg:pt-[1rem]">
					<div className="flex items-center md:gap-[1.5rem]">
						<span className="text-[2rem] font-semibold text-white lg:text-[2.4rem]">
							{name}
						</span>
						<Favorite
							isFavorite={isFavorite}
							className="hidden md:flex"
							id={id}
							isMyProduct={isMyProduct}
						/>
					</div>
					<Share className="hidden md:flex" />
					<Favorite
						isFavorite={isFavorite}
						className="flex md:hidden"
						id={id}
						isMyProduct={isMyProduct}
					/>
				</div>
				<div className="text-[1.4rem] text-white lg:text-[1.6rem]">
					{description}
				</div>
				<div className="flex flex-col gap-[1.5rem] pt-[2rem] md:flex-row md:gap-[2rem] md:pt-[6rem]">
					<BasicButton
						label="리뷰 작성하기"
						variant="primary"
						className={clsx("lg:max-w-[34.5rem]", {
							"lg:max-w-[18.5rem]": isMyProduct,
						})}
						onClick={handleReviewCreateButton}
					/>
					<BasicButton
						label={compareButtonText}
						variant="secondary"
						className={clsx("md:max-w-[12.3rem] lg:max-w-[18rem]", {
							"md:max-w-[10.7rem] lg:max-w-[16rem]": isMyProduct,
						})}
						onClick={handleCompareButtonClick}
					/>
					{isMyProduct && (
						<BasicButton
							label="편집하기"
							variant="tertiary"
							className="md:max-w-[10.7rem] lg:max-w-[16rem]"
							onClick={handleEditButtonClick}
						/>
					)}
				</div>
			</div>
		</div>
	);
}

export function Share({ className }: ShareProps) {
	const { openModal, closeModal } = useModalActions();

	const shareUrl = typeof window !== "undefined" ? window.location.href : "";

	useEffect(() => {
		if (typeof window !== "undefined") {
			if (!window.Kakao.isInitialized()) {
				window.Kakao.init("2fad6374928f2fdae3ad76e79d72417d");
			}
			//env파일 key로 수정 예정
		}
	}, []);

	const handleCopyClipBoard = () => {
		navigator.clipboard.writeText(shareUrl);
		const modalId = openModal(
			<ReviewAlertModal
				closeModal={() => closeModal(modalId)}
				type="clipboard"
			/>,
			{
				isCloseClickOutside: true,
				isCloseESC: true,
			},
		);
	};

	const handleCopyKakao = () => {
		window.Kakao.Share.sendScrap({
			requestUrl: shareUrl,
		});
	};

	return (
		<div className={cn("flex gap-[1rem]", className)}>
			<button
				className="flex size-[2.4rem] items-center justify-center rounded-[0.6rem] bg-black-bg lg:size-[2.8rem]"
				onClick={handleCopyKakao}
			>
				<div className="relative size-[1.4rem] lg:size-[1.8rem]">
					<Image
						src="/icons/kakaotalk.svg"
						alt="카카오_공유"
						fill
						className="object-cover"
					/>
				</div>
			</button>
			<button
				className="flex size-[2.4rem] items-center justify-center rounded-[0.6rem] bg-black-bg lg:size-[2.8rem]"
				onClick={handleCopyClipBoard}
			>
				<div className="relative size-[1.4rem] lg:size-[1.8rem]">
					<Image
						src="/icons/share.svg"
						alt="클립보드_공유"
						fill
						className="object-cover"
					/>
				</div>
			</button>
		</div>
	);
}

export function Favorite({
	isFavorite,
	className,
	id,
	isMyProduct,
}: FavoriteProps) {
	const heartOnIconSrc = "/icons/heart_on.svg";
	const heartOffIconSrc = "/icons/heart_off.svg";
	const queryClient = useQueryClient();
	const { openModal, closeModal } = useModalActions();

	const { isError } = useQuery({
		queryKey: ["me"],
		queryFn: () => getMe(),
		retry: false,
	});

	const { mutate: toggleFavorite, error } = useMutation({
		mutationFn: () => (isFavorite ? deleteFavorite(id) : postFavorite(id)),
		onMutate: () => {
			const previous: ProductDetail | undefined = queryClient.getQueryData([
				"productDetail",
				id,
			]);
			if (!previous) {
				throw new Error("error!");
			}

			const updateData = () => {
				return {
					...previous,
					isFavorite: !previous.isFavorite,
				};
			};
			queryClient.setQueryData(["productDetail", id], updateData());
			return previous;
		},
		onError: (error, variables, context) => {
			queryClient.setQueryData(["productDetail", id], context);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["productDetail", id] });
		},
	});
	const handleButtonOnclick = () => {
		if (isError) {
			const modalId = openModal(
				<MovingPageModal
					closeModal={() => closeModal(modalId)}
					description={moveModalText.signin}
					url="/signin"
				/>,
				{
					isCloseClickOutside: true,
					isCloseESC: true,
				},
			);
			return;
		}

		if (isMyProduct) {
			const modalId = openModal(
				<ReviewAlertModal
					closeModal={() => closeModal(modalId)}
					type="favorite"
				/>,
				{
					isCloseClickOutside: true,
					isCloseESC: true,
				},
			);
			return;
		}
		toggleFavorite();
	};
	return (
		<button className={className} onClick={handleButtonOnclick}>
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
