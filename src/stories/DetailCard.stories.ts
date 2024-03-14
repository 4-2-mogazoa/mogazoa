import type { Meta, StoryObj } from "@storybook/react";

import DetailCard from "@/components/productdetail/DetailCard";

const meta = {
	title: "Components/Common/DetailCard",
	component: DetailCard,
	tags: ["autodocs"],
	parameters: {
		layout: "centered",
	},
} satisfies Meta<typeof DetailCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Product: Story = {
	args: {
		productData: {
			id: 1,
			name: "Sony WH-1000XM3",
			description:
				"한층 업그레이된 고급 노이즈 캔슬과 상황에 맞게 조정되는 스마트 청취 기능을 갖춘 WH-1000XM3 헤드폰으로 더욱 깊은 고요 속에서 청취할 수 있습니다.",
			image: "/images/headset.svg",
			rating: 0,
			reviewCount: 0,
			favoriteCount: 0,
			categoryId: 1,
			createdAt: "",
			updatedAt: "",
			writerId: 1,
			isFavorite: true,
			category: {
				id: 1,
				name: "전자기기",
			},
		},
		isMyProduct: false,
	},
};

export const MyProduct: Story = {
	args: {
		productData: {
			id: 1,
			name: "Sony WH-1000XM3",
			description:
				"한층 업그레이된 고급 노이즈 캔슬과 상황에 맞게 조정되는 스마트 청취 기능을 갖춘 WH-1000XM3 헤드폰으로 더욱 깊은 고요 속에서 청취할 수 있습니다.",
			image: "/images/headset.svg",
			rating: 0,
			reviewCount: 0,
			favoriteCount: 0,
			categoryId: 1,
			createdAt: "",
			updatedAt: "",
			writerId: 1,
			isFavorite: true,
			category: {
				id: 1,
				name: "전자기기",
			},
		},
		isMyProduct: true,
	},
};
