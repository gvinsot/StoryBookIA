import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Grid } from './Grid';

const meta = {
  title: 'Components/Grid',
  component: Grid,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Grid>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Story par défaut pour Grid
 */
export const Default: Story = {
  args: {
    children: 'Contenu de Grid',
    columns: 12,
    gap: 16,
  },
};

/**
 * Variantes pour Grid
 */
