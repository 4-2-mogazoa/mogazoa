import Image from "next/image";

type Props = {
	type: "none" | "loading" | "error";
};

export default function NoneReview({ type }: Props) {
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
