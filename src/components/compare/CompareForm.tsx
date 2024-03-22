import { useState } from "react";

import useCompareQueries from "@/hooks/compare/useCompareQueries";

import BasicButton from "../common/button/BasicButton";
import CompareInput from "./CompareInput";

export default function CompareForm() {
	const {
		state: {
			products: { firstProduct, secondProduct },
		},
		refetchAll,
	} = useCompareQueries();

	const [isError, setIsError] = useState(false);

	const handleFormSubmit = () => {
		// 모달 띄우기?
		if (isError) return;

		refetchAll();
	};

	return (
		<form
			className="flex w-full flex-col gap-[1.2rem] md:w-full md:flex-row md:items-center md:justify-center md:gap-[2rem]"
			onSubmit={handleFormSubmit}
		>
			<CompareInput
				position="firstProduct"
				label="상품 1"
				product={firstProduct}
				tagColor="green"
				setIsError={setIsError}
			/>
			<CompareInput
				position="secondProduct"
				label="상품 2"
				product={secondProduct}
				tagColor="pink"
				setIsError={setIsError}
			/>
			{/* TODO: 버튼 내부 text가 w-full일 때, 가운데 정렬이 안되고 있음 */}
			<BasicButton
				label="비교하기"
				className="_flex-center h-[5.5rem] w-full md:mt-2 md:w-[16.4rem] lg:h-[7rem] lg:w-[20rem]"
			/>
		</form>
	);
}
