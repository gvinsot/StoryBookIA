# StoryBook IA - POC de Génération Automatique de Storybook

## 🎯 Objectif

Ce POC démontre la capacité de générer automatiquement un Storybook fonctionnel à partir d'un pitch produit non structuré, en utilisant une architecture "reuse-first" basée sur une Design Memory.

## 🏗️ Architecture

```
StoryBookIA/
├── api/                          # Backend Node.js
│   ├── src/
│   │   ├── index.js             # Point d'entrée Express
│   │   ├── routes/              # Routes API
│   │   │   ├── pitchToUX.js     # Transformation Pitch → UX
│   │   │   ├── components.js    # Gestion des composants
│   │   │   └── storybook.js     # Génération Storybook
│   │   ├── engine/              # Moteurs de génération
│   │   │   ├── pitchTransformer.js    # Analyse du pitch
│   │   │   ├── componentGenerator.js  # Génération de composants
│   │   │   └── storybookGenerator.js  # Génération de Storybook
│   │   └── memory/              # Design Memory
│   │       └── designMemory.js  # Base de composants réutilisables
│   └── package.json
├── storybook/                    # Storybooks générés
├── generated-projects/           # Projets générés (JSON)
└── design-memory/                # Base de composants
    └── components.json
```

## 🚀 Fonctionnalités

### 1. Analyse de Pitch
- Extraction automatique des features, entités, actions et rôles
- Génération d'un modèle UX structuré
- Détection des pages nécessaires

### 2. Design Memory
- Base de composants pré-définis (Container, Card, Button, Input, etc.)
- Recherche sémantique de composants
- Architecture "reuse-first": réutilisation avant création

### 3. Génération de Composants
- Code React complet avec props et documentation
- CSS stylisé et responsive
- Stories Storybook automatiques

### 4. Génération de Storybook
- Configuration complète (.storybook/main.ts, preview.ts)
- Fichiers de build (vite, typescript)
- README généré automatiquement

## 📝 API

### POST /api/pitch/transform
Transforme un pitch produit en modèle UX et génère le Storybook.

**Request:**
```json
{
  "pitch": "Application de gestion de réservations de salles avec calendrier, filtres, notifications et dashboard admin"
}
```

**Response:**
```json
{
  "projectId": "uuid",
  "uxModel": {...},
  "componentsCount": 8,
  "storybookUrl": "/storybook/uuid"
}
```

### GET /api/components/list
Liste tous les composants disponibles dans la Design Memory.

### GET /api/components/search?query=button
Recherche des composants par requête textuelle.

### POST /api/components/register
Enregistre un nouveau composant dans la Design Memory.

## 🏃 Installation et Lancement

### Backend
```bash
cd api
npm install
npm start
```

Le backend sera disponible sur http://localhost:3001

### Test avec curl
```bash
curl -X POST http://localhost:3001/api/pitch/transform \
  -H "Content-Type: application/json" \
  -d '{"pitch": "Application de gestion de réservations de salles avec calendrier, filtres, notifications et dashboard admin"}'
```

### Storybook Généré
Une fois le projet généré, naviguez vers la URL retournée pour voir le Storybook.

## 🧩 Composants de Base (Design Memory)

### Layout
- **Container**: Conteneur principal avec padding et max-width
- **Grid**: Système de grille responsive
- **Card**: Carte avec bordure et ombre

### Form
- **Input**: Champ de saisie texte
- **Select**: Liste déroulante
- **Button**: Bouton d'action

### Display
- **Calendar**: Calendrier interactif
- **Table**: Tableau de données
- **Notification**: Notification toast
- **Badge**: Badge d'information

### Overlay
- **Modal**: Modale interactive

## 🎨 Exemple de Pitch

```
"Application de gestion de réservations de salles avec calendrier, filtres, notifications et dashboard admin"
```

**Résultat:**
- Pages générées: Dashboard, Calendrier, Liste, Admin Panel, Notifications
- Composants nécessaires: Container, Grid, Card, Button, Input, Select, Calendar, Table, Notification, Badge, Modal
- Storybook complet avec stories pour chaque composant

## 🔄 Architecture Reuse-First

1. **Analyse du besoin**: Le système analyse les composants requis
2. **Recherche dans Design Memory**: Vérifie si le composant existe déjà
3. **Réutilisation**: Si existe, utilise le composant existant
4. **Création**: Sinon, génère un nouveau composant
5. **Enregistrement**: Le nouveau composant est ajouté à la Design Memory

## 📚 Technologies

- **Backend**: Node.js + Express
- **Frontend**: React
- **Documentation**: Storybook 7.x
- **Build**: Vite
- **Langage**: JavaScript ES Modules

## 🧪 Tests

```bash
cd api
npm test
```

## 📄 License

MIT