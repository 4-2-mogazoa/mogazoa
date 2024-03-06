import type { Meta, StoryObj } from "@storybook/react";

import ProfileImage from "@/components/common/profileImage/ProfileImage";

import TestImage from "../../public/images/textImage.png";

const meta = {
	title: "Components/Common/ProfileImage",
	component: ProfileImage,
	tags: ["autodocs"],
	parameters: {
		layout: "centered",
	},
} satisfies Meta<typeof ProfileImage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Ranking: Story = {
	args: {
		variant: "ranking",
		src: TestImage,
	},
};

export const Follower: Story = {
	args: {
		variant: "follower",
		src: TestImage,
	},
};

export const Profile: Story = {
	args: {
		variant: "profile",
		src: TestImage,
	},
};
