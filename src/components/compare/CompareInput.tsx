import useCompareInputState from "@/hooks/compare/useCompareInputState";

import ProductNameTag from "../common/productNameTag/ProductNameTag";
import CompareDropdown from "./CompareDropdown";

type Props = {
	position: "firstProduct" | "secondProduct";
	label: "상품 1" | "상품 2";
	product?: { id: number; name: string } | null;
	tagColor: "green" | "pink";
};

export default function CompareInput({
	position,
	label,
	product,
	tagColor,
}: Props) {
	const {
		data: {
			keyword,
			productList,
			errorMessage,
			isDropdownOpen,
			dropdownRef,
			focusIndex,
		},
		handlerFn: {
			handleKeyWordChange,
			handleInputBlur,
			handleAddProduct,
			handleDeleteProduct,
			handleLoadMoreProducts,
			handleKeyDown,
		},
	} = useCompareInputState(position);

	return (
		<div className="flex flex-col gap-4">
			<label
				className="text-[1.4rem] text-white lg:text-[1.6rem]"
				htmlFor={position}
			>
				{label}
			</label>
			<div className="relative flex h-[5.5rem] w-full items-center justify-center rounded-[0.8rem] bg-black-border p-px focus-within:bg-main-gradient lg:h-[7rem]">
				<div className="flex size-full items-center rounded-[0.8rem] bg-black-bg px-[2rem] py-[2.3rem] text-[1.4rem] text-white lg:text-[1.6rem] lg:leading-[2.2.rem]">
					{product?.name ? (
						<ProductNameTag
							color={tagColor}
							productName={product.name}
							handleDeleteButtonClick={handleDeleteProduct}
							//TODO: text overflow 처리 좀 더 좋은 방법
							className="md:truncate"
						/>
					) : (
						<input
							className="w-full border-none bg-inherit outline-none"
							id={position}
							value={keyword}
							type="text"
							autoComplete="off"
							onChange={handleKeyWordChange}
							onBlur={handleInputBlur}
							onKeyDown={handleKeyDown}
						/>
					)}
				</div>
				{isDropdownOpen && (
					<CompareDropdown
						focusIndex={focusIndex}
						dropdownRef={dropdownRef}
						productList={productList}
						handleAddProduct={handleAddProduct}
						handleLoadMoreProducts={handleLoadMoreProducts}
					/>
				)}
			</div>
			<p className="-mt-2 h-[1.8rem] text-[1.2rem] text-white lg:h-[2.1rem] lg:text-[1.4rem]">
				{errorMessage}
			</p>
		</div>
	);
}
