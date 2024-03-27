import instance from "./axiosInstance";

export const getCategories = async() => {
  try {
    const response = await instance.get("/categories");
    const data = response.data;
    return data;
  } catch (error) {
    throw error;
  } 
};
