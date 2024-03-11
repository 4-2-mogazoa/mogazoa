import type { Meta, StoryObj } from '@storybook/react';

import { SideBar } from '@/components/common/menu/SideBar';

const meta = {
  title: 'Components/Common/SideBar',
  component: SideBar,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: {
        type: 'select',
        options: ['medium', 'large'],
      },
    },
  },
} satisfies Meta<typeof SideBar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const MediumLoggedIn: Story = {
  args: {
    size: 'medium',
    user: {
      id: 1,
    },
  },
};

export const MediumLoggedOut: Story = {
  args: {
    size: 'medium',
  }
};

export const LargeLoggedIn: Story = {
  args:{
    size: 'large',
    user: {
      id: 1,
    },
  },
};

export const LargeLoggedOut: Story = {
  args: {
    size: 'large',
  }
};
