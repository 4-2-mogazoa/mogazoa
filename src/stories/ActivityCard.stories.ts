import type { Meta, StoryObj } from "@storybook/react";

import ActivityCard from "@/components/common/activitycard/ActivityCard";

const meta = {
	title: "Components/Common/ActivityCard",
	component: ActivityCard,
	tags: ["autodocs"],
	parameters: {
		layout: "centered",
	},
} satisfies Meta<typeof ActivityCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Rate: Story = {
	args: {
		type: "rate",
		myRateAvg: 4.1,
	},
	argTypes: {
		type: { control: { disable: true } },
		myReivewCount: { control: { disable: true } },
		category: { control: { disable: true } },
	},
};

export const MyReivewCount: Story = {
	args: {
		type: "review",
		myReivewCount: 125,
	},
	argTypes: {
		type: { control: { disable: true } },
		myRateAvg: { control: { disable: true } },
		category: { control: { disable: true } },
	},
};

export const Category: Story = {
	args: {
		type: "category",
		category: "전자기기",
	},
	argTypes: {
		type: { control: { disable: true } },
		myRateAvg: { control: { disable: true } },
		myReivewCount: { control: { disable: true } },
	},
};
