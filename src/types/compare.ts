export type CompareProperty = "rating" | "reviewCount" | "favoriteCount";

export type ResultOfComparison = {
	rating: number;
	reviewCount: number;
	favoriteCount: number;
};

export type WinningProduct = {
	name: string;
	numberOfWins: number;
	tagColor: "white" | "green" | "pink";
};
