import type { Meta, StoryObj } from "@storybook/react";

import OAuthLayout from "@/components/auth/OAuthLayout";

const meta = {
	title: "Components/Auth/OAuthLayout",
	component: OAuthLayout,
} satisfies Meta<typeof OAuthLayout>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
	args: {},
};
