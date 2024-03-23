import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useState } from "react";

import { getReviews } from "@/apis/products";
import { getUserMe } from "@/apis/review";
import { filterBy } from "@/constants/filterBy";

import Dropdown from "../common/dropdown/Dropdown";
import ReviewCard from "./ReviewCard";

export default function ProductReview({ id }: { id: number }) {
	const [order, setOrder] = useState<
		"recent" | "ratingDesc" | "ratingAsc" | "likeCount"
	>("recent");

	const {
		data: reviewData,
		isLoading,
		isError,
		isFetching,
	} = useQuery({
		queryKey: ["review", id, order],
		queryFn: () => getReviews(id, order),
		enabled: !!id,
	});

	const myData = useQuery({
		queryKey: ["usersMe"],
		queryFn: () => getUserMe(),
	}).data;

	const handleOnSelect = (item: { id: number; name: string }) => {
		switch (item.id) {
			case 0:
				setOrder("recent");
				break;
			case 1:
				setOrder("ratingDesc");
				break;
			case 2:
				setOrder("ratingAsc");
				break;
			case 3:
				setOrder("likeCount");
				break;
			default:
				setOrder("recent");
		}
	};
	return (
		<div className="w-full lg:w-[94rem]">
			{/**TODO: 리뷰 목록 무한 스크롤 구현 */}
			<div className="flex min-w-[33.5rem] items-center justify-between pb-[3rem] ">
				<span className="text-[1.8rem] text-white md:text-[1.6rem] lg:text-[2rem]">
					상품 리뷰
				</span>
				<Dropdown
					items={filterBy}
					defaultItem={filterBy[0]}
					onSelect={(item) => handleOnSelect(item)}
				>
					<Dropdown.Button variant={"small"} />
					<Dropdown.List />
				</Dropdown>
			</div>
			<div className="flex flex-col gap-[1.5rem] lg:gap-[2rem]">
				{reviewData?.list.map((data) => (
					<ReviewCard
						reviewData={data}
						isMyReview={data.userId === myData?.id}
						key={data.id}
						order={order}
					/>
				))}
			</div>
			{reviewData?.list.length === 0 && <NoneReview type="none" />}
			{(isLoading || isFetching) && <NoneReview type="loading" />}
			{isError && <NoneReview type="error" />}
		</div>
	);
}

type NoneReviewProps = {
	type: "none" | "loading" | "error";
};

export function NoneReview({ type }: NoneReviewProps) {
	const text =
		type === "none"
			? "첫 리뷰를 작성해 보세요!"
			: type === "loading"
				? "Loading..."
				: "Error 발생";
	const noneReviewIconSrc = "/icons/none_review.svg";
	return (
		<div className="flex h-[20rem] flex-col items-center justify-center gap-[2rem] md:h-[29.8rem] lg:h-[32rem]">
			<div className="relative h-[3.2rem] w-[3.92rem] lg:h-[4rem] lg:w-[4.9rem]">
				<Image
					src={noneReviewIconSrc}
					fill
					className="object-cover"
					alt="none"
				/>
			</div>
			<span className=" flex flex-row text-[1.8rem] text-gray-200 lg:text-[2rem]">
				{text}
			</span>
		</div>
	);
}
