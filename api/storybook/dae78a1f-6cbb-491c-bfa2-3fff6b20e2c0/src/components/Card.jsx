import React from 'react';
import './Card.css';

/**
 * Carte avec bordure et ombre
 * @param {Object} props - Props du composant
 * @param {node} props.children - Contenu de la carte
 * @param {string} props.title - Titre de la carte
 * @param {node} props.footer - Pied de carte
 * @param {boolean} props.hoverable - Effet au survol
 */
export const Card = (children, title=, footer=, hoverable=) => {
  const { children, title, footer, hoverable = false } = props;
  
  return (
    <div className={`card ${hoverable ? 'hoverable' : ''}`}>
      {title && <div className="card-header">{title}</div>}
      <div className="card-body">{children}</div>
      {footer && <div className="card-footer">{footer}</div>}
    </div>
  );\n};\n\nexport default ${name};\n