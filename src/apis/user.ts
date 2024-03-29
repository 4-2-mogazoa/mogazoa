import { FolloweesResponse, FollowersResponse, UsersRanking } from "@/types/user";

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

export const getUsersRanking = async() => {
  try {
    const response = await instance.get("/users/ranking");
    const data = response.data;
    const top5Data = data.slice(0, 5).map((userData: UsersRanking, index: number) => ({
      ...userData,
      rank: index + 1
    }));
    return top5Data;
  } catch (error) {
    throw error;
  } 
};
