import { useState } from "react";

import MovingPageModal from "@/components/common/modal/MovingPageModal";
import ChangeProductModal from "@/components/compare/ChangeProductModal";
import useCompareStore from "@/store/compare";
import { useModalActions } from "@/store/modal";
import { CompareStatePosition } from "@/types/compare";
import { ProductDetail } from "@/types/product";

type Return = {
	compareButtonText: string;
	handleCompareButtonClick: () => void;
};

// onClick 시 실행할 "함수"를 리턴함 - 즉, 이 함수를 반환값을 비교하기 버튼 onClick에 전달하면 됨
export default function useCompareModal(
	product: ProductDetail,
	accessToken: string,
): Return {
	const { openModal, closeModal } = useModalActions();

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
	if (!accessToken) {
		return {
			compareButtonText,
			handleCompareButtonClick: () => {
				const modalId = openModal(
					<MovingPageModal
						description="로그인이 필요한 서비스입니다. 로그인하시겠습니까?"
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
							description="상품이 담겼습니다. 바로 확인 해보시겠습니까?"
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
