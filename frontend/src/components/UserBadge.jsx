import React from 'react';
import './UserBadge.css';

/**
 * UserBadge Component
 * Small pill displaying a user status or role with semantic coloring.
 *
 * @param {string} value - Raw value (e.g. 'active', 'inactive', 'admin'...)
 * @param {object} [labels] - Map of value -> display label
 * @param {string} [variant='neutral'] - Color variant: success | warning | error | info | neutral
 */
const DEFAULT_LABELS = {
  active: 'Actif',
  inactive: 'Inactif',
  admin: 'Administrateur',
  editor: 'Éditeur',
  viewer: 'Lecteur',
};

const VARIANT_BY_VALUE = {
  active: 'success',
  inactive: 'neutral',
  admin: 'info',
  editor: 'warning',
  viewer: 'neutral',
};

function UserBadge({ value, labels = DEFAULT_LABELS, variant }) {
  const resolvedVariant =
    variant || VARIANT_BY_VALUE[value] || 'neutral';
  const label = labels[value] || value;

  return (
    <span className={`user-badge user-badge-${resolvedVariant}`}>
      {label}
    </span>
  );
}

export default UserBadge;