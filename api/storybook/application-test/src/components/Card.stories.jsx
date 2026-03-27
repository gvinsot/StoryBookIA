import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Card } from './Card';

const meta = {
  title: 'Components/Card',
  component: Card,
  tags: ['autodocs'],
  argTypes: {
    children: { control: 'text' },
    title: { control: 'text' },
    footer: { control: 'text' },
    hoverable: { control: 'boolean' }
  },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Story par défaut pour Card
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
    title: 'title value',,
    footer: <div>Content</div>,,
    hoverable: true,
  },
};

/**
 * Carte simple
 */
export const Simple: Story = {
  args: {
    children: 'Card content goes here',
  },
};

/**
 * Carte avec titre
 */
export const WithTitle: Story = {
  args: {
    title: 'Card Title',
    children: 'Card content with a title above it',
  },
};

/**
 * Carte avec footer
 */
export const WithFooter: Story = {
  args: {
    title: 'Card with Footer',
    children: 'Main card content',
    footer: <Button>Action</Button>
  },
};

export default meta;
