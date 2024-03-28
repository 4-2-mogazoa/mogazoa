import { Product, ProductsResponse } from "@/types/product";

import instance from "./axiosInstance";

export async function getProducts(
	keyword?: string,
	categoryId?: number,
	order?: "recent" | "rating" | "reviewCount",
	cursor?: number,
) {
	const params = { keyword, categoryId, order, cursor };

	const res = await instance.get<ProductsResponse>("products", {
		params,
	});

	return res.data;
}

export async function getProductDetail(productId: number) {
	const res = await instance.get<Product>(`products/${productId}`);
	const data = res.data;

	return data;
}
