import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Badge } from './Badge';

const meta = {
  title: 'Components/Badge',
  component: Badge,
  tags: ['autodocs'],
  argTypes: {
    children: { control: 'text' },
    variant: { control: 'text' },
    size: { control: 'text' }
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Story par défaut pour Badge
 */
export const Default: Story = {
  args: {
    variant: 'primary',
    size: 'medium',
  },
};

/**
 * Story avec tous les props
 */
export const AllProps: Story = {
  args: {
    children: <div>Content</div>,,
    variant: 'variant value',,
    size: 'size value',
  },
};

export default meta;
