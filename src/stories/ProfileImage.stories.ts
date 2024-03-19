import type { Meta, StoryObj } from "@storybook/react";

import ProfileImage from "@/components/common/profileImage/ProfileImage";

import TestImage from "../../public/images/testImage.png";

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
		size: "small",
		src: TestImage,
	},
};

export const Follower: Story = {
	args: {
		size: "medium",
		src: TestImage,
	},
};

export const Profile: Story = {
	args: {
		size: "large",
		src: TestImage,
	},
};
