export type Category = {
	updatedAt: string;
	createdAt: string;
	name: string;
	id: number;
};

export type ProductDetail = {
	id: number;
	name: string;
	description: string;
	image: string;
	rating: number;
	reviewCount: number;
	favoriteCount: number;
	categoryId: number;
	createdAt: string;
	updatedAt: string;
	writerId: number;
	isFavorite: boolean;
	category: {
		id: number;
		name:
			| "음악"
			| "영화/드라마"
			| "강의/책"
			| "호텔"
			| "가구/인테리어"
			| "식당"
			| "전자기기"
			| "화장품"
			| "의류/잡화"
			| "앱";
	};
};
