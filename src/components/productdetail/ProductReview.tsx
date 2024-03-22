import Image from "next/image";
import { useEffect, useState } from "react";

import { filterBy } from "@/constants/filterBy";

import Dropdown from "../common/dropdown/Dropdown";
import { reviewData } from "./MockData";
import ReviewCard from "./ReviewCard";

export default function ProductReview() {
	const [cookieid, setCookieId] = useState<number>(0);

	useEffect(() => {
		const cookies = Object.fromEntries(
			document.cookie.split(";").map((cookie) => cookie.trim().split("=")),
		);
		setCookieId(Number(cookies["id"]));
	}, []);
	//TODO: 쿠키는 아마도 기능구현때 store에서 관리

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
					onSelect={(item) => console.log(`선택된 항목: ${item.name}`)}
				>
					{/**TODO: 선택된 항목 별 정렬 */}
					<Dropdown.Button variant={"small"} />
					<Dropdown.List />
				</Dropdown>
			</div>
			<div className="flex flex-col gap-[1.5rem] lg:gap-[2rem]">
				{reviewData.list.map((data) => (
					<ReviewCard
						reviewData={data}
						isMyReview={data.userId === cookieid}
						key={data.id}
					/>
				))}
			</div>
		</div>
	);
}

type NoneReviewProps = {
	type: "none" | "loading";
};
// 기능 구현 때 데이터가 없거나 로딩중일때 렌더링하도록 컴포넌트 사용할 예정
export function NoneReview({ type }: NoneReviewProps) {
	const text = type === "none" ? "첫 리뷰를 작성해 보세요!" : "Loading...";
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
