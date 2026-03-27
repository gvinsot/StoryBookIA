import React from 'react';
import './Input.css';

/**
 * Champ de saisie texte
 * @param {Object} props - Props du composant
 * @param {string} props.value - Valeur du champ
 * @param {function} props.onChange - Callback de changement
 * @param {string} props.placeholder - Texte indicatif
 * @param {string} props.label - Label du champ
 * @param {string} props.error - Message d'erreur
 * @param {boolean} props.disabled - Désactivé
 */
export const Input = ({ value, onChange, placeholder, label, error, disabled }) => {
  const { value, onChange, placeholder, label, error, disabled = false } = props;
  
  return (
    <div className="input-group">
      {label && <label className="input-label">{label}</label>}
      <input
        type="text"
        className={`input ${error ? 'error' : ''}`}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
      />
      {error && <span className="input-error">{error}</span>}
    </div>
  );
};

export default Input;
