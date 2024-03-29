import { ChangeEvent, useState } from "react";

import { getProducts } from "@/apis/products";
import useCompareStore from "@/store/compare";
import { ProductsResponse } from "@/types/product";

import { CompareInputProps } from "./../../components/compare/CompareInput";

export default function useCompareInputState({
	position,
	setIsError,
}: CompareInputProps) {
	const [keyword, setKeyword] = useState("");
	const [productList, setProductList] = useState<ProductsResponse>();

	const [errorMessage, setErrorMessage] = useState("");

	const { products, addProduct, deleteProduct } = useCompareStore();

	// input에서
	const handleKeyWordChange = async (e: ChangeEvent<HTMLInputElement>) => {
		const keyword = e.target.value;
		setKeyword(keyword);

		const data = await getProducts(keyword);
		setProductList(data);
	};

	// 드롭박스에서 상품을 선택하지 않고, 상품 이름 전체를 "입력"하는 사용자
	const handleInputBlur = () => {
		// 에러인 상태에서 다시 상품 이름을 제대로 입력하고 focus out을 했을 때, 에러 상태가 계속 true로 남는 것을 방지하기 위해 -> 제대로 동작하는지는 테스트 안 해봄.
		setIsError(false);

		// 드롭박스에서 상품을 선택했다면, keyword를 ""로 초기화시키고 있어서, 이걸 조건으로 줌 -> 주석이 없다면 뭘 의미하는지 알아보기 힘들 것 같다.
		// if (!keyword) return;

		// 전역 상태에 추가된 상품이 존재한다면, return하도록 -> 가독성은 있는데, zustand에 저장한 결과가 바로 리렌더링되는지 모르겠다.
		if (products[position]) return;

		const result = productList?.list.find(({ id, name }) => {
			if (keyword === name) {
				addProduct({ id, name }, position);
				return;
			}
		});

		if (!result) {
			setErrorMessage("상품 이름을 다시 확인해 주세요.");
			setIsError(true);
		}
	};

	// nameTag에서
	const handleDeleteProduct = () => {
		deleteProduct(position);
	};

	// 드롭박스에서
	// TODO: enter key 눌렀을 때도 동작하도록 구현 ? (& 키보드 방향키로 움직일 수 있도록 구현 ?)
	const handleAddProduct = (id: number, name: string) => {
		const product = { id, name };

		setKeyword("");

		addProduct(product, position);
	};

	return {
		data: { productList, errorMessage },
		handlerFn: {
			handleKeyWordChange,
			handleAddProduct,
			handleInputBlur,
			handleDeleteProduct,
		},
	};
}
