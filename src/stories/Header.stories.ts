import type { Meta, StoryObj } from '@storybook/react';

import Header from '@/components/common/menu/Header';

const meta = {
  title: 'Components/Common/Header',
  component: Header,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof Header>;

export default meta;

type Story = StoryObj<typeof meta>;

export const LoggedIn: Story = {
  args: {
    user: {
      id: 1,
    },
  },
};

export const LoggedOut: Story = {
  args:{},
};
