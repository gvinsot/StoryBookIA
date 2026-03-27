# StoryBook IA - POC de Génération Automatique de Storybook

Un système capable de générer automatiquement un Storybook fonctionnel à partir d'un pitch produit non structuré, en utilisant une architecture "reuse-first" avec Design Memory.

## 🎯 Objectif

Créer un POC fonctionnel qui:
1. Transforme un pitch produit en modèle UX structuré
2. Génère des composants React réutilisables
3. Produit un Storybook exploitable par des développeurs

## 🏗️ Architecture

```
StoryBookIA/
├── api/                          # Backend Node.js (Express)
│   ├── src/
│   │   ├── index.js              # Point d'entrée
│   │   ├── routes/               # Routes API
│   │   ├── engine/               # Moteurs de transformation
│   │   │   ├── pitchTransformer.js    # Pitch → UX Model
│   │   │   ├── componentGenerator.js  # UX Model → React Components
│   │   │   └── storybookGenerator.js  # Components → Storybook
│   │   └── memory/
│   │       └── designMemory.js   # Base de composants réutilisables
│   └── package.json
├── design-memory/                # Base de composants
│   └── components.json
├── generated-projects/           # Projets générés
└── storybook/                    # Storybooks générés
```

## 🚀 Installation

```bash
# Installer les dépendances du backend
cd api
npm install

# Démarrer le backend
npm start
```

Le backend sera disponible sur http://localhost:3001

## 📡 API

### POST /api/pitch/transform

Transforme un pitch produit en modèle UX et génère un Storybook complet.

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
  "projectPath": "/generated-projects/uuid",
  "uxModel": {...},
  "componentsCount": 8,
  "storybookUrl": "/storybook/project-name"
}
```

### GET /api/components/list

Liste tous les composants disponibles dans la Design Memory.

### GET /api/components/search?query=calendar

Recherche des composants par nom, description ou tags.

### POST /api/components/register

Enregistre un nouveau composant dans la Design Memory.

## 🧩 Design Memory

La Design Memory est une base de composants réutilisables qui suit le principe "reuse-first":

### Composants disponibles par défaut:

**Layout:**
- Container - Conteneur principal avec padding et max-width
- Grid - Système de grille responsive
- Card - Carte avec bordure et ombre

**Form:**
- Input - Champ de saisie texte
- Select - Liste déroulante
- Button - Bouton d'action

**Display:**
- Calendar - Calendrier interactif
- Table - Tableau de données
- Notification - Notification toast
- Badge - Badge d'information

**Overlay:**
- Modal - Modale interactive

## 🔄 Workflow de Génération

1. **Analyse du Pitch** - Extraction des features, entités, actions et rôles
2. **Génération UX** - Création des pages et composants nécessaires
3. **Recherche Design Memory** - Vérification des composants existants
4. **Génération de Code** - Création des composants React et CSS
5. **Génération Storybook** - Création des stories et configuration
6. **Enregistrement** - Sauvegarde dans la Design Memory pour réutilisation

## 📊 Exemple de Transformation

**Pitch:** "Application de gestion de réservations de salles avec calendrier, filtres, notifications et dashboard admin"

**Analyse détecte:**
- Features: calendar, filters, notifications, dashboard, booking, admin
- Entities: room, event
- Actions: create, edit, view
- Roles: admin, user

**Pages générées:**
- Dashboard (/dashboard)
- Calendrier (/calendar)
- Liste (/list)
- Admin Panel (/admin)
- Notifications (/notifications)

**Composants générés:**
- Container, Grid, Card, Button, Input, Select, Calendar, Table, Notification, Badge, Modal

## 🎨 Storybook Généré

Le Storybook généré inclut:
- Configuration Vite + Storybook
- Tous les composants avec leurs stories
- Stories par défaut et avec tous les props
- Stories spécifiques par composant
- Styles globaux cohérents
- README avec documentation

## 🧪 Tests

```bash
cd api
npm test
```

## 📝 Licence

MIT - POC pour démonstration technique

## 👨‍💻 Auteur

StoryBook IA Team