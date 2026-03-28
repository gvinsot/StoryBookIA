import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { pitchAPI } from '../api/client';
import './Generate.css';

function Generate() {
  const [pitch, setPitch] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!pitch.trim()) {
      setError('Veuillez entrer une description');
      return;
    }

    setLoading(true);
    setError('');
    setResult(null);

    try {
      const data = await pitchAPI.transform(pitch);
      setResult(data);
      setPitch('');
    } catch (err) {
      setError(err.response?.data?.error || 'Une erreur est survenue');
    } finally {
      setLoading(false);
    }
  };

  const viewProject = (projectId) => {
    navigate(`/project/${projectId}`);
  };

  return (
    <div className="generate">
      <h1>Générer un Storybook</h1>
      <p className="page-subtitle">Décrivez votre projet et laissez l'IA faire le reste</p>

      <form onSubmit={handleSubmit} className="generate-form">
        <div className="form-group">
          <label htmlFor="pitch">Description du projet</label>
          <textarea
            id="pitch"
            value={pitch}
            onChange={(e) => setPitch(e.target.value)}
            placeholder="Ex: Application de gestion de réservations avec authentification, tableau de bord, et gestion des utilisateurs..."
            rows="6"
            disabled={loading}
          />
          <div className="char-count">{pitch.length} caractères</div>
        </div>

        {error && <div className="error-message">{error}</div>}

        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? (
            <>
              <span className="spinner"></span>
              Génération en cours...
            </>
          ) : (
            '🚀 Générer le Storybook'
          )}
        </button>
      </form>

      {result && (
        <div className="result-card">
          <h2>✅ Storybook généré avec succès !</h2>
          <div className="result-details">
            <div className="detail-item">
              <span className="detail-label">ID Projet:</span>
              <span className="detail-value">{result.projectId}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Composants:</span>
              <span className="detail-value">{result.componentsCount}</span>
            </div>
          </div>
          <div className="result-actions">
            <button
              onClick={() => viewProject(result.projectId)}
              className="btn btn-primary"
            >
              👁️ Voir le projet
            </button>
            <a
              href={`/api/download/${result.projectId}`}
              className="btn btn-secondary"
              download
            >
              📦 Télécharger
            </a>
          </div>
        </div>
      )}

      <div className="examples-section">
        <h3>Exemples de descriptions</h3>
        <div className="examples-grid">
          <button
            type="button"
            className="example-card"
            onClick={() => setPitch('Application de gestion de réservations avec calendrier, notifications et gestion des utilisateurs')}
          >
            📅 Réservations
          </button>
          <button
            type="button"
            className="example-card"
            onClick={() => setPitch('E-commerce avec panier, paiement, catalogue produits et espace client')}
          >
            🛒 E-commerce
          </button>
          <button
            type="button"
            className="example-card"
            onClick={() => setPitch('Dashboard analytique avec graphiques, KPIs et export de rapports')}
          >
            📊 Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}

export default Generate;