import { http, HttpResponse } from 'msw';
import Users from './Users';

const allUsers = [
  {
    id: 'usr_001',
    firstName: 'Jean',
    lastName: 'Dupont',
    fullName: 'Jean Dupont',
    email: 'jean.dupont@storybookia.io',
    role: 'admin',
    status: 'active',
    createdAt: '2024-01-15T09:30:00.000Z',
  },
  {
    id: 'usr_002',
    firstName: 'Marie',
    lastName: 'Martin',
    fullName: 'Marie Martin',
    email: 'marie.martin@storybookia.io',
    role: 'editor',
    status: 'active',
    createdAt: '2024-02-20T14:15:00.000Z',
  },
  {
    id: 'usr_003',
    firstName: 'Pierre',
    lastName: 'Bernard',
    fullName: 'Pierre Bernard',
    email: 'pierre.bernard@storybookia.io',
    role: 'viewer',
    status: 'active',
    createdAt: '2024-03-10T08:45:00.000Z',
  },
];

const mockUsersHandler = http.get('/api/users', ({ request }) => {
  const url = new URL(request.url);
  const q = (url.searchParams.get('q') || '').toLowerCase();

  const filtered = q
    ? allUsers.filter((u) =>
        `${u.firstName} ${u.lastName} ${u.email} ${u.role}`
          .toLowerCase()
          .includes(q)
      )
    : allUsers;

  return HttpResponse.json({ count: filtered.length, users: filtered });
});

export default {
  title: 'Pages/Users',
  component: Users,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    msw: {
      handlers: [mockUsersHandler],
    },
  },
};

export const Default = {};

export const EmptyReferential = {
  parameters: {
    msw: {
      handlers: [
        http.get('/api/users', () =>
          HttpResponse.json({ count: 0, users: [] })
        ),
      ],
    },
  },
};

export const ApiError = {
  parameters: {
    msw: {
      handlers: [
        http.get('/api/users', () =>
          HttpResponse.json({ error: 'boom' }, { status: 500 })
        ),
      ],
    },
  },
};