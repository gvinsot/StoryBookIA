import React from 'react';
import './Select.css';

/**
 * Liste déroulante
 * @param {Object} props - Props du composant
 * @param {string} props.value - Valeur sélectionnée
 * @param {function} props.onChange - Callback de changement
 * @param {array} props.options - Liste des options
 * @param {string} props.label - Label du champ
 */
export const Select = (value=, onChange=, options, label=) => {
  const { value, onChange, options, label } = props;
  
  return (
    <div className="select-group">
      {label && <label className="select-label">{label}</label>}
      <select className="select" value={value} onChange={onChange}>
        {options.map(opt => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );\n};\n\nexport default ${name};\n