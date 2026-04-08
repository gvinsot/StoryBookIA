import React from 'react';
import './PropertyCard.css';

/**
 * PropertyCard Component
 * Displays property information in search results
 * 
 * @param {object} property - Property data object
 * @param {number} property.id - Property ID
 * @param {string} property.title - Property title
 * @param {string} property.location - Property location
 * @param {string} property.type - Property type (apartment, house, studio)
 * @param {number} property.rent - Monthly rent
 * @param {number} property.area - Property area in m²
 * @param {number} property.rooms - Number of rooms
 * @param {string} property.status - Property status (available, occupied, maintenance)
 * @param {string} property.image - Property image URL or emoji
 * @param {function} property.onSelect - Callback when property is selected
 */
function PropertyCard({
  property,
  onSelect
}) {
  const {
    id,
    title,
    location,
    type,
    rent,
    area,
    rooms,
    status,
    image = '🏠'
  } = property;

  const getStatusClass = () => {
    switch (status) {
      case 'available': return 'status-available';
      case 'occupied': return 'status-occupied';
      case 'maintenance': return 'status-maintenance';
      default: return '';
    }
  };

  const getStatusLabel = () => {
    switch (status) {
      case 'available': return 'Disponible';
      case 'occupied': return 'Occupé';
      case 'maintenance': return 'Maintenance';
      default: return status;
    }
  };

  const getTypeIcon = () => {
    switch (type) {
      case 'apartment': return '🏢';
      case 'house': return '🏡';
      case 'studio': return '🏠';
      default: return '🏠';
    }
  };

  const handleCardClick = () => {
    if (onSelect) {
      onSelect(property);
    }
  };

  return (
    <div className={`property-card ${getStatusClass()}`} onClick={handleCardClick}>
      <div className="property-card-header">
        <span className="property-image">{image}</span>
        <span className={`property-status-badge ${getStatusClass()}`}>
          {getStatusLabel()}
        </span>
      </div>
      
      <div className="property-card-body">
        <h3 className="property-title">{title}</h3>
        <p className="property-location">📍 {location}</p>
        
        <div className="property-details">
          <div className="property-detail">
            <span className="detail-icon">{getTypeIcon()}</span>
            <span className="detail-label">{type === 'apartment' ? 'Appartement' : type === 'house' ? 'Maison' : 'Studio'}</span>
          </div>
          <div className="property-detail">
            <span className="detail-icon">📐</span>
            <span className="detail-label">{area} m²</span>
          </div>
          <div className="property-detail">
            <span className="detail-icon">🚪</span>
            <span className="detail-label">{rooms} pièces</span>
          </div>
        </div>
      </div>
      
      <div className="property-card-footer">
        <div className="property-rent">
          <span className="rent-amount">{rent}€</span>
          <span className="rent-period">/mois</span>
        </div>
        <button className="btn btn-primary btn-sm property-action">
          Voir détails
        </button>
      </div>
    </div>
  );
}

export default PropertyCard;