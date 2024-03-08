import type { Meta, StoryObj } from "@storybook/react";

import Count from "@/components/common/counts/Count";

const meta = {
	title: "Components/Common/Count",
	component: Count,
	tags: ["autodocs"],
	parameters: {
		layout: "centered",
	},
} satisfies Meta<typeof Count>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Large: Story = {
	args: {
		size: "large",
		text: "조회",
		count: 43234,
	},
};

export const Medium: Story = {
	args: {
		size: "medium",
		text: "리뷰",
		count: 132,
	},
};

export const Small: Story = {
	args: {
		size: "small",
		text: "팔로워",
		count: 23,
	},
};
