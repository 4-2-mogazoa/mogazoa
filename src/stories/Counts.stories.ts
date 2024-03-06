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

export const AtTablet: Story = {
	args: {
		gapBreakpoint: "atTablet",
		children: "글 123",
	},
};

export const AtPc: Story = {
	args: {
		gapBreakpoint: "atPc",
		children: "글 123",
	},
};
