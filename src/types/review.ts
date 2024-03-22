import { StringToBoolean } from "class-variance-authority/types";

import { Response } from "./common";

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

export type ReviewDelete = {
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

export type Images = [
	{
		id: number;
	},
	{
		source: string;
	},
];

export type Me = {
	id: number;
	nickname: string;
	description: string;
	image: string;
	createdAt: string;
	updatedAt: string;
	teamId: string;
	isFollowing: boolean;
	followersCount: number;
	followeesCount: number;
	reviewCount: number;
	averageRating: number;
	mostFavoriteCategory: {
		id: number;
		name: string;
	};
};
