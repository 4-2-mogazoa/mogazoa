import { Meta, StoryObj } from "@storybook/react";
import { userEvent, within } from "@storybook/test";

import Dropdown from "@/components/common/dropdown/Dropdown";

const meta = {
	title: "Components/Common/Dropdown",
	component: Dropdown,
	tags: ["autodocs"],
} satisfies Meta<typeof Dropdown>;

export default meta;

const categories = [
	{
		id: 1,
		name: "음악",
		createdAt: "2024-01-29T09:08:53.506Z",
		updatedAt: "2024-01-29T09:08:53.506Z",
	},
	{
		id: 2,
		name: "영화/드라마",
		createdAt: "2024-01-29T09:08:53.506Z",
		updatedAt: "2024-01-29T09:08:53.506Z",
	},
	{
		id: 3,
		name: "강의/책",
		createdAt: "2024-01-29T09:08:53.506Z",
		updatedAt: "2024-01-29T09:08:53.506Z",
	},
	{
		id: 4,
		name: "호텔",
		createdAt: "2024-01-29T09:08:53.506Z",
		updatedAt: "2024-01-29T09:08:53.506Z",
	},
	{
		id: 5,
		name: "가구/인테리어",
		createdAt: "2024-01-29T09:08:53.506Z",
		updatedAt: "2024-01-29T09:08:53.506Z",
	},
	{
		id: 6,
		name: "식당",
		createdAt: "2024-01-29T09:08:53.506Z",
		updatedAt: "2024-01-29T09:08:53.506Z",
	},
	{
		id: 7,
		name: "전자기기",
		createdAt: "2024-01-29T09:08:53.506Z",
		updatedAt: "2024-01-29T09:08:53.506Z",
	},
	{
		id: 8,
		name: "화장품",
		createdAt: "2024-01-29T09:08:53.506Z",
		updatedAt: "2024-01-29T09:08:53.506Z",
	},
	{
		id: 9,
		name: "의류/잡화",
		createdAt: "2024-01-29T09:08:53.506Z",
		updatedAt: "2024-01-29T09:08:53.506Z",
	},
	{
		id: 10,
		name: "앱",
		createdAt: "2024-01-29T09:08:53.506Z",
		updatedAt: "2024-01-29T09:08:53.506Z",
	},
];

const filterBy = [
	{
		id: 0,
		name: "최신순",
	},
	{
		id: 1,
		name: "별점 높은순",
	},
	{
		id: 2,
		name: "좋아요순",
	},
];

export const BasicDropdown: StoryObj<typeof Dropdown> = {
	args: {
		items: categories,
		onSelect: (item) => console.log(`선택된 항목: ${item.name}`),
		children: (
			<>
				<Dropdown.Button variant={"basic"} placeholder="카테고리 선택" />
				<Dropdown.List />
			</>
		),
	},
};

export const SmallDropdown: StoryObj<typeof Dropdown> = {
	args: {
		items: filterBy,
		defaultItem: filterBy[0],
		onSelect: (item) => console.log(`선택된 항목: ${item.name}`),
		children: (
			<>
				<Dropdown.Button variant={"small"} />
				<Dropdown.List />
			</>
		),
	},
};

export const FilteredDropdown: StoryObj<typeof Dropdown> = {
	args: {
		items: categories,
		onSelect: (item) => console.log(`선택된 항목: ${item.name}`),
		children: (
			<>
				<Dropdown.Input placeholder="카테고리 선택" />
				<Dropdown.List />
			</>
		),
	},
};
