import { FolloweesResponse, FollowersResponse } from "@/types/user";

import instance from "./axiosInstance";

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
