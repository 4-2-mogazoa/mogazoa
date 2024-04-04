import { FormEvent } from "react";

import useSigninModal from "@/hooks/common/useSigninModal";
import useCompareQueries from "@/hooks/compare/useCompareQueries";

import BasicButton from "../common/button/BasicButton";
import CompareInput from "./CompareInput";

type Props = {
	openSigninModal?: () => void;
};

export default function CompareForm({ openSigninModal }: Props) {
	const {
		state: {
			numberOfProducts,
			products: { firstProduct, secondProduct },
		},
		refetchAll,
	} = useCompareQueries();

	const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (openSigninModal) {
			openSigninModal();
			return;
		}

		if (numberOfProducts !== 2) return;

		refetchAll();
	};

	return (
		<form
			className="flex w-full flex-col gap-[1.2rem] md:grid md:grid-cols-[repeat(2,minmax(0,1fr))_164px] md:items-center md:gap-[2rem] lg:grid-cols-[repeat(2,minmax(0,1fr))_200px]"
			onSubmit={handleFormSubmit}
		>
			<CompareInput
				position="firstProduct"
				label="상품 1"
				product={firstProduct}
				tagColor="green"
			/>
			<CompareInput
				position="secondProduct"
				label="상품 2"
				product={secondProduct}
				tagColor="pink"
			/>
			<BasicButton
				label="비교하기"
				className="_flex-center h-[5.5rem] w-full focus:outline focus:outline-main_indigo md:mt-2 md:w-[16.4rem] lg:h-[7rem] lg:w-[20rem]"
			/>
		</form>
	);
}
