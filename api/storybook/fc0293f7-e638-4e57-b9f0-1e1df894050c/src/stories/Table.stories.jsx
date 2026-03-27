import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Table } from './Table';

const meta = {
  title: 'Components/Table',
  component: Table,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Table>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Story par défaut pour Table
 */
export const Default: Story = {
  args: {
    columns: [],
    data: [],
    sortable: false,
    onRowClick: () => console.log('onRowClick'),
  },
};

/**
 * Variantes pour Table
 */
