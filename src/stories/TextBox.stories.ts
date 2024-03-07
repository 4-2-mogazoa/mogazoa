import type { Meta, StoryObj } from "@storybook/react";

import TextBox from "../components/common/inputs/TextBox";

const meta = {
	title: "Components/Common/Input/TextBox",
	component: TextBox,
} satisfies Meta<typeof TextBox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
	args: {},
};
