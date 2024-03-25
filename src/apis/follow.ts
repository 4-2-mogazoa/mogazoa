import { UserDetail } from "@/types/user";

import instance from "./axiosInstance";

export const postFollow = async (userId: number): Promise<UserDetail> => {
	const response = await instance.post<UserDetail>("follow", { userId });
	return response.data;
};

export const deleteFollow = async (userId: number): Promise<UserDetail> => {
	const response = await instance.delete<UserDetail>("follow", {
		data: { userId },
	});
	return response.data;
};
