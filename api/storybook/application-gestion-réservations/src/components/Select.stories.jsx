import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Select } from './Select';

const meta = {
  title: 'Components/Select',
  component: Select,
  tags: ['autodocs'],
  argTypes: {
    value: { control: 'text' },
    onChange: { control: 'action' },
    options: { control: 'text' },
    label: { control: 'text' }
  },
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Story par défaut pour Select
 */
export const Default: Story = {
  args: {

  },
};

/**
 * Story avec tous les props
 */
export const AllProps: Story = {
  args: {
    value: 'value value',,
    onChange: () => console.log("test"),,
    options: [],,
    label: 'label value',
  },
};

export default meta;
