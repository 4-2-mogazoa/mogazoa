import type { Meta, StoryObj } from "@storybook/react";

import ReviewModalLayout from "@/components/productdetail/ReviewModalLayout";

const meta = {
	title: "Components/ProductDetail/ReviewModalLayout",
	component: ReviewModalLayout,
	tags: ["autodocs"],
	parameters: {
		layout: "centered",
	},
} satisfies Meta<typeof ReviewModalLayout>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Create: Story = {
	args: {
		type: "create",
	},
};

export const Modify: Story = {
	args: {
		type: "modify",
	},
};
