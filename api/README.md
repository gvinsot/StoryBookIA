# StoryBook IA - Backend API

Backend Node.js pour la génération automatique de Storybook à partir de pitch produit.

## 📡 API Endpoints

### POST /api/pitch/transform

Transforme un pitch produit en modèle UX et génère un Storybook complet.

**Request:**
```bash
curl -X POST http://localhost:3001/api/pitch/transform \\
  -H "Content-Type: application/json" \\
  -d '{
    "pitch": "Application de gestion de réservations de salles avec calendrier, filtres, notifications et dashboard admin"
  }'
```

**Response:**
```json
{
  "projectId": "uuid",
  "projectPath": "/generated-projects/uuid",
  "uxModel": {
    "id": "uuid",
    "name": "Application gestion réservations",
    "description": "...",
    "analysis": {
      "features": ["calendar", "filters", "notifications", "dashboard", "booking", "admin"],
      "entities": ["room"],
      "roles": ["admin"]
    },
    "pages": [...],
    "componentRequirements": [...]
  },
  "componentsCount": 11,
  "storybookUrl": "/storybook/application-gestion-reservations"
}
```

### GET /api/components/list

Liste tous les composants disponibles dans la Design Memory.

```bash
curl http://localhost:3001/api/components/list
```

### GET /api/components/search?query=calendar

Recherche des composants par nom, description ou tags.

```bash
curl "http://localhost:3001/api/components/search?query=calendar"
```

### POST /api/components/register

Enregistre un nouveau composant dans la Design Memory.

```bash
curl -X POST http://localhost:3001/api/components/register \\
  -H "Content-Type: application/json" \\
  -d '{
    "name": "DatePicker",
    "type": "form",
    "category": "input",
    "description": "Sélecteur de date avancé",
    "props": [
      {"name": "value", "type": "Date", "required": false},
      {"name": "onChange", "type": "function", "required": true}
    ]
  }'
```

## 🧪 Tests

```bash
npm test
```

## 🎬 Démonstration

```bash
node demo.js
```

## 📦 Architecture

```
src/
├── index.js              # Point d'entrée Express
├── routes/
│   ├── pitchToUX.js      # Route de transformation pitch → UX
│   ├── components.js     # Route de gestion Design Memory
│   └── storybook.js      # Route de récupération Storybook
├── engine/
│   ├── pitchTransformer.js    # Analyse et transformation du pitch
│   ├── componentGenerator.js  # Génération de composants React
│   └── storybookGenerator.js  # Génération de Storybook complet
└── memory/
    └── designMemory.js   # Base de composants réutilisables
```

## 🔧 Configuration

### Variables d'environnement (optionnel)

```bash
PORT=3001  # Port du serveur (défaut: 3001)
```

## 📝 Licence

MIT