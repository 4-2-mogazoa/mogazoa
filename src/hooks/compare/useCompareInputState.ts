import { ChangeEvent, KeyboardEvent, useState } from "react";

import { getProducts } from "@/apis/products";
import useCompareStore from "@/store/compare";
import { CompareStatePosition } from "@/types/compare";
import { ProductsResponse } from "@/types/product";

import useOutsideClick from "../common/useOutsideClick";

export default function useCompareInputState(position: CompareStatePosition) {
	const { products, addProduct, deleteProduct } = useCompareStore();

	const [keyword, setKeyword] = useState("");
	const [productList, setProductList] = useState<ProductsResponse>();
	const [errorMessage, setErrorMessage] = useState("");
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);
	const [focusIndex, setFocusIndex] = useState(-1);

	const dropdownRef = useOutsideClick<HTMLDivElement>(() =>
		setIsDropdownOpen(false),
	);

	// input - 키워드 입력
	const handleKeyWordChange = async (e: ChangeEvent<HTMLInputElement>) => {
		const keyword = e.target.value;

		setKeyword(keyword);

		if (keyword === "") {
			setIsDropdownOpen(false);
			setProductList(undefined);
			setFocusIndex(-1);
			return;
		}

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
			return;
		}

		const product = productList?.list.find(({ name }) => keyword == name);

		if (!product) {
			setErrorMessage("상품 이름을 다시 확인해 주세요.");
			return;
		}

		const { id, name } = product;
		const errorMessage = addProduct({ id, name }, position);

		setKeyword("");

		if (errorMessage) {
			setErrorMessage(errorMessage);
			return;
		}

		setErrorMessage("");
		setIsDropdownOpen(false);
	};

	// nameTag - delete 버튼
	const handleDeleteProduct = () => {
		setErrorMessage("");
		deleteProduct(position);
	};

	// 드롭박스 - 상품 선택
	const handleAddProduct = (id: number, name: string) => {
		const product = { id, name };

		const errorMessage = addProduct(product, position);

		setIsDropdownOpen(false);
		setKeyword("");
		setFocusIndex(-1);

		if (errorMessage) {
			setErrorMessage(errorMessage);
			return;
		}

		setErrorMessage("");
	};

	// 드롭박스 - 스크롤
	const handleLoadMoreProducts = async (nextCursor: number) => {
		const data = await getProducts(keyword, undefined, undefined, nextCursor);

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

	// 드롭박스 - 상하 방향키로 이동
	const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
		if (!productList?.list) return;

		if (e.key === "Escape") {
			setFocusIndex(-1);

			return;
		}

		if (e.key === "Enter") {
			if (keyword.trim() === "") return;

			const { id, name } = productList.list[focusIndex];

			handleAddProduct(id, name);
			setFocusIndex(-1);
			setKeyword("");

			return;
		}

		if (e.key === "ArrowDown") {
			if (focusIndex >= productList.list.length - 1) {
				setFocusIndex(() => 0);
				setKeyword(productList.list[0]["name"]);
			} else {
				setFocusIndex((prev) => prev + 1);
				setKeyword(productList.list[focusIndex + 1]["name"]);
			}
		}

		if (e.key === "ArrowUp") {
			if (focusIndex === -1) return;

			if (focusIndex === 0) {
				setFocusIndex(productList.list.length - 1);
				setKeyword(productList.list[productList.list.length - 1]["name"]);
			} else {
				setFocusIndex((prev) => prev - 1);
				setKeyword(productList.list[focusIndex - 1]["name"]);
			}
		}

		if (e.key === "ArrowUp" || e.key === "ArrowDown") {
			const keywordLength = keyword.length + 20;
			const input = e.target as HTMLInputElement;

			setTimeout(() => {
				input.setSelectionRange(keywordLength, keywordLength);
				input.scrollLeft = keywordLength * 20;
			});
		}
	};

	return {
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
			handleAddProduct,
			handleInputBlur,
			handleDeleteProduct,
			handleLoadMoreProducts,
			handleKeyDown,
		},
	};
}
