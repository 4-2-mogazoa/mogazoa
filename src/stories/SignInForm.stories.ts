import type { Meta, StoryObj } from "@storybook/react";

import SignInForm from "@/components/auth/form/SignInForm";

const meta = {
	title: "Components/Auth/SignInForm",
	component: SignInForm,
} satisfies Meta<typeof SignInForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
	args: {},
};
