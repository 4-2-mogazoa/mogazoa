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
	isAlreadyStoredProduct: (id: number) => boolean;
	getCurrentProductPosition: (id: number) => string | undefined;
	addProduct: (
		newProduct: ProductInfo,
		position?: Position,
	) => string | undefined;
	deleteProduct: (position: Position) => void;
	changeProduct: (newProduct: ProductInfo, position: Position) => void;
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
				} else if (get().products.secondProduct === null) {
					emptyPosition = "secondProduct";
				}

				return emptyPosition;
			},

			isAlreadyStoredProduct: (id: number) =>
				Object.values(get().products).some((product) => product?.id === id),

			getCurrentProductPosition: (id: number) => {
				for (const [position, product] of Object.entries(get().products)) {
					if (product?.id === id) return position;
				}
				return undefined;
			},

			addProduct: (newProduct, position) => {
				if (Object.values(get().products).every(Boolean))
					return "상품은 2개까지만 비교 가능합니다.";

				if (get().isAlreadyStoredProduct(newProduct.id))
					return "이미 비교하기에 담긴 상품입니다.";

				const emptyPosition = position ? position : get().getEmptyPosition();

				if (!emptyPosition) return "상품은 2개까지만 비교 가능합니다.";

				set((prev) => ({
					products: { ...prev.products, [emptyPosition]: newProduct },
					numberOfProducts: (prev.numberOfProducts += 1),
				}));
			},

			deleteProduct: (position) =>
				set((prev) => ({
					products: { ...prev.products, [position]: null },
					numberOfProducts: (prev.numberOfProducts -= 1),
				})),

			changeProduct: (newProduct, position) =>
				set((prev) => ({
					products: { ...prev.products, [position]: newProduct },
				})),

			clearProducts: () => set({ products: initialState, numberOfProducts: 0 }),
		}),

		{
			name: "compareProductsStorage",
		},
	),
);

export default useCompareStore;

// export const clearCompareProductsStorage = useCompareStore.persist.clearStorage;
