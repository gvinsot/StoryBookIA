import React, { useState, useEffect, useCallback } from 'react';
import { usersAPI } from '../api/client';
import DataTable from '../components/DataTable';
import SearchBar from '../components/SearchBar';
import UserBadge from '../components/UserBadge';
import './Users.css';

/**
 * Users Page (Référentiel des utilisateurs)
 * Consultable list of tool users with live search filtering.
 *
 * Acceptance criteria covered:
 * - The list displays users with their referential fields
 * - Search filters the list (server-side, debounced)
 * - An empty state is shown when no user matches
 * - Resetting the search re-displays all users
 */
function Users() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUsers = useCallback(async (search) => {
    setLoading(true);
    setError(null);
    try {
      const data = await usersAPI.list(search);
      setUsers(data.users);
    } catch (err) {
      console.error('❌ Error loading users:', err);
      setError('Impossible de charger la liste des utilisateurs. Veuillez réessayer.');
      setUsers([]);
    } finally {
      setLoading(false);
    }
  }, []);

  // Initial load
  useEffect(() => {
    fetchUsers('');
  }, [fetchUsers]);

  // Debounced search: the list updates as the user types
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchUsers(searchTerm);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchTerm, fetchUsers]);

  const formatDate = (isoDate) => {
    if (!isoDate) return '—';
    return new Date(isoDate).toLocaleDateString('fr-FR');
  };

  const columns = [
    {
      key: 'fullName',
      label: 'Utilisateur',
      render: (user) => (
        <div className="user-cell">
          <div className="user-avatar" aria-hidden="true">
            {user.firstName[0]}
            {user.lastName[0]}
          </div>
          <div className="user-info">
            <span className="user-name">{user.fullName}</span>
            <span className="user-email">{user.email}</span>
          </div>
        </div>
      ),
    },
    {
      key: 'role',
      label: 'Rôle',
      render: (user) => <UserBadge value={user.role} />,
    },
    {
      key: 'status',
      label: 'Statut',
      render: (user) => <UserBadge value={user.status} />,
    },
    {
      key: 'createdAt',
      label: 'Créé le',
      className: 'user-date-cell',
      render: (user) => formatDate(user.createdAt),
    },
  ];

  const isSearching = searchTerm.trim().length > 0;

  return (
    <div className="users-page">
      {/* Page Header */}
      <div className="page-header">
        <div className="page-header-content">
          <h1 className="page-title">Référentiel des Utilisateurs</h1>
          <p className="page-subtitle">
            Consultez la liste des utilisateurs de l&apos;outil
          </p>
        </div>
        <span className="users-count" aria-live="polite">
          {loading ? '…' : `${users.length} utilisateur${users.length > 1 ? 's' : ''}`}
        </span>
      </div>

      {/* Search Section */}
      <div className="users-toolbar">
        <SearchBar
          value={searchTerm}
          onChange={setSearchTerm}
          placeholder="Rechercher un utilisateur (nom, email, rôle)..."
          label="Rechercher un utilisateur"
        />
      </div>

      {/* Users Table */}
      <DataTable
        columns={columns}
        rows={users}
        rowKey={(user) => user.id}
        loading={loading}
        error={error}
        emptyTitle={
          isSearching
            ? 'Aucun utilisateur trouvé'
            : 'Aucun utilisateur enregistré'
        }
        emptySubtitle={
          isSearching
            ? 'Essayez de modifier votre recherche'
            : 'Le référentiel est vide pour le moment'
        }
        emptyAction={
          isSearching ? (
            <button
              type="button"
              className="btn btn-primary btn-sm"
              onClick={() => setSearchTerm('')}
            >
              Réinitialiser la recherche
            </button>
          ) : null
        }
      />
    </div>
  );
}

export default Users;