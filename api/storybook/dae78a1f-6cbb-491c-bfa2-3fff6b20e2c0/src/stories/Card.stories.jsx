import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Card } from './Card';

const meta = {
  title: 'Components/Card',
  component: Card,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Story par défaut pour Card
 */
export const Default: Story = {
  args: {
    children: 'Contenu de Card',
    title: 'Valeur par défaut',
    footer: null,
    hoverable: false,
  },
};

/**
 * Variantes pour Card
 */

export const WithTitle: Story = {
  args: {
    children: 'Contenu de la carte',
    title: 'Titre de la carte',
  },
};

export const WithFooter: Story = {
  args: {
    children: 'Contenu de la carte',
    title: 'Titre de la carte',
    footer: <Button>Action</Button>,
  },
};

export const Hoverable: Story = {
  args: {
    children: 'Carte survolvable',
    hoverable: true,
  },
};
