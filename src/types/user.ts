import { Base, Response } from "./common";

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
