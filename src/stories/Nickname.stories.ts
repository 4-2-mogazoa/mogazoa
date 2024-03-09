import type { Meta, StoryObj } from "@storybook/react";

import Nickname from "@/components/common/nickname/Nickname";

const meta = {
	title: "Components/Common/Nickname",
	component: Nickname,
	tags: ["autodocs"],
	parameters: {
		layout: "centered",
	},
} satisfies Meta<typeof Nickname>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Small: Story = {
	args: {
		size: "small",
		nickname: "리뷰왕",
	},
};

export const Large: Story = {
	args: {
		size: "large",
		nickname: "미끄럼틀",
	},
};
