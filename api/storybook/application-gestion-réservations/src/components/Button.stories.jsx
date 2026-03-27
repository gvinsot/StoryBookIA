import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

const meta = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    children: { control: 'text' },
    onClick: { control: 'action' },
    variant: { control: 'text' },
    size: { control: 'text' },
    disabled: { control: 'boolean' }
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Story par défaut pour Button
 */
export const Default: Story = {
  args: {
    variant: 'primary',
    size: 'medium',
  },
};

/**
 * Story avec tous les props
 */
export const AllProps: Story = {
  args: {
    children: <div>Content</div>,,
    onClick: () => console.log("test"),,
    variant: 'variant value',,
    size: 'size value',,
    disabled: true,
  },
};

/**
 * Bouton primaire
 */
export const Primary: Story = {
  args: {
    children: 'Primary Button',
    variant: 'primary',
  },
};

/**
 * Bouton secondaire
 */
export const Secondary: Story = {
  args: {
    children: 'Secondary Button',
    variant: 'secondary',
  },
};

/**
 * Bouton désactivé
 */
export const Disabled: Story = {
  args: {
    children: 'Disabled Button',
    disabled: true,
  },
};

export default meta;
