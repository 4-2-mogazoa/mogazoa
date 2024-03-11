import type { Meta, StoryObj } from "@storybook/react";

import ReviewerProfile from "@/components/common/reviewerProfile/ReviewerProfile";

const meta = {
	title: "Components/Common/ReviewerProfile",
	component: ReviewerProfile,
	tags: ["autodocs"],
	parameters: {
		layout: "centered",
	},
} satisfies Meta<typeof ReviewerProfile>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		reviewerData: {
			image: "/images/testImage.png",
			rank: 1,
			nickname: "리뷰왕",
			followersCount: 123,
			reviewCount: 456,
		},
	},
};
