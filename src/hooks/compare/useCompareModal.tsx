import ChangeProductModal from "@/components/compare/ChangeProductModal";
import MovingPageModal from "@/components/compare/MovingPageModal";
import useCompareStore from "@/store/compare";
import { useModalActions } from "@/store/modal";
import { CompareStatePosition } from "@/types/compare";
import { ProductDetail } from "@/types/product";

// onClick 시 실행할 "함수"를 리턴함 - 즉, 이 함수를 반환값을 비교하기 버튼 onClick에 전달하면 됨
export default function useCompareModal(
	product: ProductDetail,
	accessToken: string,
) {
	const { openModal, closeModal } = useModalActions();

	const {
		numberOfProducts,
		isAlreadyStoredProduct,
		getCurrentProductPosition,
		addProduct,
		deleteProduct,
	} = useCompareStore((state) => state);

	const { id, name } = product;

	// 1. 로그인 여부 - 로그인을 안한 경우 "로그인 요청 모달"
	if (!accessToken) {
		return () => {
			const modalId = openModal(
				<MovingPageModal
					description="로그인 후 이용하시겠습니까?"
					closeModal={() => closeModal(modalId)}
					url="/signin"
				/>,
			);
		};
	}

	// 2. 이미 store에 저장된 상품인 경우 - store에서 삭제
	if (isAlreadyStoredProduct(id)) {
		return () => {
			const position = getCurrentProductPosition(id);
			position && deleteProduct(position as CompareStatePosition);
		};
	}

	// 3. 비교하기에 상품 추가
	switch (numberOfProducts) {
		case 0:
			return () => {
				addProduct({ id, name });
			};

		case 1:
			return () => {
				addProduct({ id, name });
				const modalId = openModal(
					<MovingPageModal
						description="상품이 담겼습니다. 바로 확인 해보시겠습니까?"
						closeModal={() => closeModal(modalId)}
						url="/compare"
					/>,
				);
			};

		case 2:
			return () => {
				const modalId = openModal(
					<ChangeProductModal
						currentId={id}
						currentName={name}
						closeModal={() => closeModal(modalId)}
					/>,
				);
			};

		default:
			const invalid = numberOfProducts;
			throw new Error(
				`You can save up to 2 products - invalid number of products stored: ${invalid}`,
			);
	}
}
