import { ProductDetail, ProductNamesResponse, ProductsResponse } from "@/types/product";

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
	const res = await instance.get<ProductDetail>(`products/${productId}`);
	const data = res.data;

	return data;
}

export async function patchProductDetail(productId: number) {
	const res = await instance.patch<ProductDetail>(`products/${productId}`);
	return res.data;
}

export async function getProductNames() {
			const res = await instance.get<ProductNamesResponse>("products");
			const data = res.data;
			const names = data.list.map(product => product.name);
			return names;
}
