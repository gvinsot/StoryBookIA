import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Badge } from './Badge';

const meta = {
  title: 'Components/Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Story par défaut pour Badge
 */
export const Default: Story = {
  args: {
    children: 'Contenu de Badge',
    variant: 'primary',
    size: 'medium',
  },
};

/**
 * Variantes pour Badge
 */

export const Primary: Story = {
  args: {
    children: 'Badge',
    variant: 'primary',
  },
};

export const Success: Story = {
  args: {
    children: 'Succès',
    variant: 'success',
  },
};

export const Warning: Story = {
  args: {
    children: 'Attention',
    variant: 'warning',
  },
};

export const Danger: Story = {
  args: {
    children: 'Erreur',
    variant: 'danger',
  },
};
