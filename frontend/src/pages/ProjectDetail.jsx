import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { pitchAPI } from '../api/client';
import './ProjectDetail.css';

function ProjectDetail() {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadProject();
  }, [id]);

  const loadProject = async () => {
    try {
      const data = await pitchAPI.getProject(id);
      setProject(data);
    } catch (err) {
      setError('Impossible de charger le projet');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="project-detail loading">
        <div className="spinner-large"></div>
        <p>Chargement du projet...</p>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="project-detail error">
        <h2>⚠️ {error || 'Projet non trouvé'}</h2>
        <Link to="/history" className="btn btn-primary">
          ← Retour à l'historique
        </Link>
      </div>
    );
  }

  return (
    <div className="project-detail">
      <div className="project-header">
        <Link to="/history" className="back-link">
          ← Retour
        </Link>
        <h1>{project.uxModel?.name || 'Projet'}</h1>
        <p className="project-description">{project.uxModel?.description || project.uxModel?.pitch || 'Pas de description'}</p>
      </div>

      <div className="project-stats">
        <div className="stat-card">
          <div className="stat-icon">🧩</div>
          <div className="stat-info">
            <span className="stat-value">{project.components?.length || 0}</span>
            <span className="stat-label">Composants</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">📄</div>
          <div className="stat-info">
            <span className="stat-value">{project.uxModel?.pages?.length || 0}</span>
            <span className="stat-label">Pages</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">🎯</div>
          <div className="stat-info">
            <span className="stat-value">{project.uxModel?.features?.length || 0}</span>
            <span className="stat-label">Fonctionnalités</span>
          </div>
        </div>
      </div>

      {project.uxModel?.features && project.uxModel.features.length > 0 && (
        <div className="project-section">
          <h2>Fonctionnalités</h2>
          <div className="features-list">
            {project.uxModel.features.map((feature, index) => (
              <div key={index} className="feature-item">
                <span className="feature-icon">✓</span>
                <span>{feature}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {project.uxModel?.pages && project.uxModel.pages.length > 0 && (
        <div className="project-section">
          <h2>Pages</h2>
          <div className="pages-grid">
            {project.uxModel.pages.map((page, index) => (
              <div key={index} className="page-card">
                <div className="page-icon">📄</div>
                <h3>{page.name}</h3>
                <p>{page.description || 'Pas de description'}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {project.components && project.components.length > 0 && (
        <div className="project-section">
          <h2>Composants générés</h2>
          <div className="components-list">
            {project.components.map((component, index) => (
              <div key={index} className="component-item">
                <div className="component-name">
                  <span className="component-icon">⚛️</span>
                  <span>{component.name}</span>
                </div>
                <div className="component-type">{component.type}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="project-actions">
        <a
          href={`/api/download/${id}`}
          className="btn btn-primary btn-lg"
          download
        >
          📦 Télécharger le projet
        </a>
        <a
          href={`/storybook/${id}`}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-secondary btn-lg"
        >
          📚 Voir le Storybook
        </a>
      </div>
    </div>
  );
}

export default ProjectDetail;