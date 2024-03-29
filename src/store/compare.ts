import { create } from "zustand";
import { persist } from "zustand/middleware";

type ProductInfo = { id: number; name: string };

type Position = "firstProduct" | "secondProduct";

type State = {
	numberOfProducts: number;
	products: {
		firstProduct: ProductInfo | null;
		secondProduct: ProductInfo | null;
	};
};

type Action = {
	getEmptyPosition: () => string;
	addProduct: (newProducts: ProductInfo, position?: Position) => void;
	deleteProduct: (position: Position) => void;
	changeProduct: (newProducts: ProductInfo, position: Position) => void;
	clearProducts: () => void;
};

const initialState = {
	firstProduct: null,
	secondProduct: null,
};

const useCompareStore = create(
	persist<State & Action>(
		(set, get) => ({
			numberOfProducts: 0,
			products: initialState,

			getEmptyPosition: () => {
				let emptyPosition = "";

				if (get().products.firstProduct === null) {
					emptyPosition = "firstProduct";
				}

				if (get().products.secondProduct === null) {
					emptyPosition = "secondProduct";
				}

				return emptyPosition;
			},

			addProduct: (newProducts, position) => {
				if (Object.values(get().products).every(Boolean)) return;

				const emptyPosition = position ? position : get().getEmptyPosition();

				if (!emptyPosition) return;

				set((prev) => ({
					products: { ...prev.products, [emptyPosition]: newProducts },
					numberOfProducts: prev.numberOfProducts++,
				}));
			},

			deleteProduct: (position) =>
				set((prev) => ({
					products: { ...prev.products, [position]: null },
					numberOfProducts: prev.numberOfProducts--,
				})),

			changeProduct: (newProducts, position) =>
				set((prev) => ({
					products: { ...prev.products, [position]: newProducts },
				})),

			clearProducts: () => set({ products: initialState, numberOfProducts: 0 }),
		}),

		{
			name: "compareProductsStorage",
		},
	),
);

export default useCompareStore;

// 나중에 사용하는 곳에서 로그아웃 시 로컬스토리지를 비우는 함수 작성 ?

// 예시 ?
// import useCompareStore from "@/store/compare";

// const clearCompareProductsStorage = useCompareStore.persist.clearStorage;

// const handleLogoutButtonClick = async () => {
// 	const isLogout = await logOut();

// 	if (isLogout) {
// 		clearProducts();
//     clearCompareProductsStorage();
// 	}
// };
