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


export async function getProductsName() {
	const res = await instance.get("products");
	const products: ProductDetail[] = res.data.list;
	return products;
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
	const params = { order, cursor };

	const res = await instance.get<ReviewResponse>(
		`products/${productId}/reviews`,
		{
			params,
		},
	);

	return res.data;
}

export async function postFavorite(productId: number) {
	await instance.post<ProductDetail>(`products/${productId}/favorite`);
}

export async function deleteFavorite(productId: number) {
	await instance.delete<ProductDetail>(`products/${productId}/favorite`);
}

export async function postProducts(categoryId: number, image: string, description: string, name: string) {
  const response = await instance.post('/products', {
    categoryId,
    image,
    description,
    name
  });
	return response.data;
}

export async function patchProduct(productId:number, categoryId: number, image: string, description: string, name: string) {
	const response = await instance.patch(`products/${productId}`, {
		categoryId,
		image,
		description,
		name
	});
	return response.data;
}
