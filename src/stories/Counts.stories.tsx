import type { Meta, StoryObj } from "@storybook/react";

import Counts from "@/components/common/counts/Counts";

const meta = {
	title: "Components/Common/Counts",
	component: Counts,
	parameters: {
		layout: "centered",
	},
} satisfies Meta<typeof Counts>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Sigle: Story = {
	args: {
		children: <Counts.Count size="large" text="조회" count={12335} />,
	},
};

export const Double: Story = {
	args: {
		children: [
			// eslint-disable-next-line react/jsx-key
			<Counts.Count size="small" text="팔로워" count={123} />,
			// eslint-disable-next-line react/jsx-key
			<Counts.Count size="small" text="리뷰" count={35} />,
		],
	},
};
