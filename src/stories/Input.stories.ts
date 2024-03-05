import type { Meta, StoryObj } from "@storybook/react";
import Input from "../components/Input";

const meta = {
	component: Input,
	tags: ["autodocs"],
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
	args: {
		inputType: "email",
		size: "lg",
		variant: "default",
	},
};

export const Email: Story = {
	args: {
		inputType: "email",
		size: "lg",
		variant: "default",
	},
};

export const Password: Story = {
	args: {
		inputType: "password",
		size: "lg",
		variant: "default",
	},
};

export const Nickname: Story = {
	args: {
		inputType: "nickname",
		size: "lg",
		variant: "default",
	},
};

export const Textfield: Story = {
	args: {
		inputType: "textfield",
		size: "lg",
		variant: "default",
	},
};
