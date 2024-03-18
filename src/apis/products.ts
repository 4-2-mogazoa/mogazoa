import { Product, ProductsResponse } from "@/types/product";

import instance from "./axiosInstance";

export async function getProducts(
	keyword?: string,
	categoryId?: number,
	order?: "recent" | "rating" | "reviewCount",
	cursor?: number,
) {
	const keywordQuery = keyword ? `&keyword=${keyword}` : "";
	const categoryQuery = categoryId ? `&category=${categoryId}` : "";
	const orderQuery = order ? `&order=${order}` : "";
	const cursorQuery = cursor ? `&cursor=${cursor}` : "";

	const query = `?${keywordQuery}${categoryQuery}${orderQuery}${cursorQuery}`;

	const res = await instance.get<ProductsResponse>(`products${query}`);

	return res.data;
}

export async function getProductDetail(productId: number) {
	const res = await instance.get<Product>(`products/${productId}`);
	const data = res.data;

	return data;
}
