import { ProductDetail, ProductsResponse } from "@/types/product";
import { ReviewResponse } from "@/types/review";

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

export async function getReviews({
	productId,
	order,
	cursor,
}: {
	productId: number;
	order?: "recent" | "ratingDesc" | "ratingAsc" | "likeCount";
	cursor?: number | null;
}) {
	const params = { productId, order, cursor };

	const res = await instance.get<ReviewResponse>(
		`products/${productId}/reviews`,
		{
			params,
		},
	);

	return res.data;
}

export async function postFavorite(productId: number) {
	const res = await instance.post<ProductDetail>(
		`products/${productId}/favorite`,
	);

	return res.data;
}

export async function deleteFavorite(productId: number) {
	const res = await instance.delete<ProductDetail>(
		`products/${productId}/favorite`,
	);

	return res.data;
}
