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
	const { isAlreadyStoredProduct } = useCompareStore((state) => state);

	const testProduct = { id: 230, name: "2: this is test" };

	// 이렇게 하면 새로 고침할 경우, react- hydration 오류 발생
	// 클라이언트는 "비교 취소"인데, 서버는 "비교하기" 상태라서..
	const compareButtonText = isAlreadyStoredProduct(testProduct.id)
		? "비교 취소"
		: "비교하기";

	const handleCompareButtonClick = useCompareModal(testProduct, accessToken);

	return (
		<div>
			<button onClick={handleCompareButtonClick}>{compareButtonText}</button>
		</div>
	);
}
