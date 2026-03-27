import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Select } from './Select';

const meta = {
  title: 'Components/Select',
  component: Select,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Story par défaut pour Select
 */
export const Default: Story = {
  args: {
    value: 'Valeur par défaut',
    onChange: () => console.log('onChange'),
    options: [],
    label: 'Valeur par défaut',
  },
};

/**
 * Variantes pour Select
 */
