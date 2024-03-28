import { ProductsResponse, UserProductType } from "@/types/product";
import {
	FolloweesResponse,
	FollowersResponse,
	UserDetail,
	UsersRanking,
} from "@/types/user";

import instance from "./axiosInstance";

export const getMe = async (): Promise<UserDetail> => {
	const response = await instance.get<UserDetail>(`users/me`);
	return response.data;
};

export const patchUpdateMe = async ({
	nickname,
	description,
	// image,
}: {
	nickname: string;
	description: string;
	// image?: string;
}) => {
	const response = await instance.patch<{
		nickname: string;
		description: string;
		image?: string;
	}>("users/me", {
		nickname,
		description,
		// image,
	});
	return response.data;
};

export const getUserDetail = async (userId: number): Promise<UserDetail> => {
	const response = await instance.get<UserDetail>(`users/${userId}`);
	return response.data;
};

export const getUserFollowees = async (
	userId: number,
	cursor?: number,
): Promise<FolloweesResponse> => {
	const cursorParam = cursor ? `?cursor=${cursor}` : "";
	const response = await instance.get<FolloweesResponse>(
		`users/${userId}/followees${cursorParam}`,
	);
	return response.data;
};

export const getUserFollowers = async (
	userId: number,
	cursor?: number,
): Promise<FollowersResponse> => {
	const cursorParam = cursor ? `?cursor=${cursor}` : "";
	const response = await instance.get<FollowersResponse>(
		`users/${userId}/followers${cursorParam}`,
	);
	return response.data;
};

export const getUserProducts = async (
	userId: number,
	productType: UserProductType,
	cursor?: number,
): Promise<ProductsResponse> => {
	const cursorParam = cursor ? `?cursor=${cursor}` : "";
	const response = await instance.get<ProductsResponse>(
		`users/${userId}/${productType}${cursorParam}`,
	);
	return response.data;
};

export const getUsersRanking = async () => {
	try {
		const response = await instance.get("/users/ranking");
		const data = response.data;
		const top5Data = data
			.slice(0, 5)
			.map((userData: UsersRanking, index: number) => ({
				...userData,
				rank: index + 1,
			}));
		return top5Data;
	} catch (error) {
		throw error;
	}
};
