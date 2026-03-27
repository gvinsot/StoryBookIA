import React from 'react';
import './Grid.css';

/**
 * Système de grille responsive
 * @param {Object} props - Props du composant
 * @param {node} props.children - Colonnes à afficher
 * @param {number} props.columns - Nombre de colonnes (default: 12)
 * @param {number} props.gap - Espacement en px (default: 16)
 */
export const Grid = ({ children, columns = 12, gap = 16 }) => {
  const { children, columns = 12, gap = 16 } = props;
  
  return (
    <div 
      className="grid"
      style={{ '--grid-columns': columns, '--grid-gap': `${gap}px` }}
    >
      {children}
    </div>
  );
};

export default Grid;
