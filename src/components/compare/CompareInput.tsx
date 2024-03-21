import { Dispatch, SetStateAction } from "react";

import useCompareInputState from "@/hooks/compare/useCompareInputState";

import ProductNameTag from "../common/productNameTag/ProductNameTag";

export type CompareInputProps = {
	position: "firstProduct" | "secondProduct";
	label: "상품 1" | "상품 2";
	product?: { id: number; name: string } | null;
	tagColor: "green" | "pink";
	setIsError: Dispatch<SetStateAction<boolean>>;
};

export default function CompareInput(props: CompareInputProps) {
	const { position, label, product, tagColor, setIsError } = props;

	const {
		data: { productList, errorMessage },
		handlerFn: {
			handleKeyWordChange,
			handleInputBlur,
			handleAddProduct,
			handleDeleteProduct,
		},
	} = useCompareInputState(props);

	return (
		<div className="flex flex-col gap-4">
			<label
				className="text-[1.4rem] text-white lg:text-[1.6rem]"
				htmlFor={position}
			>
				{label}
			</label>
			{/* todo: md 사이즈에서 input width가 늘어나지 않고 고정되어 있는 문제 */}
			<div className="relative flex h-[5.5rem] w-full items-center justify-center rounded-[0.8rem] bg-black-border p-px focus-within:bg-main-gradient lg:h-[7rem]">
				<div className="flex size-full items-center rounded-[0.8rem] bg-black-bg px-[2rem] py-[2.3rem] text-[1.4rem] text-white lg:text-[1.6rem] lg:leading-[2.2.rem]">
					{product?.name ? (
						<ProductNameTag
							color={tagColor}
							productName={product.name}
							handleDeleteButtonClick={handleDeleteProduct}
						/>
					) : (
						<input
							className="w-full border-none bg-inherit outline-none"
							id={position}
							type="text"
							autoComplete="off"
							onChange={handleKeyWordChange}
							onBlur={handleInputBlur}
						/>
					)}
				</div>
				{productList && <div>드롭다운</div>}
			</div>
			<p className="-mt-2 h-[1.8rem] text-[1.2rem] text-white lg:h-[2.1rem] lg:text-[1.4rem]">
				{errorMessage}
			</p>
		</div>
	);
}
