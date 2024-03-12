export type Base = {
	id: number;
	createdAt: string;
	updatedAt: string;
};

export type Category = Base & {
	name: string;
};
