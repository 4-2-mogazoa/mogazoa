import { Images, Me, Review, ReviewDelete } from "@/types/review";

import instance from "./axiosInstance";

export async function postReviewLike(reviewid: number) {
	const res = await instance.post<Review>(`reviews/${reviewid}/like`);

	return res.data;
}

export async function deleteReviewLike(reviewid: number) {
	const res = await instance.delete<Review>(`reviews/${reviewid}/like`);

	return res.data;
}

export async function createReview(
	productId: number,
	images: string[],
	content: string,
	rating: number,
) {
	const params = { productId, images, content, rating };
	const res = await instance.post<Review>("reviews", {
		params,
	});

	return res.data;
}

export async function deleteReview(reviewid: number) {
	const res = await instance.delete<ReviewDelete>(`reviews/${reviewid}`);

	return res.data;
}

export async function modifyReview(
	reviewid: number,
	images: Images,
	content: string,
	rating: number,
) {
	const params = { images, content, rating };
	const res = await instance.patch<Review>(`reviews/${reviewid}`, { params });

	return res.data;
}

export async function getUserMe() {
	const res = await instance.get<Me>("users/me");

	return res.data;
}
