import React from 'react';
import './Container.css';

/**
 * Conteneur principal avec padding et max-width
 * @param {Object} props - Props du composant
 * @param {node} props.children - Contenu à afficher
 * @param {boolean} props.fluid - Pleine largeur
 * @param {string} props.className - Classe CSS supplémentaire
 */
export const Container = (children, fluid=, className=) => {
  const { children, fluid = false, className = '' } = props;
  
  return (
    <div className={`container ${fluid ? 'fluid' : ''} ${className}`}>
      {children}
    </div>
  );\n};\n\nexport default ${name};\n