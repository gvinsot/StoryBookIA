import React, { useState, useEffect } from 'react';
import KpiCard from '../components/KpiCard';
import './KpiDashboard.css';

/**
 * KpiDashboard Page
 * Displays property portfolio metrics and statistics
 */
function KpiDashboard() {
  const [loading, setLoading] = useState(true);
  const [kpiData, setKpiData] = useState(null);
  const [timeRange, setTimeRange] = useState('month');

  // Mock data - in production, this would come from an API
  const mockKpiData = {
    totalProperties: 24,
    occupiedProperties: 18,
    availableProperties: 4,
    maintenanceProperties: 2,
    totalRevenue: 28500,
    averageRent: 1187,
    occupancyRate: 75,
    maintenanceRate: 8,
    tenantSatisfaction: 4.2,
    monthlyGrowth: 5.2,
    revenueGrowth: 12.3,
    propertiesByType: {
      apartment: 14,
      house: 6,
      studio: 4
    },
    recentActivity: [
      { id: 1, type: 'lease_signed', property: 'Appartement T3 - Paris', date: '2024-01-15', amount: 1200 },
      { id: 2, type: 'maintenance', property: 'Maison T5 - Marseille', date: '2024-01-14', amount: 450 },
      { id: 3, type: 'lease_renewed', property: 'Studio - Lyon', date: '2024-01-13', amount: 650 },
      { id: 4, type: 'payment_received', property: 'Appartement T2 - Bordeaux', date: '2024-01-12', amount: 950 }
    ]
  };

  useEffect(() => {
    // Simulate API call
    const fetchKpiData = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 800));
      setKpiData(mockKpiData);
      setLoading(false);
    };

    fetchKpiData();
  }, []);

  const handleTimeRangeChange = (range) => {
    setTimeRange(range);
    // In production, fetch new data based on time range
  };

  if (loading) {
    return (
      <div className="kpi-dashboard">
        <div className="page-header">
          <div className="page-header-content">
            <h1 className="page-title">Tableau de Bord KPI</h1>
            <p className="page-subtitle">Analysez la performance de votre portefeuille immobilier</p>
          </div>
        </div>
        <div className="loading-container">
          <div className="spinner-large"></div>
          <p>Chargement des indicateurs...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="kpi-dashboard">
      {/* Page Header */}
      <div className="page-header">
        <div className="page-header-content">
          <h1 className="page-title">Tableau de Bord KPI</h1>
          <p className="page-subtitle">Analysez la performance de votre portefeuille immobilier</p>
        </div>
        
        {/* Time Range Selector */}
        <div className="time-range-selector">
          <button 
            className={`time-range-btn ${timeRange === 'week' ? 'active' : ''}`}
            onClick={() => handleTimeRangeChange('week')}
          >
            Semaine
          </button>
          <button 
            className={`time-range-btn ${timeRange === 'month' ? 'active' : ''}`}
            onClick={() => handleTimeRangeChange('month')}
          >
            Mois
          </button>
          <button 
            className={`time-range-btn ${timeRange === 'year' ? 'active' : ''}`}
            onClick={() => handleTimeRangeChange('year')}
          >
            Année
          </button>
        </div>
      </div>

      {/* Main KPI Cards */}
      <div className="kpi-grid kpi-grid-main">
        <KpiCard
          title="Total Propriétés"
          value={kpiData.totalProperties}
          icon="🏠"
          trend="up"
          trendValue={kpiData.monthlyGrowth}
          trendLabel="ce mois"
          color="primary"
        />
        <KpiCard
          title="Taux d'Occupation"
          value={`${kpiData.occupancyRate}%`}
          icon="📊"
          trend="up"
          trendValue={3.2}
          trendLabel="vs mois dernier"
          color="success"
        />
        <KpiCard
          title="Revenu Mensuel"
          value={`${kpiData.totalRevenue.toLocaleString('fr-FR')}€`}
          icon="💰"
          trend="up"
          trendValue={kpiData.revenueGrowth}
          trendLabel="croissance"
          color="primary"
        />
        <KpiCard
          title="Loyers Moyens"
          value={`${kpiData.averageRent}€`}
          icon="📈"
          trend="neutral"
          trendLabel="stable"
          color="warning"
        />
      </div>

      {/* Secondary KPI Cards */}
      <div className="kpi-grid kpi-grid-secondary">
        <KpiCard
          title="Propriétés Disponibles"
          value={kpiData.availableProperties}
          icon="✅"
          color="success"
        />
        <KpiCard
          title="En Maintenance"
          value={kpiData.maintenanceProperties}
          icon="🔧"
          trend="down"
          trendValue={2}
          trendLabel="réductions"
          color="warning"
        />
        <KpiCard
          title="Satisfaction Locataires"
          value={`${kpiData.tenantSatisfaction}/5`}
          icon="⭐"
          trend="up"
          trendValue={0.3}
          trendLabel="amélioration"
          color="primary"
        />
        <KpiCard
          title="Taux Maintenance"
          value={`${kpiData.maintenanceRate}%`}
          icon="⚠️"
          trend="down"
          trendValue={1.5}
          trendLabel="optimisation"
          color="error"
        />
      </div>

      {/* Properties by Type */}
      <div className="kpi-section">
        <h2 className="section-title">Répartition par Type</h2>
        <p className="section-subtitle">Distribution de votre portefeuille immobilier</p>
        
        <div className="type-breakdown">
          <div className="type-bar-container">
            <div className="type-bar-label">
              <span>Appartements</span>
              <span>{kpiData.propertiesByType.apartment} ({Math.round((kpiData.propertiesByType.apartment / kpiData.totalProperties) * 100)}%)</span>
            </div>
            <div className="type-bar">
              <div 
                className="type-bar-fill type-bar-apartment"
                style={{ width: `${(kpiData.propertiesByType.apartment / kpiData.totalProperties) * 100}%` }}
              ></div>
            </div>
          </div>
          
          <div className="type-bar-container">
            <div className="type-bar-label">
              <span>Maisons</span>
              <span>{kpiData.propertiesByType.house} ({Math.round((kpiData.propertiesByType.house / kpiData.totalProperties) * 100)}%)</span>
            </div>
            <div className="type-bar">
              <div 
                className="type-bar-fill type-bar-house"
                style={{ width: `${(kpiData.propertiesByType.house / kpiData.totalProperties) * 100}%` }}
              ></div>
            </div>
          </div>
          
          <div className="type-bar-container">
            <div className="type-bar-label">
              <span>Studios</span>
              <span>{kpiData.propertiesByType.studio} ({Math.round((kpiData.propertiesByType.studio / kpiData.totalProperties) * 100)}%)</span>
            </div>
            <div className="type-bar">
              <div 
                className="type-bar-fill type-bar-studio"
                style={{ width: `${(kpiData.propertiesByType.studio / kpiData.totalProperties) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="kpi-section">
        <h2 className="section-title">Activité Récente</h2>
        <p className="section-subtitle">Derniers événements sur votre portefeuille</p>
        
        <div className="activity-list">
          {kpiData.recentActivity.map((activity) => (
            <div key={activity.id} className="activity-item">
              <div className="activity-icon">
                {activity.type === 'lease_signed' && '✍️'}
                {activity.type === 'maintenance' && '🔧'}
                {activity.type === 'lease_renewed' && '🔄'}
                {activity.type === 'payment_received' && '💳'}
              </div>
              <div className="activity-content">
                <span className="activity-property">{activity.property}</span>
                <span className="activity-type">
                  {activity.type === 'lease_signed' && 'Nouveau bail signé'}
                  {activity.type === 'maintenance' && 'Maintenance effectuée'}
                  {activity.type === 'lease_renewed' && 'Bail renouvelé'}
                  {activity.type === 'payment_received' && 'Paiement reçu'}
                </span>
              </div>
              <div className="activity-meta">
                <span className="activity-date">{new Date(activity.date).toLocaleDateString('fr-FR')}</span>
                {activity.amount && <span className="activity-amount">{activity.amount}€</span>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default KpiDashboard;