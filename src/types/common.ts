export type Response<T> = {
	nextCursor: number;
	list: T[];
};

export type Base = {
	id: number;
	createdAt: string;
	updatedAt: string;
};

export type Category = Base & {
	name: string;
};

export type CategoryList =
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
