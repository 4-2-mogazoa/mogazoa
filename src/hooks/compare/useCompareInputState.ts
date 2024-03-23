import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";

import { getProducts } from "@/apis/products";
import useCompareStore from "@/store/compare";
import { ProductsResponse } from "@/types/product";

import useOutsideClick from "../common/useOutsideClick";

export default function useCompareInputState(
	position: "firstProduct" | "secondProduct",
	setIsFormError: Dispatch<SetStateAction<boolean>>,
) {
	const { products, addProduct, deleteProduct } = useCompareStore();

	const [keyword, setKeyword] = useState("");
	const [productList, setProductList] = useState<ProductsResponse>();
	const [errorMessage, setErrorMessage] = useState("");
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);

	const dropdownRef = useOutsideClick<HTMLDivElement>(() =>
		setIsDropdownOpen(false),
	);

	// input - 키워드 입력
	const handleKeyWordChange = async (e: ChangeEvent<HTMLInputElement>) => {
		const keyword = e.target.value;

		if (!keyword) {
			setIsDropdownOpen(false);
			return;
		}

		setKeyword(keyword);

		const data = await getProducts(keyword);

		if (data.list.length) {
			setProductList(data);
			setIsDropdownOpen(true);
		}
	};

	// 드롭박스에서 상품을 클릭하지 않고, 상품 이름 전체를 "입력"하는 경우
	const handleInputBlur = () => {
		if (products[position]) return;

		if (!keyword) {
			setErrorMessage("상품 이름을 입력해 주세요.");
			setIsFormError(true);
			return;
		}

		const product = productList?.list.find(({ name }) => keyword == name);

		if (!product) {
			setErrorMessage("상품 이름을 다시 확인해 주세요.");
			setIsFormError(true);
			return;
		}

		const { id, name } = product;
		const errorMessage = addProduct({ id, name }, position);

		if (errorMessage) {
			setErrorMessage(errorMessage);
			setIsFormError(true);
			return;
		}

		setErrorMessage("");
		setIsFormError(false);
		setIsDropdownOpen(false);
	};

	// nameTag - delete 버튼
	const handleDeleteProduct = () => {
		setErrorMessage("");
		setIsFormError(false);
		deleteProduct(position);
	};

	// 드롭박스 - 상품 선택
	const handleAddProduct = (id: number, name: string) => {
		const product = { id, name };

		const errorMessage = addProduct(product, position);

		setIsDropdownOpen(false);

		if (errorMessage) {
			setErrorMessage(errorMessage);
			setIsFormError(true);
			return;
		}

		setErrorMessage("");
		setIsFormError(false);
	};

	// 드롭박스 - 스크롤
	const handleLoadMoreProducts = async (nextCursor: number) => {
		const data = await getProducts(keyword);

		if (data) {
			setProductList(
				(prev) =>
					prev && {
						nextCursor: data.nextCursor,
						list: [...prev.list, ...data.list],
					},
			);
		}
	};

	return {
		data: { keyword, productList, errorMessage, isDropdownOpen, dropdownRef },
		handlerFn: {
			handleKeyWordChange,
			handleAddProduct,
			handleInputBlur,
			handleDeleteProduct,
			handleLoadMoreProducts,
		},
	};
}
