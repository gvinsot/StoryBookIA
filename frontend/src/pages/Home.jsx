import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
  return (
    <div className="home">
      <div className="hero">
        <h1 className="hero-title">Générez un Storybook en quelques secondes</h1>
        <p className="hero-subtitle">
          Transformez votre idée produit en un Storybook React complet et fonctionnel
          grâce à notre intelligence artificielle.
        </p>
        <div className="hero-actions">
          <Link to="/generate" className="btn btn-primary btn-lg">
            🚀 Commencer maintenant
          </Link>
          <Link to="/history" className="btn btn-secondary btn-lg">
            📚 Voir l'historique
          </Link>
        </div>
      </div>

      <div className="features">
        <h2 className="section-title">Comment ça marche ?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon-wrapper">
              <span className="feature-icon">📝</span>
            </div>
            <h3>1. Décrivez votre projet</h3>
            <p>Entrez un pitch simple décrivant votre application (ex: "Application de gestion de réservations")</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon-wrapper">
              <span className="feature-icon">🧠</span>
            </div>
            <h3>2. Analyse IA</h3>
            <p>Notre IA analyse votre description et identifie les fonctionnalités, pages et composants nécessaires</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon-wrapper">
              <span className="feature-icon">🎨</span>
            </div>
            <h3>3. Génération automatique</h3>
            <p>Le Storybook est généré avec tous les composants React, CSS et stories configurés</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon-wrapper">
              <span className="feature-icon">📦</span>
            </div>
            <h3>4. Téléchargement</h3>
            <p>Téléchargez le projet complet et commencez à développer immédiatement</p>
          </div>
        </div>
      </div>

      <div className="cta-section">
        <h2>Prêt à créer votre Storybook ?</h2>
        <p>Commencez dès maintenant et voyez la magie opérer</p>
        <Link to="/generate" className="btn btn-primary btn-xl">
          Générer mon Storybook
        </Link>
      </div>
    </div>
  );
}

export default Home;