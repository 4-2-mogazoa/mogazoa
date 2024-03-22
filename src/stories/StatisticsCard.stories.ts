import type { Meta, StoryObj } from "@storybook/react";

import StatisticsCard from "@/components/common/statisticscard/StatisticsCard";

const meta = {
	title: "Components/Common/StatisticsCard",
	component: StatisticsCard,
	tags: ["autodocs"],
	parameters: {
		layout: "centered",
	},
} satisfies Meta<typeof StatisticsCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Rate: Story = {
	args: {
		type: "rate",
		rateData: 4.9,
		rateAvg: 4.1,
	},
	argTypes: {
		type: { control: { disable: true } },
		likeData: { control: { disable: true } },
		likeAvg: { control: { disable: true } },
		reviewData: { control: { disable: true } },
		reviewAvg: { control: { disable: true } },
	},
};

export const Like: Story = {
	args: {
		type: "like",
		likeData: 566,
		likeAvg: 589,
	},
	argTypes: {
		type: { control: { disable: true } },
		rateData: { control: { disable: true } },
		rateAvg: { control: { disable: true } },
		reviewData: { control: { disable: true } },
		reviewAvg: { control: { disable: true } },
	},
};

export const Review: Story = {
	args: {
		type: "review",
		reviewData: 4123,
		reviewAvg: 3937,
	},
	argTypes: {
		type: { control: { disable: true } },
		rateData: { control: { disable: true } },
		rateAvg: { control: { disable: true } },
		likeData: { control: { disable: true } },
		likeAvg: { control: { disable: true } },
	},
};

export const Equal: Story = {
	args: {
		type: "review",
		reviewData: 4123,
		reviewAvg: 4123,
	},
	argTypes: {
		type: { control: { disable: true } },
		rateData: { control: { disable: true } },
		rateAvg: { control: { disable: true } },
		likeData: { control: { disable: true } },
		likeAvg: { control: { disable: true } },
	},
};
