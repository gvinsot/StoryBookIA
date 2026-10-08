import React from 'react';
import './DataTable.css';

/**
 * DataTable Component
 * Generic, reusable table for referential/list views.
 *
 * Renders a header from `columns`, a body from `rows`, and built-in
 * loading / empty / error states so pages stay thin.
 *
 * @param {Array<{key: string, label: string, render?: (row) => ReactNode, className?: string}>} columns
 * @param {Array<object>} rows - Data rows
 * @param {function(object): string|number} rowKey - Unique key extractor per row
 * @param {boolean} [loading=false] - Shows a skeleton body while loading
 * @param {string|null} [error=null] - Shows an error banner
 * @param {string} [emptyTitle='Aucun élément trouvé']
 * @param {string} [emptySubtitle='']
 * @param {ReactNode} [emptyAction=null] - Optional action (e.g. reset button) in the empty state
 * @param {string} [className=''] - Extra class on the wrapper
 */
function DataTable({
  columns = [],
  rows = [],
  rowKey,
  loading = false,
  error = null,
  emptyTitle = 'Aucun élément trouvé',
  emptySubtitle = '',
  emptyAction = null,
  className = '',
}) {
  const colSpan = Math.max(columns.length, 1);

  const renderSkeletonRows = () =>
    Array.from({ length: 5 }).map((_, rowIndex) => (
      <tr key={`skeleton-${rowIndex}`} className="data-table-skeleton-row">
        {columns.map((col) => (
          <td key={col.key}>
            <div className="skeleton-cell" />
          </td>
        ))}
      </tr>
    ));

  return (
    <div className={`data-table-wrapper ${className}`}>
      {error && (
        <div className="data-table-error" role="alert">
          <span className="data-table-error-icon">⚠️</span>
          <span>{error}</span>
        </div>
      )}

      <div className="data-table-container">
        <table className="data-table">
          <thead>
            <tr>
              {columns.map((col) => (
                <th key={col.key} className={col.className || ''}>
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              renderSkeletonRows()
            ) : rows.length > 0 ? (
              rows.map((row) => (
                <tr key={rowKey ? rowKey(row) : row.id}>
                  {columns.map((col) => (
                    <td key={col.key} className={col.className || ''}>
                      {col.render ? col.render(row) : row[col.key]}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={colSpan} className="data-table-empty-cell">
                  <div className="data-table-empty">
                    <span className="data-table-empty-icon">📋</span>
                    <p className="data-table-empty-title">{emptyTitle}</p>
                    {emptySubtitle && (
                      <p className="data-table-empty-subtitle">{emptySubtitle}</p>
                    )}
                    {emptyAction}
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DataTable;