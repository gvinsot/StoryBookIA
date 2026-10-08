import DataTable from './DataTable';
import UserBadge from './UserBadge';

export default {
  title: 'Components/DataTable',
  component: DataTable,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
};

const sampleUsers = [
  {
    id: 'usr_001',
    fullName: 'Jean Dupont',
    email: 'jean.dupont@storybookia.io',
    role: 'admin',
    status: 'active',
    createdAt: '15/01/2024',
  },
  {
    id: 'usr_002',
    fullName: 'Marie Martin',
    email: 'marie.martin@storybookia.io',
    role: 'editor',
    status: 'active',
    createdAt: '20/02/2024',
  },
  {
    id: 'usr_003',
    fullName: 'Sophie Dubois',
    email: 'sophie.dubois@storybookia.io',
    role: 'viewer',
    status: 'inactive',
    createdAt: '05/04/2024',
  },
];

const columns = [
  { key: 'fullName', label: 'Utilisateur' },
  { key: 'email', label: 'Email' },
  {
    key: 'role',
    label: 'Rôle',
    render: (row) => <UserBadge value={row.role} />,
  },
  {
    key: 'status',
    label: 'Statut',
    render: (row) => <UserBadge value={row.status} />,
  },
  { key: 'createdAt', label: 'Créé le' },
];

export const Default = {
  args: {
    columns,
    rows: sampleUsers,
    rowKey: (row) => row.id,
  },
};

export const Loading = {
  args: {
    columns,
    rows: [],
    rowKey: (row) => row.id,
    loading: true,
  },
};

export const Empty = {
  args: {
    columns,
    rows: [],
    rowKey: (row) => row.id,
    emptyTitle: 'Aucun utilisateur enregistré',
    emptySubtitle: 'Le référentiel est vide pour le moment',
  },
};

export const EmptySearchResult = {
  args: {
    columns,
    rows: [],
    rowKey: (row) => row.id,
    emptyTitle: 'Aucun utilisateur trouvé',
    emptySubtitle: 'Essayez de modifier votre recherche',
    emptyAction: (
      <button type="button" className="btn btn-primary btn-sm">
        Réinitialiser la recherche
      </button>
    ),
  },
};

export const WithError = {
  args: {
    columns,
    rows: [],
    rowKey: (row) => row.id,
    error: 'Impossible de charger la liste des utilisateurs. Veuillez réessayer.',
  },
};

export const SingleRow = {
  args: {
    columns,
    rows: [sampleUsers[0]],
    rowKey: (row) => row.id,
  },
};