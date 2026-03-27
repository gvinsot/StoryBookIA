import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Modal } from './Modal';

const meta = {
  title: 'Components/Modal',
  component: Modal,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Story par défaut pour Modal
 */
export const Default: Story = {
  args: {
    isOpen: false,
    onClose: () => console.log('onClose'),
    title: 'Valeur par défaut',
    children: 'Contenu de Modal',
    size: 'medium',
  },
};

/**
 * Variantes pour Modal
 */

export const Small: Story = {
  args: {
    isOpen: true,
    title: 'Modale petite',
    size: 'small',
    children: 'Contenu de la modale',
    onClose: () => console.log('close'),
  },
};

export const Medium: Story = {
  args: {
    isOpen: true,
    title: 'Modale moyenne',
    size: 'medium',
    children: 'Contenu de la modale',
    onClose: () => console.log('close'),
  },
};

export const Large: Story = {
  args: {
    isOpen: true,
    title: 'Modale grande',
    size: 'large',
    children: 'Contenu de la modale',
    onClose: () => console.log('close'),
  },
};
