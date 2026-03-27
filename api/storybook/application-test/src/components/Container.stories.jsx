import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Container } from './Container';

const meta = {
  title: 'Components/Container',
  component: Container,
  tags: ['autodocs'],
  argTypes: {
    children: { control: 'text' },
    fluid: { control: 'boolean' },
    className: { control: 'text' }
  },
} satisfies Meta<typeof Container>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Story par défaut pour Container
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
    children: <div>Content</div>,,
    fluid: true,,
    className: 'className value',
  },
};

export default meta;
