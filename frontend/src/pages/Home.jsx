import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
  return (
    <div className="home">
      {/* Hero Section */}
      <div className="hero">
        <div className="hero-badge">
          <span className="badge">🎯 IA-Powered</span>
        </div>
        <h1 className="hero-title">
          Générez un <span className="highlight">Storybook</span> React en quelques secondes
        </h1>
        <p className="hero-subtitle">
          Transformez votre idée produit en un Storybook React complet et fonctionnel
          grâce à notre intelligence artificielle.
        </p>
        <div className="hero-actions">
          <Link to="/generate" className="btn btn-primary btn-lg pulse">
            🚀 Commencer maintenant
          </Link>
          <Link to="/history" className="btn btn-secondary btn-lg">
            📚 Voir l'historique
          </Link>
        </div>
        <div className="hero-stats">
          <div className="stat-item">
            <span className="stat-number">1000+</span>
            <span className="stat-label">Storybooks générés</span>
          </div>
          <div className="stat-divider"></div>
          <div className="stat-item">
            <span className="stat-number">30s</span>
            <span className="stat-label">Temps moyen</span>
          </div>
          <div className="stat-divider"></div>
          <div className="stat-item">
            <span className="stat-number">99%</span>
            <span className="stat-label">Satisfaction</span>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="features">
        <h2 className="section-title">Comment ça marche ?</h2>
        <p className="section-subtitle">
          Trois étapes simples pour transformer votre idée en projet React complet
        </p>
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

      {/* Social Proof Section */}
      <div className="social-proof">
        <h2 className="section-title">Ils nous font confiance</h2>
        <p className="section-subtitle">
          Des milliers de développeurs ont déjà généré leur Storybook avec StoryBookIA
        </p>
        <div className="testimonials-grid">
          <div className="testimonial-card">
            <div className="testimonial-header">
              <div className="avatar">JD</div>
              <div className="testimonial-info">
                <h4>Julien D.</h4>
                <span className="role">Développeur Frontend</span>
              </div>
            </div>
            <p className="testimonial-text">
              "Incroyable ! J'ai généré un Storybook complet en 30 secondes. Gain de temps énorme pour mes projets."
            </p>
            <div className="testimonial-rating">⭐⭐⭐⭐⭐</div>
          </div>
          <div className="testimonial-card">
            <div className="testimonial-header">
              <div className="avatar">SM</div>
              <div className="testimonial-info">
                <h4>Sophie M.</h4>
                <span className="role">Tech Lead</span>
              </div>
            </div>
            <p className="testimonial-text">
              "L'outil le plus utile pour prototyper rapidement. L'IA comprend parfaitement les besoins."
            </p>
            <div className="testimonial-rating">⭐⭐⭐⭐⭐</div>
          </div>
          <div className="testimonial-card">
            <div className="testimonial-header">
              <div className="avatar">AL</div>
              <div className="testimonial-info">
                <h4>Alexandre L.</h4>
                <span className="role">Freelance</span>
              </div>
            </div>
            <p className="testimonial-text">
              "Parfait pour démarrer un nouveau projet. Le code généré est propre et bien structuré."
            </p>
            <div className="testimonial-rating">⭐⭐⭐⭐⭐</div>
          </div>
        </div>
        <div className="trust-badges">
          <div className="badge-item">
            <span className="badge-icon">✓</span>
            <span>Code de qualité</span>
          </div>
          <div className="badge-item">
            <span className="badge-icon">✓</span>
            <span>100% Gratuit</span>
          </div>
          <div className="badge-item">
            <span className="badge-icon">✓</span>
            <span>Sans inscription</span>
          </div>
          <div className="badge-item">
            <span className="badge-icon">✓</span>
            <span>Open Source</span>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="cta-section">
        <div className="cta-content">
          <h2>Prêt à créer votre Storybook ?</h2>
          <p>Rejoignez plus de 1000 développeurs qui ont déjà accéléré leur workflow</p>
          <Link to="/generate" className="btn btn-primary btn-xl pulse">
            ✨ Générer mon Storybook maintenant
          </Link>
          <p className="cta-note">
            <span className="note-icon">⚡</span>
            Génération en moins de 30 secondes • Aucun compte requis
          </p>
        </div>
      </div>
    </div>
  );
}

export default Home;