import { useMutation, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { ChangeEvent, useEffect, useState } from "react";

import { getImageURL } from "@/apis/image";
import { createReview } from "@/apis/review";
import { starRate } from "@/constants/starRate";
import { Review } from "@/types/review";

import BasicButton from "../common/button/BasicButton";
import CategoryBadge from "../common/categoryBadge/CategoryBadge";
import AddImageBox, { ImageData } from "../common/inputs/AddImageBox";
import { productDetailData } from "./MockData";

type Props = {
	type: "create" | "modify";
	closeModal: () => void;
	productId: number;
	reviewData?: Review;
};

export type image = {
	id: string | undefined;
	image: string;
};

export default function ReviewModal({
	type,
	closeModal,
	productId,
	reviewData,
}: Props) {
	const [rating, setRating] = useState(0);
	const [hover, setHover] = useState(0);
	const [content, setContent] = useState("");
	const [editorData, setEditorData] = useState<ImageData[]>([]);
	const [image, setImage] = useState<image[]>([]);
	const { rateArray, starOnIconSrc, starOffIconSrc } = starRate;
	const [isFocused, setIsFocused] = useState(false);
	const [errMsg, setErrMsg] = useState("");
	const [rateErrMsg, setRateErrMsg] = useState("");
	const [count, setCount] = useState(0);

	const queryClient = useQueryClient();

	const MAX_LENGTH = 300;
	const buttonLabel = type === "create" ? "작성하기" : "수정하기";

	const { mutate: getImage } = useMutation({
		mutationFn: (index: number) => getImageURL(editorData[index].data),
		onSuccess: (data, index) => {
			if (image.length <= 3) {
				setImage((prev) =>
					prev.map((img) =>
						img.id === editorData[index].id ? { ...img, image: data.url } : img,
					),
				);
			}
		},
	});

	const { mutate: create, isPending } = useMutation({
		mutationFn: () => {
			const imageUrls = image.map((img) => img.image);
			return createReview(productId, imageUrls, content, rating);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["review", productId] });
			setRating(0);
			setImage([]);
			setContent("");
			closeModal();
		},
	});

	// const { mutate: modify } = useMutation({
	// 	mutationFn: () => createReview(productId, image, content, rating),
	// 	onSuccess: () =>
	// 		queryClient.invalidateQueries({ queryKey: ["review", productId] }),
	// }); 수정 기능 미완성

	const getImages = () => {
		for (let i = 0; i <= 2; i++) {
			getImage(i);
		}
	};

	useEffect(() => {
		setCount(content.length);
	}, [content]);

	useEffect(() => {
		getImages();
	}, [editorData.length]);

	useEffect(() => {
		if (type === "modify") {
			if (reviewData) {
				setImage(
					reviewData.reviewImages.map((data) => ({
						id: data.id.toString(),
						image: data.source,
					})),
				);
				setEditorData((prev) =>
					prev.map((data, index) => ({
						...data,
						preview: reviewData.reviewImages[index]?.source || null,
					})),
				);
				setContent(reviewData?.content);
				setRating(reviewData?.rating);
			}
		}
	}, [type]);

	const handleOnClick = () => {
		rating ? setRateErrMsg("") : setRateErrMsg("별점으로 상품을 평가해주세요.");

		if (rating && image.length >= 1 && count >= 10) {
			create();
		}
	};

	const handleOnTextarea = (e: ChangeEvent<HTMLTextAreaElement>) => {
		setContent(e.target.value);
	};

	const handleOnBlur = () => {
		setIsFocused(false);
		if (count === 0) {
			setErrMsg("리뷰 내용을 입력해주세요.");
		}
		if (content) {
			setErrMsg("");
		}
		if (count >= 1 && count < 10) {
			setErrMsg("최소 10자 이상 적어주세요.");
		}
	};

	return (
		<div className="flex h-[49.8rem] w-[33.5rem] flex-col gap-[2rem]  md:h-[58.2rem] md:w-[51rem] md:gap-[4rem] lg:h-[62.8rem] lg:w-[54rem]">
			<div className="flex flex-col gap-[1rem]">
				<CategoryBadge
					size="small"
					category={productDetailData.category.name}
				/>
				<div className="text-[2rem] font-semibold text-white lg:text-[2.4rem]">
					{productDetailData.name}
				</div>
			</div>
			<div className="flex flex-col gap-[1rem] md:gap-[1.5rem] lg:gap-[2rem]">
				<div className=" flex items-center gap-[1.5rem] lg:gap-[2rem]">
					<span className="text-[1.4rem] text-gray-200 lg:text-[1.6rem]">
						별점
					</span>
					<div className="flex gap-[0.2rem] lg:gap-[0.5rem]">
						{rateArray.map((rate, index) => (
							<button
								key={index}
								onMouseEnter={() => setHover(rate)}
								onMouseLeave={() => setHover(0)}
								onClick={() => setRating(rate)}
							>
								<div className="relative size-[2.8rem] md:size-[3.2rem] ">
									<Image
										alt="star_rate"
										src={
											rate <= (hover || rating) ? starOnIconSrc : starOffIconSrc
										}
										fill
										className=" object-cover"
									/>
								</div>
							</button>
						))}
					</div>
					{
						<span className="text-[1rem] text-yellow md:text-[1.5rem]">
							{rateErrMsg}
						</span>
					}
				</div>
				<div
					className={`min-h-[8.8rem] rounded-xl border ${isFocused ? "border-main_blue" : "border-[#353542]"} bg-[#252530] p-[2rem]`}
				>
					<textarea
						className="w-full resize-none overflow-hidden border-none bg-[#252530] text-[1.4rem] text-white placeholder:text-[1.4rem] placeholder:text-gray-200 focus:outline-none lg:text-[1.6rem] lg:placeholder:text-[1.6rem]"
						rows={3}
						onChange={handleOnTextarea}
						onFocus={() => setIsFocused(true)}
						onBlur={handleOnBlur}
						maxLength={MAX_LENGTH}
						defaultValue={content}
					/>
					<p className="text-right text-[1.4rem] text-[#6E6E82]">
						<span>{count}</span>
						<span>/{MAX_LENGTH}</span>
					</p>
				</div>
				{errMsg && (
					<div className="text-[1rem] text-yellow md:text-[1.5rem]">
						{errMsg}
					</div>
				)}
				<div className="flex gap-[1rem] md:gap-[1.5rem] lg:gap-[2rem]">
					<AddImageBox
						editorData={editorData}
						setEditorData={setEditorData}
						setImage={setImage}
					/>
				</div>
			</div>
			<BasicButton
				variant="primary"
				label={buttonLabel}
				onClick={handleOnClick}
				disabled={isPending}
			/>
		</div>
	);
}