import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import VersionFooter from './VersionFooter';
import './Layout.css';

function Layout({ children }) {
  const location = useLocation();

  const isActive = (path) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="layout">
      <nav className="navbar">
        <div className="navbar-brand">
          <Link to="/">
            <span className="logo">📚</span>
            <span className="title">StoryBook IA</span>
          </Link>
        </div>
        <div className="navbar-menu">
          <Link 
            to="/" 
            className={`nav-link ${isActive('/') ? 'active' : ''}`}
          >
            Accueil
          </Link>
          <Link 
            to="/generate" 
            className={`nav-link ${isActive('/generate') ? 'active' : ''}`}
          >
            Générer
          </Link>
          <Link 
            to="/history" 
            className={`nav-link ${isActive('/history') ? 'active' : ''}`}
          >
            Historique
          </Link>
          <Link 
            to="/tenants" 
            className={`nav-link ${isActive('/tenants') ? 'active' : ''}`}
          >
            Locataires
          </Link>
        </div>
      </nav>
      <main className="main-content">
        {children}
      </main>
      <VersionFooter />
    </div>
  );
}

export default Layout;