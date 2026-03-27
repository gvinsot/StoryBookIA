import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Table } from './Table';

const meta = {
  title: 'Components/Table',
  component: Table,
  tags: ['autodocs'],
  argTypes: {
    columns: { control: 'text' },
    data: { control: 'text' },
    sortable: { control: 'boolean' },
    onRowClick: { control: 'action' }
  },
} satisfies Meta<typeof Table>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Story par défaut pour Table
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
    columns: [],,
    data: [],,
    sortable: true,,
    onRowClick: () => console.log("test"),
  },
};

export default meta;
