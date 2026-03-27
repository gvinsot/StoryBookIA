import React from 'react';
import './Badge.css';

/**
 * Badge d'information
 * @param {Object} props - Props du composant
 * @param {node} props.children - Contenu du badge
 * @param {string} props.variant - primary, success, warning, danger (default: primary)
 * @param {string} props.size - small, medium (default: medium)
 */
export const Badge = (children, variant=, size=) => {
  const { children, variant = 'primary', size = 'medium' } = props;
  
  return (
    <span className={`badge badge-${variant} badge-${size}`}>
      {children}
    </span>
  );\n};\n\nexport default ${name};\n