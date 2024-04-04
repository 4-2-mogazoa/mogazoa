import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

import { getMe } from "@/apis/user";
import MovingPageModal from "@/components/common/modal/MovingPageModal";
import ChangeProductModal from "@/components/compare/ChangeProductModal";
import { moveModalText } from "@/constants/modalText";
import useCompareStore from "@/store/compare";
import { useModalActions } from "@/store/modal";
import { CompareStatePosition } from "@/types/compare";
import { ProductDetail } from "@/types/product";

type Return = {
	compareButtonText: string;
	handleCompareButtonClick: () => void;
};

// onClick 시 실행할 "함수"를 리턴함 - 즉, 이 함수를 반환값을 비교하기 버튼 onClick에 전달하면 됨
export default function useCompareModal(product: ProductDetail): Return {
	const { openModal, closeModal } = useModalActions();

	const { isFetching, isError } = useQuery({
		queryKey: ["me"],
		queryFn: () => getMe(),
	});

	const {
		numberOfProducts,
		isAlreadyStoredProduct,
		getCurrentProductPosition,
		addProduct,
		deleteProduct,
	} = useCompareStore((state) => state);

	const { id, name } = product;

	const [compareButtonText, setCompareButtonText] = useState(
		isAlreadyStoredProduct(id) ? "비교 취소" : "비교하기",
	);

	// 1. 로그인 여부 - 로그인을 안한 경우 "로그인 요청 모달"
	if (!isFetching && isError) {
		return {
			compareButtonText,
			handleCompareButtonClick: () => {
				const modalId = openModal(
					<MovingPageModal
						description={moveModalText.signin}
						closeModal={() => closeModal(modalId)}
						url="/signin"
					/>,
				);
			},
		};
	}

	// 2. 이미 store에 저장된 상품인 경우 - store에서 삭제
	if (isAlreadyStoredProduct(id)) {
		return {
			compareButtonText,
			handleCompareButtonClick: () => {
				const position = getCurrentProductPosition(id);
				position && deleteProduct(position as CompareStatePosition);

				setCompareButtonText("비교하기");
			},
		};
	}

	// 3. 비교하기에 상품 추가
	switch (numberOfProducts) {
		case 0:
			return {
				compareButtonText,
				handleCompareButtonClick: () => {
					addProduct({ id, name });
					setCompareButtonText("비교 취소");
				},
			};

		case 1:
			return {
				compareButtonText,
				handleCompareButtonClick: () => {
					addProduct({ id, name });
					setCompareButtonText("비교 취소");

					const modalId = openModal(
						<MovingPageModal
							description={moveModalText.comparePage}
							closeModal={() => closeModal(modalId)}
							url="/compare"
						/>,
					);
				},
			};

		case 2:
			return {
				compareButtonText,
				handleCompareButtonClick: () => {
					const modalId = openModal(
						<ChangeProductModal
							currentId={id}
							currentName={name}
							closeModal={() => closeModal(modalId)}
							changeCompareButtonText={() => setCompareButtonText("비교 취소")}
						/>,
					);
				},
			};

		default:
			const invalid = numberOfProducts;
			throw new Error(
				`You can save up to 2 products - invalid number of products stored: ${invalid}`,
			);
	}
}
