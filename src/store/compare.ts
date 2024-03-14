import { create } from "zustand";

import { Products } from "@/types/products";

type State = {
	products: Products[];
};

type Action = {
	addProducts: (newProducts: Products) => void;
	deleteProducts: (products: Products) => void;
	changeProducts: (newProducts: Products, prevProducts: Products) => void;
};

// todo: 페이지를 새로 고침하면 상태가 리셋되는 문제

const useCompareStore = create<State & Action>((set) => ({
	// question: 배열 vs 객체 ?
	products: [],

	addProducts: (newProducts) =>
		set((prev) => ({ products: [...prev.products, newProducts] })),

	deleteProducts: (products) =>
		set((prev) => ({
			products: prev.products.filter(({ id }) => id !== products.id),
		})),

	// todo: 실제 구현 시 prevProducts를 어떻게 받아오나? - 다른 방법으로 구현해야 할 듯...?
	changeProducts: (newProducts, prevProducts) =>
		set((prev) => ({
			products: [
				...prev.products,
				(prev.products[prev.products.indexOf(prevProducts)] = newProducts),
			],
		})),
}));

export default useCompareStore;
