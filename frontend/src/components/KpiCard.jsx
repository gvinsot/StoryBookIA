import React from 'react';
import './KpiCard.css';

/**
 * KpiCard Component
 * Reusable KPI metric card for dashboard visualizations
 * 
 * @param {string} title - KPI label
 * @param {string|number} value - KPI value
 * @param {string} icon - Icon emoji or character
 * @param {string} trend - Trend indicator (+, -, or neutral)
 * @param {number} trendValue - Percentage change
 * @param {string} trendLabel - Trend description
 * @param {string} color - Color variant (primary, success, warning, error)
 */
function KpiCard({
  title,
  value,
  icon = '📊',
  trend,
  trendValue,
  trendLabel,
  color = 'primary'
}) {
  const getTrendClass = () => {
    if (trend === 'up') return 'trend-up';
    if (trend === 'down') return 'trend-down';
    return 'trend-neutral';
  };

  const getTrendIcon = () => {
    if (trend === 'up') return '↑';
    if (trend === 'down') return '↓';
    return '→';
  };

  return (
    <div className={`kpi-card kpi-card-${color}`}>
      <div className="kpi-card-header">
        <span className="kpi-card-icon">{icon}</span>
        <span className="kpi-card-title">{title}</span>
      </div>
      <div className="kpi-card-body">
        <div className="kpi-card-value">{value}</div>
        {(trend || trendValue) && (
          <div className={`kpi-card-trend ${getTrendClass()}`}>
            <span className="trend-icon">{getTrendIcon()}</span>
            {trendValue && <span className="trend-value">{trendValue}%</span>}
            {trendLabel && <span className="trend-label">{trendLabel}</span>}
          </div>
        )}
      </div>
    </div>
  );
}

export default KpiCard;