import type { Meta, StoryObj } from "@storybook/react";
import { userEvent, within } from "@storybook/test";

import ProductNameTag from "@/components/common/productNameTag/ProductNameTag";

const meta = {
	title: "Components/Common/ProductNameTag",
	component: ProductNameTag,
	tags: ["autodocs"],
	parameters: {
		layout: "centered",
	},
} satisfies Meta<typeof ProductNameTag>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Green: Story = {
	args: {
		color: "green",
		productName: "비교 상품 1",
	},
};

export const Pink: Story = {
	args: {
		color: "pink",
		productName: "비교 상품 2",
	},
};

export const ClickDeleteButton = {
	args: {
		color: "pink",
		productName: "비교 상품 2",
		handleDeleteButtonClick: () => alert("삭제됨!"),
	},
	play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
		const canvas = within(canvasElement);
		const button = canvas.getByRole("button");
		await userEvent.click(button);
	},
};
