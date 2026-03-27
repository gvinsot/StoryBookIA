import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Génère un Storybook complet à partir des composants
 */

/**
 * Génère la configuration Storybook
 */
function generateStorybookConfig(projectId) {
  return `import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 6006,
    host: true,
  },
});
`;
}

/**
 * Génère le main.js de Storybook
 */
function generateStorybookMain() {
  return `import type { StorybookConfig } from "@storybook/react-vite";

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@storybook/addon-onboarding",
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  docs: {
    autodocs: "tag",
  },
};

export default config;
`;
}

/**
 * Génère le preview.js de Storybook
 */
function generateStorybookPreview() {
  return `import type { Preview } from "@storybook/react";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
`;
}

/**
 * Génère le package.json du projet Storybook
 */
function generatePackageJson(projectName) {
  return `{
  "name": "${projectName}-storybook",
  "version": "1.0.0",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "storybook dev -p 6006",
    "build": "storybook build",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  },
  "devDependencies": {
    "@storybook/react": "^7.6.0",
    "@storybook/react-vite": "^7.6.0",
    "@storybook/addon-essentials": "^7.6.0",
    "@storybook/addon-interactions": "^7.6.0",
    "@storybook/addon-links": "^7.6.0",
    "@storybook/addon-onboarding": "^1.0.0",
    "@storybook/blocks": "^7.6.0",
    "storybook": "^7.6.0",
    "vite": "^5.0.0",
    "@vitejs/plugin-react": "^4.2.0",
    "typescript": "^5.0.0"
  }
}
`;
}

/**
 * Génère le fichier index.html
 */
function generateIndexHtml(projectName) {
  return `<!DOCTYPE html>
<html lang="fr">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${projectName} - Storybook</title>
    <link rel="stylesheet" href="/src/styles.css" />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
`;
}

/**
 * Génère les styles globaux
 */
function generateGlobalStyles() {
  return `* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Inter', system-ui, -apple-system, sans-serif;
  background: #f3f4f6;
  color: #1f2937;
  line-height: 1.5;
}

#root {
  min-height: 100vh;
}

/* Container */
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 16px;
}

.container.fluid {
  max-width: 100%;
}

/* Card */
.card {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.card:hover {
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
}

.card-header {
  padding: 16px;
  border-bottom: 1px solid #e5e7eb;
  font-weight: 600;
}

.card-body {
  padding: 16px;
}

.card-footer {
  padding: 16px;
  border-top: 1px solid #e5e7eb;
  background: #f9fafb;
}

/* Button */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.btn-primary {
  background: #3b82f6;
  color: white;
}

.btn-primary:hover:not(:disabled) {
  background: #2563eb;
}

.btn-secondary {
  background: #6b7280;
  color: white;
}

.btn-small {
  padding: 6px 12px;
  font-size: 14px;
}

.btn-medium {
  padding: 8px 16px;
  font-size: 16px;
}

.btn-large {
  padding: 12px 24px;
  font-size: 18px;
}

/* Input */
.input-group {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.input-label {
  font-size: 14px;
  font-weight: 500;
  color: #374151;
}

.input {
  padding: 8px 12px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 16px;
  transition: border-color 0.2s;
}

.input:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.input.error {
  border-color: #ef4444;
}

.input-error {
  font-size: 12px;
  color: #ef4444;
}

/* Select */
.select-group {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.select-label {
  font-size: 14px;
  font-weight: 500;
  color: #374151;
}

.select {
  padding: 8px 12px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 16px;
  background: white;
  cursor: pointer;
}

.select:focus {
  outline: none;
  border-color: #3b82f6;
}

/* Grid */
.grid {
  display: grid;
  gap: 16px;
}

/* Badge */
.badge {
  display: inline-flex;
  align-items: center;
  padding: 4px 8px;
  border-radius: 4px;
  font-weight: 500;
}

.badge-primary {
  background: #3b82f6;
  color: white;
}

.badge-success {
  background: #10b981;
  color: white;
}

.badge-warning {
  background: #f59e0b;
  color: white;
}

.badge-danger {
  background: #ef4444;
  color: white;
}

.badge-small {
  font-size: 12px;
}

.badge-medium {
  font-size: 14px;
}

/* Modal */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal {
  background: white;
  border-radius: 8px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  position: relative;
}

.modal-small {
  width: 400px;
  max-width: 90vw;
}

.modal-medium {
  width: 600px;
  max-width: 90vw;
}

.modal-large {
  width: 800px;
  max-width: 90vw;
}

.modal-header {
  padding: 20px;
  border-bottom: 1px solid #e5e7eb;
}

.modal-body {
  padding: 20px;
}

.modal-close {
  position: absolute;
  top: 16px;
  right: 16px;
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #6b7280;
}

.modal-close:hover {
  color: #374151;
}

/* Notification */
.notification {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  animation: slideIn 0.3s ease;
}

@keyframes slideIn {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

.notification-info {
  background: #3b82f6;
  color: white;
}

.notification-success {
  background: #10b981;
  color: white;
}

.notification-warning {
  background: #f59e0b;
  color: white;
}

.notification-error {
  background: #ef4444;
  color: white;
}

.notification-close {
  background: none;
  border: none;
  color: inherit;
  font-size: 24px;
  cursor: pointer;
  opacity: 0.8;
}

.notification-close:hover {
  opacity: 1;
}

/* Calendar */
.calendar {
  background: white;
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.calendar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.calendar-nav {
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  padding: 4px 8px;
}

.calendar-title {
  font-weight: 600;
  font-size: 18px;
}

.calendar-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 4px;
}

.calendar-day-header {
  text-align: center;
  font-size: 12px;
  font-weight: 600;
  color: #6b7280;
  padding: 8px;
}

.calendar-day {
  aspect-ratio: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.2s;
}

.calendar-day:hover {
  background: #f3f4f6;
}

.calendar-day.weekend {
  color: #ef4444;
}

/* Table */
.table {
  width: 100%;
  border-collapse: collapse;
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.table th,
.table td {
  padding: 12px 16px;
  text-align: left;
  border-bottom: 1px solid #e5e7eb;
}

.table th {
  background: #f9fafb;
  font-weight: 600;
  font-size: 14px;
  text-transform: uppercase;
  color: #6b7280;
}

.table tbody tr:hover {
  background: #f9fafb;
}

.table tbody tr.clickable {
  cursor: pointer;
}
`;
}

