export type Products = {
	id: number;
	name: string;
	image: string;
	rating: number;
	reviewCount: number;
	favoriteCount: number;
	categoryId: number;
	createdAt: string;
	updatedAt: string;
	writerId: number;
	isFavorite: boolean;
	description: string;
	category: {
		id: number;
		name: string;
	};
	categoryMetric: {
		rating: number;
		favoriteCount: number;
		reviewCount: number;
	};
};

export type ProductsInList = {
	id: number;
	name: string;
	image: string;
	rating: number;
	reviewCount: number;
	favoriteCount: number;
	categoryId: number;
	createdAt: string;
	updatedAt: string;
	writerId: number;
};

export type ProductsList = {
	nextCursor: number;
	list: ProductsInList[];
};
