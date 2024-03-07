import type { Meta, StoryObj } from "@storybook/react";
import { userEvent, within } from "@storybook/test";

import Thumbs from "@/components/common/thumbs/Thumbs";

const meta = {
	title: "Components/Common/Thumbs",
	component: Thumbs,
	tags: ["autodocs"],
	parameters: {
		layout: "centered",
	},
} satisfies Meta<typeof Thumbs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		isLiked: false,
		likeCount: 16,
		handleButtonClick: () => console.log("좋아요!"),
	},
};

export const Up: Story = {
	args: {
		isLiked: true,
		likeCount: 17,
		handleButtonClick: () => console.log("좋아요 취소!"),
	},
};

export const ClickDefaultButton = {
	args: {
		isLiked: false,
		likeCount: 16,
		handleButtonClick: () => alert("좋아요!"),
	},
	play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
		const canvas = within(canvasElement);
		const button = canvas.getByRole("button");
		await userEvent.click(button);
	},
};

export const ClickUpButton = {
	args: {
		isLiked: true,
		likeCount: 17,
		handleButtonClick: () => alert("좋아요 취소!"),
	},
	play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
		const canvas = within(canvasElement);
		const button = canvas.getByRole("button");
		await userEvent.click(button);
	},
};
