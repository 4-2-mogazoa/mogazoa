import type { Meta, StoryObj } from "@storybook/react";

import index from "@/pages/signin";

const meta = {
	title: "Page/Auth/SignIn",
	component: index,
} satisfies Meta<typeof index>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
	args: {},
};
