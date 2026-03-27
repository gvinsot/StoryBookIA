import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Notification } from './Notification';

const meta = {
  title: 'Components/Notification',
  component: Notification,
  tags: ['autodocs'],
  argTypes: {
    message: { control: 'text' },
    type: { control: 'text' },
    duration: { control: 'text' },
    onClose: { control: 'action' }
  },
} satisfies Meta<typeof Notification>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Story par défaut pour Notification
 */
export const Default: Story = {
  args: {
    type: 'info',
    duration: 3000,
  },
};

/**
 * Story avec tous les props
 */
export const AllProps: Story = {
  args: {
    message: 'message value',,
    type: 'type value',,
    duration: 'duration value',,
    onClose: () => console.log("test"),
  },
};

/**
 * Notification info
 */
export const Info: Story = {
  args: {
    message: 'This is an informational message',
    type: 'info',
  },
};

/**
 * Notification succès
 */
export const Success: Story = {
  args: {
    message: 'Operation completed successfully!',
    type: 'success',
  },
};

/**
 * Notification erreur
 */
export const Error: Story = {
  args: {
    message: 'An error occurred. Please try again.',
    type: 'error',
  },
};

export default meta;
