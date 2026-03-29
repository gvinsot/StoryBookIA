import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Container } from './Container';

const meta = {
  title: 'Components/Container',
  component: Container,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Container>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Story par défaut pour Container
 */
export const Default: Story = {
  args: {
    children: 'Contenu de Container',
    fluid: false,
    className: 'Valeur par défaut',
  },
};

/**
 * Variantes pour Container
 */
