import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles.css';
import { Container } from './components/Container';
import { Button } from './components/Button';
import { Grid } from './components/Grid';
import { Card } from './components/Card';
import { Table } from './components/Table';
import { Calendar } from './components/Calendar';
import { Modal } from './components/Modal';
import { Input } from './components/Input';
import { Select } from './components/Select';
import { Badge } from './components/Badge';
import { Notification } from './components/Notification';

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
          <Grid>
            <h2>Grid</h2>
            <p>Système de grille responsive</p>
          </Grid>
          <Card>
            <h2>Card</h2>
            <p>Carte avec bordure et ombre</p>
          </Card>
          <Table>
            <h2>Table</h2>
            <p>Tableau de données</p>
          </Table>
          <Calendar>
            <h2>Calendar</h2>
            <p>Composant calendrier interactif</p>
          </Calendar>
          <Modal>
            <h2>Modal</h2>
            <p>Modale interactive</p>
          </Modal>
          <Input>
            <h2>Input</h2>
            <p>Champ de saisie texte</p>
          </Input>
          <Select>
            <h2>Select</h2>
            <p>Liste déroulante</p>
          </Select>
          <Badge>
            <h2>Badge</h2>
            <p>Badge d'information</p>
          </Badge>
          <Notification>
            <h2>Notification</h2>
            <p>Notification toast</p>
          </Notification>
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
