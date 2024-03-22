import { Base } from "./common";

export type User = Base & {
	teamId: string;
	nickname: string;
	image: string;
};

export type UserDetail = User & {
	followeesCount: number;
	followersCount: number;
	isFollowing: boolean;
	description: string;
};
