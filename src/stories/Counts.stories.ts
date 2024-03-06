import type { Meta, StoryObj } from "@storybook/react";

import Counts from "../components/common/Counts";

const meta: Meta<typeof Counts> = {
	title: "Common/Counts",
	component: Counts,
	parameters: {
		layout: "centered",
	},
};

export default meta;
type Story = StoryObj<typeof meta>;

export const AtTablet: Story = {
	args: {
		gapBreakpoint: "tablet",
	},
};

export const AtPc: Story = {
	args: {
		gapBreakpoint: "pc",
	},
};
