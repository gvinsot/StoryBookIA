import React from 'react';
import './FilterPanel.css';

/**
 * FilterPanel Component
 * Reusable filter panel for search and list views
 * 
 * @param {object} filters - Current filter values
 * @param {string} filters.search - Search query
 * @param {string} filters.type - Property type filter
 * @param {string} filters.status - Status filter
 * @param {object} filters.priceRange - Price range {min, max}
 * @param {function} onFilterChange - Callback when filters change
 * @param {function} onReset - Callback to reset all filters
 * @param {array} filterOptions - Available filter options
 */
function FilterPanel({
  filters,
  onFilterChange,
  onReset,
  filterOptions = {}
}) {
  const {
    search = '',
    type = 'all',
    status = 'all',
    priceRange = { min: '', max: '' }
  } = filters;

  const {
    types = [
      { value: 'all', label: 'Tous les types' },
      { value: 'apartment', label: 'Appartement' },
      { value: 'house', label: 'Maison' },
      { value: 'studio', label: 'Studio' }
    ],
    statuses = [
      { value: 'all', label: 'Tous les statuts' },
      { value: 'available', label: 'Disponible' },
      { value: 'occupied', label: 'Occupé' },
      { value: 'maintenance', label: 'Maintenance' }
    ]
  } = filterOptions;

  const handleSearchChange = (e) => {
    onFilterChange({ ...filters, search: e.target.value });
  };

  const handleTypeChange = (e) => {
    onFilterChange({ ...filters, type: e.target.value });
  };

  const handleStatusChange = (e) => {
    onFilterChange({ ...filters, status: e.target.value });
  };

  const handlePriceMinChange = (e) => {
    onFilterChange({ ...filters, priceRange: { ...priceRange, min: e.target.value } });
  };

  const handlePriceMaxChange = (e) => {
    onFilterChange({ ...filters, priceRange: { ...priceRange, max: e.target.value } });
  };

  const handleReset = () => {
    if (onReset) {
      onReset();
    }
  };

  const hasActiveFilters = search || type !== 'all' || status !== 'all' || priceRange.min || priceRange.max;

  return (
    <div className="filter-panel">
      <div className="filter-panel-header">
        <h3 className="filter-panel-title">
          <span className="filter-icon">🔍</span>
          Filtres de recherche
        </h3>
        {hasActiveFilters && (
          <button className="btn-reset" onClick={handleReset}>
            <span className="reset-icon">↺</span>
            Réinitialiser
          </button>
        )}
      </div>

      <div className="filter-panel-content">
        {/* Search Input */}
        <div className="filter-group">
          <label className="filter-label">Recherche</label>
          <div className="search-input-wrapper">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              className="filter-input search-input"
              placeholder="Rechercher par titre ou localisation..."
              value={search}
              onChange={handleSearchChange}
            />
          </div>
        </div>

        {/* Type Filter */}
        <div className="filter-group">
          <label className="filter-label">Type de propriété</label>
          <select
            className="filter-select"
            value={type}
            onChange={handleTypeChange}
          >
            {types.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Status Filter */}
        <div className="filter-group">
          <label className="filter-label">Statut</label>
          <select
            className="filter-select"
            value={status}
            onChange={handleStatusChange}
          >
            {statuses.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Price Range */}
        <div className="filter-group">
          <label className="filter-label">Prix mensuel (€)</label>
          <div className="price-range-wrapper">
            <input
              type="number"
              className="filter-input price-input"
              placeholder="Min"
              value={priceRange.min}
              onChange={handlePriceMinChange}
            />
            <span className="price-separator">-</span>
            <input
              type="number"
              className="filter-input price-input"
              placeholder="Max"
              value={priceRange.max}
              onChange={handlePriceMaxChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default FilterPanel;