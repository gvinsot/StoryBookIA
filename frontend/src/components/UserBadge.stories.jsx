import UserBadge from './UserBadge';

export default {
  title: 'Components/UserBadge',
  component: UserBadge,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export const Active = {
  args: { value: 'active' },
};

export const Inactive = {
  args: { value: 'inactive' },
};

export const Admin = {
  args: { value: 'admin' },
};

export const Editor = {
  args: { value: 'editor' },
};

export const Viewer = {
  args: { value: 'viewer' },
};

export const UnknownValue = {
  args: { value: 'guest' },
};

export const CustomLabel = {
  args: {
    value: 'active',
    labels: { active: 'En ligne' },
  },
};

export const AllVariants = {
  render: () => (
    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
      <UserBadge value="active" />
      <UserBadge value="inactive" />
      <UserBadge value="admin" />
      <UserBadge value="editor" />
      <UserBadge value="viewer" />
    </div>
  ),
};