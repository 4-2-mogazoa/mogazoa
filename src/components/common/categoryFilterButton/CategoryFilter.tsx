import clsx from "clsx";
import Image from "next/image";
import React, { MouseEventHandler } from "react";

type Props = {
	category:
		| "카테고리"
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
	handleButtonClick: MouseEventHandler<HTMLButtonElement>;
};

export default function CategoryFilterButton({
	category = "카테고리",
	handleButtonClick,
}: Props) {
	const iconSrc = "/icons/category.svg";

	return (
		<button
			className={clsx(
				"_flex-center gap-2 rounded-[10rem] border border-solid border-black-border bg-black-bg px-[1.2rem] py-[0.6rem] text-[1.4rem] text-gray-100 hover:bg-black-100",
				category === "카테고리" && "text-gray-200",
			)}
			onClick={handleButtonClick}
		>
			<Image src={iconSrc} alt="선택한 카테고리" width={18} height={18} />
			{category}
		</button>
	);
}
