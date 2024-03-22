import type { Meta, StoryObj } from "@storybook/react";

import ProductDetailPageLayout from "@/components/productdetail/ProductDetailPageLayout";

const meta = {
	title: "Components/ProductDetail/ProductDetailPageLayout",
	component: ProductDetailPageLayout,
	tags: ["autodocs"],
	parameters: {
		layout: "centered",
	},
} satisfies Meta<typeof ProductDetailPageLayout>;

export default meta;

type Story = StoryObj<typeof meta>;

export const ProductDetailPage: Story = {};
