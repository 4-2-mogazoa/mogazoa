import type { Meta, StoryObj } from "@storybook/react";

import Input from "../components/common/inputs/Input";

const meta = {
	title: "Commons/Input/Input",
	component: Input,
	tags: ["autodocs"],
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
	args: {
		inputType: "email",
		variant: "default",
	},
};

export const Email: Story = {
	args: {
		inputType: "email",
		variant: "default",
	},
};

export const Password: Story = {
	args: {
		inputType: "password",
		variant: "default",
	},
};

export const Nickname: Story = {
	args: {
		inputType: "nickname",
		variant: "default",
	},
};

export const Textfield: Story = {
	args: {
		inputType: "textfield",
		variant: "default",
	},
};
