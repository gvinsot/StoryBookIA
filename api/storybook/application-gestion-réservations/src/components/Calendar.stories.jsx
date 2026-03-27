import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Calendar } from './Calendar';

const meta = {
  title: 'Components/Calendar',
  component: Calendar,
  tags: ['autodocs'],
  argTypes: {
    value: { control: 'text' },
    onChange: { control: 'action' },
    minDate: { control: 'text' },
    maxDate: { control: 'text' },
    disabledDates: { control: 'text' }
  },
} satisfies Meta<typeof Calendar>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Story par défaut pour Calendar
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
    minDate: 'minDate value',,
    maxDate: 'maxDate value',,
    disabledDates: [],
  },
};

export default meta;
