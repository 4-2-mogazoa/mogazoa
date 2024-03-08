import type { Meta, StoryObj } from "@storybook/react";

import Ranking from "@/components/common/ranking/Ranking";

const meta = {
	title: "Components/Common/Ranking",
	component: Ranking,
	tags: ["autodocs"],
	parameters: {
		layout: "centered",
	},
} satisfies Meta<typeof Ranking>;

export default meta;
type Story = StoryObj<typeof meta>;

export const First: Story = {
	args: {
		rank: 1,
	},
};

export const Second: Story = {
	args: {
		rank: 2,
	},
};

export const Third: Story = {
	args: {
		rank: 3,
	},
};

export const Fourth: Story = {
	args: {
		rank: 4,
	},
};

export const Fifth: Story = {
	args: {
		rank: 5,
	},
};
