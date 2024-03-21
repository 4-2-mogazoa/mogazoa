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

export type ReviewResponse = Response<Review>;

export type Review = {
	user: {
		image: string | null;
		nickname: string;
		id: number;
	};
	reviewImages: ReviewImages[];
	productId: number;
	userId: number;
	updatedAt: string;
	createdAt: string;
	isLiked: boolean;
	likeCount: number;
	content: string;
	rating: number;
	id: number;
};

export type ReviewImages = {
	source: string;
	id: number;
};
