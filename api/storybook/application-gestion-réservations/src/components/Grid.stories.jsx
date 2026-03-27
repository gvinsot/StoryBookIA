import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Grid } from './Grid';

const meta = {
  title: 'Components/Grid',
  component: Grid,
  tags: ['autodocs'],
  argTypes: {
    children: { control: 'text' },
    columns: { control: 'text' },
    gap: { control: 'text' }
  },
} satisfies Meta<typeof Grid>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Story par défaut pour Grid
 */
export const Default: Story = {
  args: {
    columns: 12,
    gap: 16,
  },
};

/**
 * Story avec tous les props
 */
export const AllProps: Story = {
  args: {
    children: <div>Content</div>,,
    columns: 'columns value',,
    gap: 'gap value',
  },
};

export default meta;
