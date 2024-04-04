import type { Meta, StoryObj } from "@storybook/react";

import AddImageBox from "../components/common/inputs/AddImageBox";

const meta = {
	title: "Components/Common/Input/AddImageBox",
	component: AddImageBox,
} satisfies Meta<typeof AddImageBox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
	args: {
		previewImage:
			"https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Mogazoa/user/72/1712242947013/XL.jpg",
		setNextImage: () => {},
		setPreviewImage: () => {},
	},
};
