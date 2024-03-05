import type { Meta, StoryObj } from "@storybook/react";

import TextBox from "../components/commons/TextBox";

const meta = {
	title: "Commons/Input/TextBox",
	component: TextBox,
	tags: ["autodocs"],
} satisfies Meta<typeof TextBox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
	args: {},
};
