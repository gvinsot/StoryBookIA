import React from 'react';
import './Button.css';

/**
 * Bouton d'action
 * @param {Object} props - Props du composant
 * @param {node} props.children - Texte ou contenu du bouton
 * @param {function} props.onClick - Callback de clic
 * @param {string} props.variant - primary, secondary, danger (default: primary)
 * @param {string} props.size - small, medium, large (default: medium)
 * @param {boolean} props.disabled - Désactivé
 */
export const Button = ({ children, onClick, variant = 'primary', size = 'medium', disabled }) => {
  const { children, onClick, variant = 'primary', size = 'medium', disabled = false } = props;
  
  return (
    <button
      className={`btn btn-${variant} btn-${size}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
