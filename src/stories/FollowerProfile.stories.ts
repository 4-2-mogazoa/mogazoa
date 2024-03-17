import type { Meta, StoryObj } from "@storybook/react";

import FollowerProfile from "@/components/common/followerProfile/FollowerProfile";

const meta = {
	title: "Components/Common/FollowerProfile",
	component: FollowerProfile,
	tags: ["autodocs"],
	parameters: {
		layout: "centered",
	},
} satisfies Meta<typeof FollowerProfile>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		image: "/images/testImage.png",
		nickname: "리뷰왕",
	},
};

export const NoImage: Story = {
	args: {
		image: null,
		nickname: "리뷰왕",
	},
};
