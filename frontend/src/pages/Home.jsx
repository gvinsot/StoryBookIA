import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-bg-pattern"></div>
        <div className="hero-content">
          <span className="hero-badge">Propulsé par l'IA</span>
          <h1 className="hero-title">
            Créez des <span className="text-gradient">Storybooks immobiliers</span> en quelques clics
          </h1>
          <p className="hero-subtitle">
            Générez automatiquement des présentations professionnelles pour vos biens immobiliers grâce à l'intelligence artificielle.
          </p>
          <div className="hero-actions">
            <Link to="/generate" className="btn btn-primary btn-lg pulse">
              Commencer maintenant
            </Link>
            <Link to="/history" className="btn btn-secondary btn-lg">
              Voir mes projets
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="section-header">
          <span className="section-badge">Fonctionnalités</span>
          <h2 className="section-title">Tout ce dont vous avez besoin</h2>
          <p className="section-subtitle">Des outils puissants pour créer des storybooks immobiliers professionnels</p>
        </div>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon-wrapper">
              <span className="feature-icon">🤖</span>
            </div>
            <h3 className="feature-title">Génération IA</h3>
            <p className="feature-description">
              Notre IA analyse vos données et génère automatiquement des contenus optimisés pour chaque bien.
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-icon-wrapper">
              <span className="feature-icon">📊</span>
            </div>
            <h3 className="feature-title">Templates Pro</h3>
            <p className="feature-description">
              Choisissez parmi des modèles professionnels conçus pour le secteur immobilier.
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-icon-wrapper">
              <span className="feature-icon">⚡</span>
            </div>
            <h3 className="feature-title">Rapide & Simple</h3>
            <p className="feature-description">
              Créez un storybook complet en moins de 5 minutes, sans compétences techniques.
            </p>
          </div>
        </div>
      </section>

      {/* How it works Section */}
      <section className="steps-section">
        <div className="section-header">
          <span className="section-badge">Comment ça marche</span>
          <h2 className="section-title">3 étapes simples</h2>
          <p className="section-subtitle">De vos données à un storybook professionnel en quelques minutes</p>
        </div>
        <div className="steps-grid">
          <div className="step-card">
            <div className="step-number">1</div>
            <div className="step-connector"></div>
            <h3 className="step-title">Décrivez votre bien</h3>
            <p className="step-description">
              Entrez les caractéristiques de votre bien immobilier : type, surface, localisation, points forts.
            </p>
          </div>
          <div className="step-card">
            <div className="step-number">2</div>
            <div className="step-connector"></div>
            <h3 className="step-title">L'IA génère le contenu</h3>
            <p className="step-description">
              Notre moteur IA crée automatiquement les textes, la mise en page et les composants du storybook.
            </p>
          </div>
          <div className="step-card">
            <div className="step-number">3</div>
            <h3 className="step-title">Téléchargez & partagez</h3>
            <p className="step-description">
              Récupérez votre storybook prêt à l'emploi et partagez-le avec vos clients et partenaires.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="stats-grid">
          <div className="stat-card">
            <span className="stat-value">500+</span>
            <span className="stat-label">Storybooks créés</span>
          </div>
          <div className="stat-card">
            <span className="stat-value">50+</span>
            <span className="stat-label">Agents immobiliers</span>
          </div>
          <div className="stat-card">
            <span className="stat-value">98%</span>
            <span className="stat-label">Satisfaction client</span>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-content">
          <h2 className="cta-title">Prêt à transformer vos présentations ?</h2>
          <p className="cta-subtitle">
            Rejoignez les professionnels de l'immobilier qui utilisent StoryBookIA au quotidien.
          </p>
          <Link to="/generate" className="btn btn-primary btn-lg">
            Générer mon Storybook maintenant
          </Link>
        </div>
      </section>
    </div>
  );
}

export default Home;