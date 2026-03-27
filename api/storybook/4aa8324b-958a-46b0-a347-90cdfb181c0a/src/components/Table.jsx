import React from 'react';
import './Table.css';

/**
 * Tableau de données
 * @param {Object} props - Props du composant
 * @param {array} props.columns - Définition des colonnes
 * @param {array} props.data - Données à afficher
 * @param {boolean} props.sortable - Triable
 * @param {function} props.onRowClick - Callback de clic sur ligne
 */
export const Table = (columns, data, sortable=, onRowClick=) => {
  const { columns, data, sortable = false, onRowClick } = props;
  
  return (
    <table className="table">
      <thead>
        <tr>
          {columns.map(col => (
            <th key={col.key} className={${sortable ? 'sortable' : ''}}>
              {col.title}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, idx) => (
          <tr 
            key={idx} 
            className={${onRowClick ? 'clickable' : ''}}
            onClick={() => onRowClick && onRowClick(row)}
          >
            {columns.map(col => (
              <td key={col.key}>{row[col.key]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );\n};\n\nexport default ${name};\n