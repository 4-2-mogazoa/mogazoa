import type { Meta, StoryObj } from "@storybook/react";
import { userEvent, within } from "@storybook/test";

import CategoryFilterButton from "@/components/common/categoryFilterButton/CategoryFilter";

const meta = {
	title: "Components/Common/CategoryFilterButton",
	component: CategoryFilterButton,
	tags: ["autodocs"],
	parameters: {
		layout: "centered",
	},
} satisfies Meta<typeof CategoryFilterButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		category: "카테고리",
		handleButtonClick: () => console.log("카테고리"),
	},
};

export const Selected: Story = {
	args: {
		category: "가구/인테리어",
		handleButtonClick: () => console.log("선택된 카테고리"),
	},
};

export const ClickCategoryFilterButton = {
	args: {
		category: "카테고리",
		handleButtonClick: () => alert("성공"),
	},
	play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
		const canvas = within(canvasElement);
		const button = canvas.getByRole("button");
		await userEvent.click(button);
	},
};
