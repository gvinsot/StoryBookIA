import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { historyAPI } from '../api/client';
import './History.css';

function History() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    try {
      const data = await historyAPI.list();
      setHistory(data.history || []);
    } catch (err) {
      setError('Impossible de charger l\'historique');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (entryId) => {
    if (!confirm('Supprimer cette entrée de l\'historique ?')) return;
    
    try {
      await historyAPI.delete(entryId);
      loadHistory();
    } catch (err) {
      alert('Erreur lors de la suppression');
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="history loading">
        <div className="spinner-large"></div>
        <p>Chargement de l'historique...</p>
      </div>
    );
  }

  return (
    <div className="history">
      <div className="history-header">
        <h1>Historique des générations</h1>
        <p className="page-subtitle">Retrouvez tous vos projets générés</p>
      </div>

      {error && <div className="error-message">{error}</div>}

      {history.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">📚</div>
          <h2>Aucun projet généré</h2>
          <p>Commencez par créer votre premier Storybook</p>
          <Link to="/generate" className="btn btn-primary">
            Générer un projet
          </Link>
        </div>
      ) : (
        <div className="history-list">
          {history.map((entry) => (
            <div key={entry.id} className="history-item">
              <div className="history-item-header">
                <div className="history-item-title">
                  <span className="project-icon">📦</span>
                  <h3>{entry.projectName || 'Projet'}</h3>
                </div>
                <div className="history-item-actions">
                  <Link
                    to={`/project/${entry.projectId}`}
                    className="btn btn-sm btn-primary"
                  >
                    👁️ Voir
                  </Link>
                  <a
                    href={`/api/download/${entry.projectId}`}
                    className="btn btn-sm btn-secondary"
                    download
                  >
                    📦
                  </a>
                  <button
                    onClick={() => handleDelete(entry.id)}
                    className="btn btn-sm btn-danger"
                  >
                    🗑️
                  </button>
                </div>
              </div>
              <div className="history-item-description">
                {entry.description || 'Pas de description'}
              </div>
              <div className="history-item-meta">
                <span className="meta-item">
                  <span className="meta-icon">🧩</span>
                  {entry.componentCount} composants
                </span>
                <span className="meta-item">
                  <span className="meta-icon">🕒</span>
                  {formatDate(entry.createdAt)}
                </span>
                <span className={`meta-item status ${entry.status}`}>
                  <span className="meta-icon">✅</span>
                  {entry.status || 'completed'}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default History;