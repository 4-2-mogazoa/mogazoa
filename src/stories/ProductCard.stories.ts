import type { Meta, StoryObj } from "@storybook/react";

import ProductCard from "@/components/common/productcard/ProductCard";

const meta = {
	title: "Components/Common/ProductCard",
	component: ProductCard,
	tags: ["autodocs"],
	parameters: {
		layout: "centered",
	},
} satisfies Meta<typeof ProductCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Rate: Story = {
	args: {
		productName: "다이슨 슈퍼소닉 블루",
		imageData: "/images/supersonic.svg",
		reviewCount: 129,
		likeCount: 34,
		rate: 4.7,
	},
};
