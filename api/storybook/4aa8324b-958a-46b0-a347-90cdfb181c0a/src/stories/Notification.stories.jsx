import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Notification } from './Notification';

const meta = {
  title: 'Components/Notification',
  component: Notification,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Notification>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Story par défaut pour Notification
 */
export const Default: Story = {
  args: {
    message: 'Valeur par défaut',
    type: 'info',
    duration: 3000,
    onClose: () => console.log('onClose'),
  },
};

/**
 * Variantes pour Notification
 */

export const Info: Story = {
  args: {
    message: 'Information',
    type: 'info',
    duration: 0,
  },
};

export const Success: Story = {
  args: {
    message: 'Opération réussie !',
    type: 'success',
    duration: 0,
  },
};

export const Warning: Story = {
  args: {
    message: 'Attention : vérifiez vos données',
    type: 'warning',
    duration: 0,
  },
};

export const Error: Story = {
  args: {
    message: 'Une erreur est survenue',
    type: 'error',
    duration: 0,
  },
};
