import type { Meta, StoryObj } from "@storybook/react";

import CategoryBadge from "@/components/common/categoryBadge/CategoryBadge";

const meta = {
	title: "Components/Common/CategoryBadge",
	component: CategoryBadge,
	tags: ["autodocs"],
	parameters: {
		layout: "centered",
	},
} satisfies Meta<typeof CategoryBadge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Music: Story = {
	args: {
		size: "responsive",
		category: "음악",
	},
};

export const Movie: Story = {
	args: {
		size: "large",
		category: "영화/드라마",
	},
};

export const Book: Story = {
	args: {
		size: "small",
		category: "강의/책",
	},
};

export const Hotel: Story = {
	args: {
		size: "small",
		category: "호텔",
	},
};

export const Interior: Story = {
	args: {
		size: "small",
		category: "가구/인테리어",
	},
};

export const Restaurant: Story = {
	args: {
		size: "small",
		category: "식당",
	},
};

export const Electronics: Story = {
	args: {
		size: "small",
		category: "전자기기",
	},
};

export const Cosmetics: Story = {
	args: {
		size: "small",
		category: "화장품",
	},
};

export const Clothes: Story = {
	args: {
		size: "small",
		category: "의류/잡화",
	},
};

export const App: Story = {
	args: {
		size: "small",
		category: "앱",
	},
};
