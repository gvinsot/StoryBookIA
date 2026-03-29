# Application test - Storybook Généré

## Description
Application de test

## Composants générés
- [Container](./src/components/Container.jsx) (réutilisé)\n- [Button](./src/components/Button.jsx) (réutilisé)\n- [Card](./src/components/Card.jsx) (réutilisé)

## Installation

```bash
npm install
```

## Lancer Storybook

```bash
npm run storybook
```

Storybook sera disponible sur http://localhost:6006

## Build

```bash
npm run build-storybook
```

## Architecture

Ce Storybook a été généré automatiquement à partir d'un pitch produit en utilisant l'architecture **reuse-first** :

1. **Design Memory**: Base de composants réutilisables
2. **Pitch Transformer**: Analyse le pitch et génère un modèle UX
3. **Component Generator**: Génère les composants React en réutilisant ceux existants
4. **Storybook Generator**: Crée un Storybook complet et fonctionnel

## License
MIT
