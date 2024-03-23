import { UsersRanking } from "@/types/usersRanking";

import instance from "./axiosInstance";

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
