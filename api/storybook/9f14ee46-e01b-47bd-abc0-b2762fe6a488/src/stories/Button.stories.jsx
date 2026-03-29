import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

const meta = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Story par défaut pour Button
 */
export const Default: Story = {
  args: {
    children: 'Contenu de Button',
    onClick: () => console.log('onClick'),
    variant: 'primary',
    size: 'medium',
    disabled: false,
  },
};

/**
 * Variantes pour Button
 */

export const Primary: Story = {
  args: {
    children: 'Bouton Primaire',
    variant: 'primary',
    size: 'medium',
  },
};

export const Secondary: Story = {
  args: {
    children: 'Bouton Secondaire',
    variant: 'secondary',
    size: 'medium',
  },
};

export const Disabled: Story = {
  args: {
    children: 'Bouton Désactivé',
    variant: 'primary',
    disabled: true,
  },
};
