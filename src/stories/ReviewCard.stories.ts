import type { Meta, StoryObj } from "@storybook/react";

import ReviewCard from "@/components/productdetail/ReviewCard";

const meta = {
	title: "Components/ProductDetail/ReviewCard",
	component: ReviewCard,
	tags: ["autodocs"],
	parameters: {
		layout: "centered",
	},
} satisfies Meta<typeof ReviewCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Review: Story = {
	args: {
		reviewData: {
			user: {
				image: "/images/profile1.svg",
				nickname: "리뷰왕",
				id: 1,
			},
			reviewImages: [
				{
					source: "/images/test1.jpg",
					id: 1,
				},
				{
					source: "/images/test2.png",
					id: 2,
				},
			],
			productId: 1,
			userId: 112,
			updatedAt: "2024-01-29",
			createdAt: "2024-01-27",
			isLiked: true,
			likeCount: 132,
			content:
				"음질 미칩니다ㅎㅎ 최고예용~ 어플 연동으로 음향 설정 및 설정모드 되고, 설정별로 사운드감이 틀려요 서라운드 느낌까지 들고, 따로는 베이스깐 우퍼 느낌도 있어요",
			rating: 5,
			id: 1,
		},
		isMyReview: false,
	},
};

export const MyReview: Story = {
	args: {
		reviewData: {
			user: {
				image: "/images/profile1.svg",
				nickname: "리뷰왕",
				id: 1,
			},
			reviewImages: [
				{
					source: "/images/test1.jpg",
					id: 1,
				},
				{
					source: "/images/test2.png",
					id: 2,
				},
			],
			productId: 1,
			userId: 112,
			updatedAt: "2024-01-29",
			createdAt: "2024-01-27",
			isLiked: true,
			likeCount: 132,
			content:
				"음질 미칩니다ㅎㅎ 최고예용~ 어플 연동으로 음향 설정 및 설정모드 되고, 설정별로 사운드감이 틀려요 서라운드 느낌까지 들고, 따로는 베이스깐 우퍼 느낌도 있어요",
			rating: 5,
			id: 1,
		},
		isMyReview: true,
	},
};

export const NoneImgReview: Story = {
	args: {
		reviewData: {
			user: {
				image: "/images/profile1.svg",
				nickname: "리뷰왕",
				id: 1,
			},
			reviewImages: [],
			productId: 1,
			userId: 112,
			updatedAt: "2024-01-29",
			createdAt: "2024-01-27",
			isLiked: true,
			likeCount: 132,
			content:
				"음질 미칩니다ㅎㅎ 최고예용~ 어플 연동으로 음향 설정 및 설정모드 되고, 설정별로 사운드감이 틀려요 서라운드 느낌까지 들고, 따로는 베이스깐 우퍼 느낌도 있어요",
			rating: 5,
			id: 1,
		},
		isMyReview: false,
	},
};
