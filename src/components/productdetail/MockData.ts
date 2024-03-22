import { ProductDetail, ReviewResponse } from "@/types/product";

export const productDetailData: ProductDetail = {
	id: 1,
	name: "Sony WH-1000XM3",
	description:
		"한층 업그레이된 고급 노이즈 캔슬과 상황에 맞게 조정되는 스마트 청취 기능을 갖춘 WH-1000XM3 헤드폰으로 더욱 깊은 고요 속에서 청취할 수 있습니다.",
	image: "/images/headset.svg",
	rating: 4.9,
	reviewCount: 4123,
	favoriteCount: 566,
	categoryId: 1,
	createdAt: "2024-03-18",
	updatedAt: "2024-03-18",
	writerId: 1,
	isFavorite: true,
	category: {
		id: 1,
		name: "전자기기",
	},
	categoryMetric: {
		rating: 4.1,
		favoriteCount: 543,
		reviewCount: 3937,
	},
};

export const reviewData: ReviewResponse = {
	nextCursor: 0,
	list: [
		{
			user: {
				image: "/images/profile1.svg",
				nickname: "테스트1",
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
			userId: 1,
			updatedAt: "2024-01-29",
			createdAt: "2024-01-27",
			isLiked: true,
			likeCount: 14,
			content:
				"음질 미칩니다ㅎㅎ 최고예용~ 어플 연동으로 음향 설정 및 설정모드 되고, 설정별로 사운드감이 틀려요 서라운드 느낌까지 들고, 따로는 베이스깐 우퍼 느낌도 있어요",
			rating: 5,
			id: 1,
		},
		{
			user: {
				image: "/images/profile1.svg",
				nickname: "테스트2",
				id: 1,
			},
			reviewImages: [],
			productId: 1,
			userId: 2,
			updatedAt: "2024-01-23",
			createdAt: "2024-01-24",
			isLiked: false,
			likeCount: 11,
			content:
				"전작과 동일하게, 소니 헤드폰 커넥트 애플리케이션을 통한 노이즈 캔슬링 컨트롤이 가능하다. 1000XM2에 있었던 대기압 센서도 그대로 탑재!",
			rating: 3,
			id: 2,
		},
		{
			user: {
				image: "/images/profile1.svg",
				nickname: "테스트3",
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
				{
					source: "/images/testImage.png",
					id: 3,
				},
			],
			productId: 1,
			userId: 3,
			updatedAt: "2024-01-25",
			createdAt: "2024-01-26",
			isLiked: true,
			likeCount: 42,
			content: "구려요",
			rating: 1,
			id: 3,
		},
	],
};
