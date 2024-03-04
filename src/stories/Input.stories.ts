import type { Meta, StoryObj } from "@storybook/react";
import Input from "../components/Input";

const meta = {
	component: Input,
	tags: ["autodocs"],
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
	args: {
		placeholderValue: "이메일을 입력해 주세요",
		labelValue: "이메일",
		errorMsg: "잘못된 이메일입니다.",
		size: "lg",
		variant: "default",
	},
};
