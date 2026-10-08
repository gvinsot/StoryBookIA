import { useState } from 'react';
import SearchBar from './SearchBar';

export default {
  title: 'Components/SearchBar',
  component: SearchBar,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    onChange: { action: 'changed' },
  },
};

export const Default = {
  args: {
    value: '',
    placeholder: 'Rechercher un utilisateur...',
    label: 'Rechercher un utilisateur',
  },
  render: (args) => {
    const [value, setValue] = useState(args.value);
    return (
      <SearchBar
        {...args}
        value={value}
        onChange={(v) => {
          setValue(v);
          args.onChange(v);
        }}
      />
    );
  },
};

export const WithValue = {
  args: {
    value: 'jean',
    placeholder: 'Rechercher un utilisateur...',
  },
  render: (args) => {
    const [value, setValue] = useState(args.value);
    return <SearchBar {...args} value={value} onChange={setValue} />;
  },
};

export const LongPlaceholder = {
  args: {
    value: '',
    placeholder: 'Rechercher un utilisateur (nom, email, rôle)...',
  },
  render: (args) => {
    const [value, setValue] = useState(args.value);
    return <SearchBar {...args} value={value} onChange={setValue} />;
  },
};