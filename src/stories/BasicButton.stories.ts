import { Meta, StoryObj } from "@storybook/react";
import { userEvent, within } from "@storybook/test";

import BasicButton from "../components/common/button/BasicButton";

const meta = {
	title: "Components/Common/BasicButton",
	component: BasicButton,
	tags: ["autodocs"],
	args: {
		label: "가입하기",
	},
} satisfies Meta<typeof BasicButton>;

export default meta;

export const Primary: StoryObj<typeof BasicButton> = {
	args: {
		variant: "primary",
	},
};

export const Secondary: StoryObj<typeof BasicButton> = {
	args: {
		variant: "secondary",
	},
};

export const Tertiary: StoryObj<typeof BasicButton> = {
	args: {
		variant: "tertiary",
	},
};

const handleClick = () => {
	alert("클릭");
};

export const ClickBasicButton = {
	args: {
		variant: "secondary",
		onClick: handleClick,
		disabled: true,
	},
	play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
		const canvas = within(canvasElement);
		const button = canvas.getByRole("button");
		await userEvent.click(button);
	},
};
