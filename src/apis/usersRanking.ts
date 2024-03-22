import { UsersRanking } from "@/types/usersRanking";

import instance from "./axiosInstance";

export const getUsersRanking = async() => {
  try {
    const response = await instance.get("/users/ranking");
    const data = response.data;
    const sortedData = data.sort((a: UsersRanking, b: UsersRanking) => {
      if (b.reviewCount !== a.reviewCount) {
        return b.reviewCount - a.reviewCount;
      } else {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
    });
    const top5Data = sortedData.slice(0, 5).map((userData: UsersRanking, index: number) => ({
      ...userData,
      rank: index + 1
    }));
    return top5Data;
  } catch (error) {
    throw error;
  } 
};
