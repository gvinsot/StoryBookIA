import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Modal } from './Modal';

const meta = {
  title: 'Components/Modal',
  component: Modal,
  tags: ['autodocs'],
  argTypes: {
    isOpen: { control: 'boolean' },
    onClose: { control: 'action' },
    title: { control: 'text' },
    children: { control: 'text' },
    size: { control: 'text' }
  },
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Story par défaut pour Modal
 */
export const Default: Story = {
  args: {
    size: 'medium',
  },
};

/**
 * Story avec tous les props
 */
export const AllProps: Story = {
  args: {
    isOpen: true,,
    onClose: () => console.log("test"),,
    title: 'title value',,
    children: <div>Content</div>,,
    size: 'size value',
  },
};

export default meta;
