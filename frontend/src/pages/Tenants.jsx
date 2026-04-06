import React, { useState } from 'react';
import './Tenants.css';

function Tenants() {
  const [tenants, setTenants] = useState([
    {
      id: 1,
      name: 'Jean Dupont',
      email: 'jean.dupont@email.com',
      phone: '06 12 34 56 78',
      property: 'Appartement T3 - 75011 Paris',
      contractStart: '2024-01-15',
      contractEnd: '2025-01-14',
      rent: 1200,
      status: 'active'
    },
    {
      id: 2,
      name: 'Marie Martin',
      email: 'marie.martin@email.com',
      phone: '06 98 76 54 32',
      property: 'Studio - 69002 Lyon',
      contractStart: '2023-09-01',
      contractEnd: '2024-08-31',
      rent: 650,
      status: 'active'
    },
    {
      id: 3,
      name: 'Pierre Bernard',
      email: 'pierre.bernard@email.com',
      phone: '07 55 44 33 22',
      property: 'Maison T5 - 13008 Marseille',
      contractStart: '2022-06-01',
      contractEnd: '2024-05-31',
      rent: 1800,
      status: 'expiring'
    },
    {
      id: 4,
      name: 'Sophie Dubois',
      email: 'sophie.dubois@email.com',
      phone: '06 11 22 33 44',
      property: 'Appartement T2 - 33000 Bordeaux',
      contractStart: '2021-03-01',
      contractEnd: '2023-02-28',
      rent: 950,
      status: 'expired'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingTenant, setEditingTenant] = useState(null);

  const filteredTenants = tenants.filter(tenant => {
    const matchesSearch = tenant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tenant.property.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || tenant.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'active': return 'badge-success';
      case 'expiring': return 'badge-warning';
      case 'expired': return 'badge-error';
      default: return '';
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'active': return 'Actif';
      case 'expiring': return 'Expiration proche';
      case 'expired': return 'Expiré';
      default: return status;
    }
  };

  const handleAddTenant = () => {
    setShowAddModal(true);
  };

  const handleEditTenant = (tenant) => {
    setEditingTenant(tenant);
  };

  const handleDeleteTenant = (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce locataire ?')) {
      setTenants(tenants.filter(t => t.id !== id));
    }
  };

  const handleCloseModal = () => {
    setShowAddModal(false);
    setEditingTenant(null);
  };

  return (
    <div className="tenants-page">
      {/* Page Header */}
      <div className="page-header">
        <div className="page-header-content">
          <h1 className="page-title">Gestion des Locataires</h1>
          <p className="page-subtitle">Consultez et gérez la liste de vos locataires</p>
        </div>
        <button className="btn btn-primary" onClick={handleAddTenant}>
          <span className="btn-icon">+</span>
          Ajouter un locataire
        </button>
      </div>

      {/* Filters Section */}
      <div className="filters-section">
        <div className="filters-container">
          <div className="search-wrapper">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              className="search-input"
              placeholder="Rechercher un locataire..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="filter-group">
            <label className="filter-label">Statut:</label>
            <select
              className="filter-select"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="all">Tous</option>
              <option value="active">Actifs</option>
              <option value="expiring">Expiration proche</option>
              <option value="expired">Expirés</option>
            </select>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-card-icon">👥</div>
          <div className="stat-card-content">
            <span className="stat-card-value">{tenants.length}</span>
            <span className="stat-card-label">Total locataires</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-card-icon">✅</div>
          <div className="stat-card-content">
            <span className="stat-card-value">{tenants.filter(t => t.status === 'active').length}</span>
            <span className="stat-card-label">Contrats actifs</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-card-icon">⚠️</div>
          <div className="stat-card-content">
            <span className="stat-card-value">{tenants.filter(t => t.status === 'expiring').length}</span>
            <span className="stat-card-label">À renouveler</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-card-icon">💰</div>
          <div className="stat-card-content">
            <span className="stat-card-value">{tenants.reduce((sum, t) => sum + t.rent, 0)}€</span>
            <span className="stat-card-label">Revenu mensuel</span>
          </div>
        </div>
      </div>

      {/* Tenants Table */}
      <div className="table-section">
        <div className="table-container">
          <table className="tenants-table">
            <thead>
              <tr>
                <th>Locataire</th>
                <th>Propriété</th>
                <th>Contact</th>
                <th>Contrat</th>
                <th>Loyeur</th>
                <th>Statut</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredTenants.length > 0 ? (
                filteredTenants.map((tenant) => (
                  <tr key={tenant.id}>
                    <td>
                      <div className="tenant-cell">
                        <div className="tenant-avatar">
                          {tenant.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div className="tenant-info">
                          <span className="tenant-name">{tenant.name}</span>
                          <span className="tenant-email">{tenant.email}</span>
                        </div>
                      </div>
                    </td>
                    <td className="property-cell">{tenant.property}</td>
                    <td className="contact-cell">{tenant.phone}</td>
                    <td className="contract-cell">
                      <div className="contract-dates">
                        <span className="contract-label">Début:</span>
                        <span>{new Date(tenant.contractStart).toLocaleDateString('fr-FR')}</span>
                        <span className="contract-label">Fin:</span>
                        <span>{new Date(tenant.contractEnd).toLocaleDateString('fr-FR')}</span>
                      </div>
                    </td>
                    <td className="rent-cell">{tenant.rent}€ / mois</td>
                    <td>
                      <span className={`badge ${getStatusBadgeClass(tenant.status)}`}>
                        {getStatusLabel(tenant.status)}
                      </span>
                    </td>
                    <td className="actions-cell">
                      <button 
                        className="btn-icon-btn edit"
                        onClick={() => handleEditTenant(tenant)}
                        title="Modifier"
                      >
                        ✏️
                      </button>
                      <button 
                        className="btn-icon-btn delete"
                        onClick={() => handleDeleteTenant(tenant.id)}
                        title="Supprimer"
                      >
                        🗑️
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="empty-state">
                    <div className="empty-state-content">
                      <span className="empty-state-icon">📋</span>
                      <p className="empty-state-text">Aucun locataire trouvé</p>
                      <p className="empty-state-subtext">Essayez de modifier vos filtres de recherche</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit Modal */}
      {showAddModal && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2 className="modal-title">{editingTenant ? 'Modifier le locataire' : 'Ajouter un locataire'}</h2>
              <button className="modal-close" onClick={handleCloseModal}>✕</button>
            </div>
            <div className="modal-body">
              <form className="tenant-form">
                <div className="form-group">
                  <label className="form-label">Nom complet *</label>
                  <input type="text" className="form-input" placeholder="Jean Dupont" required />
                </div>
                <div className="form-group">
                  <label className="form-label">Email *</label>
                  <input type="email" className="form-input" placeholder="jean.dupont@email.com" required />
                </div>
                <div className="form-group">
                  <label className="form-label">Téléphone *</label>
                  <input type="tel" className="form-input" placeholder="06 12 34 56 78" required />
                </div>
                <div className="form-group">
                  <label className="form-label">Propriété *</label>
                  <input type="text" className="form-input" placeholder="Appartement T3 - 75011 Paris" required />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Début de contrat *</label>
                    <input type="date" className="form-input" required />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Fin de contrat *</label>
                    <input type="date" className="form-input" required />
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">Loyer mensuel (€) *</label>
                  <input type="number" className="form-input" placeholder="1200" required />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={handleCloseModal}>
                Annuler
              </button>
              <button className="btn btn-primary">
                {editingTenant ? 'Modifier' : 'Ajouter'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Tenants;