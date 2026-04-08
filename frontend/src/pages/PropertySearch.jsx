import React, { useState, useEffect, useMemo } from 'react';
import FilterPanel from '../components/FilterPanel';
import PropertyCard from '../components/PropertyCard';
import Pagination from '../components/Pagination';
import './PropertySearch.css';

/**
 * PropertySearch Page
 * Search and filter properties with pagination
 */
function PropertySearch() {
  const [loading, setLoading] = useState(true);
  const [properties, setProperties] = useState([]);
  const [filters, setFilters] = useState({
    search: '',
    type: 'all',
    status: 'all',
    priceRange: { min: '', max: '' }
  });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  // Mock data - in production, this would come from an API
  const mockProperties = [
    {
      id: 1,
      title: 'Appartement T3 Centre-Ville',
      location: '75011 Paris',
      type: 'apartment',
      rent: 1200,
      area: 65,
      rooms: 3,
      status: 'occupied',
      image: '🏢'
    },
    {
      id: 2,
      title: 'Maison Familiale avec Jardin',
      location: '13008 Marseille',
      type: 'house',
      rent: 1800,
      area: 120,
      rooms: 5,
      status: 'available',
      image: '🏡'
    },
    {
      id: 3,
      title: 'Studio Étudiant Proche Métro',
      location: '69002 Lyon',
      type: 'studio',
      rent: 650,
      area: 22,
      rooms: 1,
      status: 'occupied',
      image: '🏠'
    },
    {
      id: 4,
      title: 'Appartement T2 Moderne',
      location: '33000 Bordeaux',
      type: 'apartment',
      rent: 950,
      area: 45,
      rooms: 2,
      status: 'available',
      image: '🏢'
    },
    {
      id: 5,
      title: 'Maison de Charme Rénovée',
      location: '35000 Rennes',
      type: 'house',
      rent: 1400,
      area: 95,
      rooms: 4,
      status: 'maintenance',
      image: '🏡'
    },
    {
      id: 6,
      title: 'Appartement T4 Vue Mer',
      location: '06000 Nice',
      type: 'apartment',
      rent: 1600,
      area: 85,
      rooms: 4,
      status: 'occupied',
      image: '🏢'
    },
    {
      id: 7,
      title: 'Studio Cosy Centre Historique',
      location: '44000 Nantes',
      type: 'studio',
      rent: 580,
      area: 20,
      rooms: 1,
      status: 'available',
      image: '🏠'
    },
    {
      id: 8,
      title: 'Appartement T3 Lumineux',
      location: '59000 Lille',
      type: 'apartment',
      rent: 890,
      area: 70,
      rooms: 3,
      status: 'occupied',
      image: '🏢'
    },
    {
      id: 9,
      title: 'Maison avec Piscine',
      location: '31000 Toulouse',
      type: 'house',
      rent: 2100,
      area: 150,
      rooms: 6,
      status: 'available',
      image: '🏡'
    },
    {
      id: 10,
      title: 'Appartement T2 Proche Universités',
      location: '38000 Grenoble',
      type: 'apartment',
      rent: 780,
      area: 42,
      rooms: 2,
      status: 'occupied',
      image: '🏢'
    },
    {
      id: 11,
      title: 'Studio Meublé Tout Équipé',
      location: '75015 Paris',
      type: 'studio',
      rent: 720,
      area: 25,
      rooms: 1,
      status: 'available',
      image: '🏠'
    },
    {
      id: 12,
      title: 'Maison Plain-Pied',
      location: '49000 Angers',
      type: 'house',
      rent: 1250,
      area: 100,
      rooms: 4,
      status: 'maintenance',
      image: '🏡'
    }
  ];

  useEffect(() => {
    // Simulate API call
    const fetchProperties = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 600));
      setProperties(mockProperties);
      setLoading(false);
    };

    fetchProperties();
  }, []);

  // Filter properties based on current filters
  const filteredProperties = useMemo(() => {
    return properties.filter((property) => {
      // Search filter
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        const matchesSearch = 
          property.title.toLowerCase().includes(searchLower) ||
          property.location.toLowerCase().includes(searchLower);
        if (!matchesSearch) return false;
      }

      // Type filter
      if (filters.type !== 'all' && property.type !== filters.type) {
        return false;
      }

      // Status filter
      if (filters.status !== 'all' && property.status !== filters.status) {
        return false;
      }

      // Price range filter
      if (filters.priceRange.min && property.rent < Number(filters.priceRange.min)) {
        return false;
      }
      if (filters.priceRange.max && property.rent > Number(filters.priceRange.max)) {
        return false;
      }

      return true;
    });
  }, [properties, filters]);

  // Reset pagination when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [filters]);

  // Paginate filtered properties
  const paginatedProperties = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredProperties.slice(startIndex, endIndex);
  }, [filteredProperties, currentPage]);

  const totalPages = Math.ceil(filteredProperties.length / itemsPerPage);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleResetFilters = () => {
    setFilters({
      search: '',
      type: 'all',
      status: 'all',
      priceRange: { min: '', max: '' }
    });
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    // Scroll to top of results
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePropertySelect = (property) => {
    // In production, navigate to property detail page
    console.log('Property selected:', property);
  };

  if (loading) {
    return (
      <div className="property-search">
        <div className="page-header">
          <div className="page-header-content">
            <h1 className="page-title">Recherche de Propriétés</h1>
            <p className="page-subtitle">Trouvez la propriété parfaite avec nos filtres avancés</p>
          </div>
        </div>
        <div className="loading-container">
          <div className="spinner-large"></div>
          <p>Chargement des propriétés...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="property-search">
      {/* Page Header */}
      <div className="page-header">
        <div className="page-header-content">
          <h1 className="page-title">Recherche de Propriétés</h1>
          <p className="page-subtitle">Trouvez la propriété parfaite avec nos filtres avancés</p>
        </div>
      </div>

      {/* Filters and Results Layout */}
      <div className="search-layout">
        {/* Filter Panel */}
        <aside className="filter-sidebar">
          <FilterPanel
            filters={filters}
            onFilterChange={handleFilterChange}
            onReset={handleResetFilters}
          />
          
          {/* Results Count */}
          <div className="results-summary">
            <h4 className="results-title">Résultats de la recherche</h4>
            <p className="results-count">
              {filteredProperties.length} propriété{filteredProperties.length > 1 ? 's' : ''} trouvée{filteredProperties.length > 1 ? 's' : ''}
            </p>
          </div>
        </aside>

        {/* Results Grid */}
        <main className="results-main">
          {filteredProperties.length > 0 ? (
            <>
              <div className="results-grid">
                {paginatedProperties.map((property) => (
                  <PropertyCard
                    key={property.id}
                    property={property}
                    onSelect={handlePropertySelect}
                  />
                ))}
              </div>

              {/* Pagination */}
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
                itemsPerPage={itemsPerPage}
                totalItems={filteredProperties.length}
              />
            </>
          ) : (
            <div className="empty-results">
              <div className="empty-results-content">
                <span className="empty-results-icon">🔍</span>
                <h3 className="empty-results-title">Aucun résultat trouvé</h3>
                <p className="empty-results-text">
                  Essayez de modifier vos filtres de recherche pour trouver des propriétés
                </p>
                <button className="btn btn-primary" onClick={handleResetFilters}>
                  Réinitialiser les filtres
                </button>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default PropertySearch;