import clsx from "clsx";
import { forwardRef, useState } from "react";

import useCompareStore from "@/store/compare";
import { useModalActions } from "@/store/modal";
import { CompareStatePosition, StoredProductInfo } from "@/types/compare";

import BasicButton from "../common/button/BasicButton";
import MovingPageModal from "./MovingPageModal";

type Props = {
	currentId: number;
	currentName: string;
	closeModal: () => void;
	focusableElements: React.MutableRefObject<null[] | HTMLElement[]>;
};

type State = {
	position: CompareStatePosition | undefined;
	product: StoredProductInfo;
};

export default function ChangeProductModal({
	currentId,
	currentName,
	closeModal: closeChangeProductModal,
	focusableElements,
}: Props) {
	const [selectedProduct, setSelectedProduct] = useState<State>({
		position: undefined,
		product: {
			id: 0,
			name: "",
		},
	});

	const { openModal, closeModal: closeMovePageModal } = useModalActions();

	const {
		products: { firstProduct, secondProduct },
		changeProduct,
	} = useCompareStore((state) => state);

	if (!firstProduct || !secondProduct) return;

	const compareStatePositionArray: CompareStatePosition[] = [
		"firstProduct",
		"secondProduct",
	];

	const handleSelectProduct = (
		position: CompareStatePosition,
		product: StoredProductInfo,
	) => {
		setSelectedProduct({ position, product });
	};

	const handleChangeProduct = () => {
		const newProduct = { id: currentId, name: currentName };

		const changePosition = compareStatePositionArray.find(
			(position) => position !== selectedProduct.position,
		);

		if (!changePosition) return;

		changeProduct(newProduct, changePosition);
		closeChangeProductModal();

		const modalId = openModal(
			<MovingPageModal
				description="비교 상품이 교체되었습니다. 바로 확인해 보시겠어요?"
				closeModal={() => closeMovePageModal(modalId)}
				url="/compare"
				focusableElements={focusableElements}
			/>,
		);
	};

	return (
		<section className="_flex-col-center w-[29.5rem] gap-12 md:w-[50rem] md:gap-[4.5rem] lg:gap-16">
			<div className="_flex-col-center text-[2rem] font-semibold leading-[2.8rem] text-white lg:text-[2.4rem] lg:leading-normal">
				<p>{`지금 보신 "${currentName}"을`}</p>
				<p>어떤 상품과 비교할까요?</p>
			</div>
			<div className="_flex-col-center w-full gap-4 md:gap-6 lg:gap-8">
				<ProductBox
					product={firstProduct}
					position={compareStatePositionArray[0]}
					selected={selectedProduct.product.id === firstProduct.id}
					handleSelectProduct={handleSelectProduct}
					ref={(el: HTMLButtonElement) => (focusableElements.current[1] = el)}
				/>
				<ProductBox
					product={secondProduct}
					position={compareStatePositionArray[1]}
					selected={selectedProduct.product.id === secondProduct.id}
					handleSelectProduct={handleSelectProduct}
					ref={(el: HTMLButtonElement) => (focusableElements.current[2] = el)}
				/>
			</div>
			<BasicButton
				label="확인"
				variant="primary"
				disabled={secondProduct.id === 0}
				onClick={handleChangeProduct}
				className="w-full"
				ref={(el) => (focusableElements.current[3] = el)}
			/>
		</section>
	);
}

type ProductBoxProps = {
	product: StoredProductInfo;
	position: CompareStatePosition;
	selected: boolean;
	handleSelectProduct: (
		position: CompareStatePosition,
		product: StoredProductInfo,
	) => void;
};

const ProductBox = forwardRef(function ProductBox(
	{ product, position, selected, handleSelectProduct }: ProductBoxProps,
	ref?: React.LegacyRef<HTMLButtonElement> | undefined,
) {
	return (
		<button
			className={clsx(
				"_flex-center w-full cursor-pointer rounded-[0.8rem] border border-solid p-[2.4rem] text-[1.6rem] font-semibold lg:text-[1.8rem]",
				selected
					? "border-pink text-pink"
					: "border-black-border text-gray-200",
			)}
			onClick={() => handleSelectProduct(position, product)}
			ref={ref}
			type="button"
		>
			{product.name}
		</button>
	);
});
