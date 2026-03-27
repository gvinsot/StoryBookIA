import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles.css';
import { Container } from './components/Container';
import { Button } from './components/Button';
import { Card } from './components/Card';

function App() {
  return (
    <div className="app">
      <h1>StoryBook IA - Generated Components</h1>
      <div className="container">
        <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
          <Container>
            <h2>Container</h2>
            <p>Conteneur principal avec padding et max-width</p>
          </Container>
          <Button>
            <h2>Button</h2>
            <p>Bouton d'action</p>
          </Button>
          <Card>
            <h2>Card</h2>
            <p>Carte avec bordure et ombre</p>
          </Card>
        </div>
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
