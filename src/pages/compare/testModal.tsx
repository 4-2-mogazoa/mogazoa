import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";

import useCompareModal from "@/hooks/compare/useCompareModal";
import useCompareStore from "@/store/compare";

export async function getServerSideProps({ req }: GetServerSidePropsContext) {
	const accessToken: string = req.cookies.accessToken || "";

	return {
		props: {
			accessToken,
		},
	};
}

export default function TestModal({
	accessToken,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
	const testProduct = { id: 200, name: "2: this is test" };

	const { compareButtonText, handleCompareButtonClick } = useCompareModal(
		// 상품 상세 정보 조회로 받아온 product를 넣어주세요. (type ProductDatail)
		testProduct,
		accessToken,
	);

	return (
		<div>
			<button onClick={handleCompareButtonClick}>{compareButtonText}</button>
		</div>
	);
}
