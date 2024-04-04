import type { Meta, StoryObj } from "@storybook/react";

import { SideBar } from "@/components/common/menu/SideBar";

const meta = {
	title: "Components/Common/SideBar",
	component: SideBar,
	tags: ["autodocs"],
} satisfies Meta<typeof SideBar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const LoggedIn: Story = {
	args: {},
};

export const LoggedOut: Story = {
	args: {},
};
