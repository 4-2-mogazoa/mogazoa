import type { Meta, StoryObj } from "@storybook/react";

import AddImageBox from "../components/common/inputs/AddImageBox";

const meta = {
	title: "Components/Common/Input/AddImageBox",
	component: AddImageBox,
} satisfies Meta<typeof AddImageBox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
	args: {},
};
