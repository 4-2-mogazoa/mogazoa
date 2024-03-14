import instance from "../axiosInstance";

export default async function getProducts(productId: number) {
	const res = await instance.get(`products/${productId}`);
	const data = res.data;

	return data;
}
