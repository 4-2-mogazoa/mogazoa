export type Category = {
	updatedAt: string;
	createdAt: string;
	name: string;
	id: number;
};

export type Response<T> = {
	nextCursor: number;
	list: T[];
};
