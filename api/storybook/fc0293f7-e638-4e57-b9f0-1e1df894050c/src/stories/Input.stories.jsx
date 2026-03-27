import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Input } from './Input';

const meta = {
  title: 'Components/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Story par défaut pour Input
 */
export const Default: Story = {
  args: {
    value: 'Valeur par défaut',
    onChange: () => console.log('onChange'),
    placeholder: 'Valeur par défaut',
    label: 'Valeur par défaut',
    error: 'Valeur par défaut',
    disabled: false,
  },
};

/**
 * Variantes pour Input
 */