/**
 * Génère le main.jsx de l'application
 */
function generateMainJSX(components) {
  const imports = components.map(c => `import { ${c.name} } from './components/${c.name}';`).join('\n');
  
  return `import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles.css';
${imports}

function App() {
  return (
    <div className="app">
      <h1>StoryBook IA - Generated Components</h1>
      <div className="container">
        <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
${components.map(c => `          <${c.name}>
            <h2>${c.name}</h2>
            <p>${c.description}</p>
          </${c.name}>`).join('\n')}
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
`;
}

/**
 * Génère un Storybook complet
 */
export async function generateStorybook(uxModel, components) {
  console.log('📚 Generating Storybook...');
  
  const projectName = uxModel.name.replace(/\s+/g, '-').toLowerCase();
  const storybookPath = path.join(__dirname, '../../storybook', projectName);
  
  // Créer la structure de dossiers
  await fs.ensureDir(path.join(storybookPath, 'src', 'components'));
  await fs.ensureDir(path.join(storybookPath, '.storybook'));
  
  // Générer les fichiers de configuration
  await fs.writeFile(
    path.join(storybookPath, 'vite.config.js'),
    generateStorybookConfig(projectName)
  );
  
  await fs.writeFile(
    path.join(storybookPath, '.storybook', 'main.js'),
    generateStorybookMain()
  );
  
  await fs.writeFile(
    path.join(storybookPath, '.storybook', 'preview.js'),
    generateStorybookPreview()
  );
  
  await fs.writeFile(
    path.join(storybookPath, 'package.json'),
    generatePackageJson(projectName)
  );
  
  await fs.writeFile(
    path.join(storybookPath, 'index.html'),
    generateIndexHtml(projectName)
  );
  
  await fs.writeFile(
    path.join(storybookPath, 'src', 'styles.css'),
    generateGlobalStyles()
  );
  
  // Générer les composants et leurs stories
  for (const component of components) {
    // Écrire le composant
    await fs.writeFile(
      path.join(storybookPath, 'src', 'components', `${component.name}.jsx`),
      component.code
    );
    
    // Écrire le CSS
    await fs.writeFile(
      path.join(storybookPath, 'src', 'components', `${component.name}.css`),
      component.css
    );
    
    // Écrire les stories
    await fs.writeFile(
      path.join(storybookPath, 'src', 'components', `${component.name}.stories.jsx`),
      component.stories
    );
  }
  
  // Générer le main.jsx
  await fs.writeFile(
    path.join(storybookPath, 'src', 'main.jsx'),
    generateMainJSX(components)
  );
  
  // Générer le README
  await fs.writeFile(
    path.join(storybookPath, 'README.md'),
    `# ${uxModel.name} - Storybook

Généré automatiquement par StoryBook IA à partir du pitch:

> ${uxModel.description}

## Composants générés

${components.map(c => `- **${c.name}**: ${c.description}`).join('\n')}

## Installation

\`\`\`bash
npm install
\`\`\`

## Démarrer le Storybook

\`\`\`bash
npm run dev
\`\`\`

Le Storybook sera disponible sur http://localhost:6006

## Build

\`\`\`bash
npm run build
\`\`\`

## Architecture

Ce projet a été généré avec l'approche **reuse-first**:
- Les composants existants de la Design Memory ont été réutilisés
- De nouveaux composants ont été créés uniquement si nécessaire
- Tous les composants sont documentés avec des stories Storybook
`
  );
  
  console.log(`✅ Storybook generated at: ${storybookPath}`);
  
  return {
    projectName,
    path: `/storybook/${projectName}`,
    components: components.map(c => c.name),
    componentCount: components.length
  };
}

export default generateStorybook;