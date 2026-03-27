import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Calendar } from './Calendar';

const meta = {
  title: 'Components/Calendar',
  component: Calendar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Calendar>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Story par défaut pour Calendar
 */
export const Default: Story = {
  args: {
    value: undefined,
    onChange: () => console.log('onChange'),
    minDate: undefined,
    maxDate: undefined,
    disabledDates: [],
  },
};

/**
 * Variantes pour Calendar
 */
