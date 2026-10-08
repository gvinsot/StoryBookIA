import React from 'react';
import './SearchBar.css';

/**
 * SearchBar Component
 * Reusable search input with icon, clear button and accessible labeling.
 *
 * @param {string} value - Current search term
 * @param {function} onChange - Callback with the new search term
 * @param {string} [placeholder='Rechercher...']
 * @param {string} [label='Rechercher'] - Accessible label (visually hidden)
 * @param {string} [className='']
 */
function SearchBar({
  value,
  onChange,
  placeholder = 'Rechercher...',
  label = 'Rechercher',
  className = '',
}) {
  return (
    <div className={`search-bar ${className}`}>
      <span className="search-bar-icon" aria-hidden="true">🔍</span>
      <label htmlFor="search-bar-input" className="sr-only">
        {label}
      </label>
      <input
        id="search-bar-input"
        type="search"
        className="search-bar-input"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label={label}
      />
      {value && (
        <button
          type="button"
          className="search-bar-clear"
          onClick={() => onChange('')}
          aria-label="Effacer la recherche"
          title="Effacer la recherche"
        >
          ✕
        </button>
      )}
    </div>
  );
}

export default SearchBar;