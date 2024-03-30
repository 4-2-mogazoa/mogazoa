import { CategoryList, Response } from "./common";

export type ProductDetail = {
	id: number;
	name: string;
	description: string;
	image: string;
	rating: number;
	reviewCount: number;
	favoriteCount: number;
	categoryId: number;
	createdAt: string;
	updatedAt: string;
	writerId: number;
	isFavorite: boolean;
	category: {
		id: number;
		name: CategoryList;
	};
	categoryMetric: {
		rating: number;
		favoriteCount: number;
		reviewCount: number;
	};
};

export type Product = {
	id: number;
	name: string;
	image: string;
	rating: number;
	reviewCount: number;
	favoriteCount: number;
	categoryId: number;
	createdAt: string;
	updatedAt: string;
	writerId: number;
};

export type ProductsResponse = Response<Product>;

export type UserProductType =
	| "created-products"
	| "reviewed-products"
	| "favorite-products";
