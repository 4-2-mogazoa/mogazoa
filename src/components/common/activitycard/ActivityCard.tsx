import clsx from "clsx";
import Image from "next/image";

import CategoryBadge from "../categoryBadge/CategoryBadge";

type Props = {
	type: "rate" | "review" | "category";
	myRateAvg?: number;
	myReivewCount?: number;
	category?:
		| "음악"
		| "영화/드라마"
		| "강의/책"
		| "호텔"
		| "가구/인테리어"
		| "식당"
		| "전자기기"
		| "화장품"
		| "의류/잡화"
		| "앱";
};

type dataType = {
	label: string[];
	img?: string;
	data: number | string | undefined;
};

type DataListType = {
	rate: dataType;
	review: dataType;
	category: dataType;
};

export default function ActivityCard({
	type,
	myRateAvg,
	myReivewCount,
	category = "음악",
}: Props) {
	const DataList: DataListType = {
		rate: {
			label: ["남긴", "별점 평균"],
			img: "/icons/star_on.svg",
			data: myRateAvg?.toFixed(1),
		},
		review: {
			label: ["남긴 리뷰"],
			img: "/icons/message.svg",
			data: myReivewCount?.toLocaleString(),
		},
		category: {
			label: ["관심", "카테고리"],
			data: category,
		},
	};
	const { label, img, data } = DataList[type];

	return (
		<div className="flex h-[11.9rem] max-w-[10.5rem] grow flex-col items-center justify-center gap-[1.5rem] rounded-[1.2rem] border border-[#353542] bg-[#252530] md:max-w-[16.3rem] lg:h-[12.8rem] lg:max-w-[30rem] lg:gap-[2rem]">
			<div className="hidden text-[1.4rem] text-gray-100 md:flex lg:text-[1.6rem]">
				{label.join(" ")}
			</div>
			<div
				className={clsx(
					"flex text-center text-[1.4rem] text-gray-100 md:hidden lg:text-[1.6rem]",
					{ "py-[1rem]": type === "review" },
				)}
			>
				{label[0]}
				<br />
				{label[1]}
			</div>
			{img && (
				<div className="flex flex-row items-center ">
					<div className="relative mr-[0.5rem] size-[2rem] lg:size-[2.4rem]">
						<Image
							src={img}
							alt={label.join("")}
							fill
							className="object-cover"
						/>
					</div>
					<span className="text-[2rem] text-white lg:text-[2.4rem]">
						{data}
					</span>
				</div>
			)}
			{!img && <CategoryBadge size="responsive" category={category} />}
		</div>
	);
}
