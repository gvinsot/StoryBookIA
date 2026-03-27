import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

// Import des composants
// Les composants seront importés dynamiquement par Storybook

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <div>
      <h1>Storybook Généré</h1>
      <p>Utilisez Storybook pour explorer les composants</p>
    </div>
  </React.StrictMode>,
);
