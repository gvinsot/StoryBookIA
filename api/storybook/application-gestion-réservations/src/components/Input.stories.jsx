import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Input } from './Input';

const meta = {
  title: 'Components/Input',
  component: Input,
  tags: ['autodocs'],
  argTypes: {
    value: { control: 'text' },
    onChange: { control: 'action' },
    placeholder: { control: 'text' },
    label: { control: 'text' },
    error: { control: 'text' },
    disabled: { control: 'boolean' }
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Story par défaut pour Input
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
    placeholder: 'placeholder value',,
    label: 'label value',,
    error: 'error value',,
    disabled: true,
  },
};

/**
 * Input avec label
 */
export const WithLabel: Story = {
  args: {
    label: 'Email Address',
    placeholder: 'Enter your email',
  },
};

/**
 * Input avec erreur
 */
export const WithError: Story = {
  args: {
    label: 'Email Address',
    value: 'invalid-email',
    error: 'Please enter a valid email address',
  },
};

/**
 * Input désactivé
 */
export const Disabled: Story = {
  args: {
    label: 'Read Only Field',
    value: 'Cannot edit this',
    disabled: true,
  },
};

export default meta;
