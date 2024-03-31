import { Base, Response } from "./common";

export type User = Base & {
	teamId: string;
	nickname: string;
	image: string;
	description: string;
};

export type UserDetail = User & {
	mostFavoriteCategory: {
		name: string;
		id: number;
	};
	averageRating: number;
	reviewCount: number;
	followeesCount: number;
	followersCount: number;
	isFollowing: boolean;
};

export type Followee = {
	followee: User;
	id: number;
};

export type Follower = {
	follower: User;
	id: number;
};

export type FolloweesResponse = Response<Followee>;
export type FollowersResponse = Response<Follower>;

export type UserResponseByVariant = {
	followee: FolloweesResponse;
	follower: FollowersResponse;
};

export type UsersRanking = {
	id: number;
	nickname: string;
	image: string | null;
	teamId: string;
	followersCount: number;
	reviewCount: number;
	createdAt: string;
	rank: number;
};

export type UserUpdateRequestBody = {
	nickname: string;
	description: string;
	image?: string;
};
