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
function generateStorybookConfig() {
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
 * Génère le fichier principal Storybook
 */
function generateMainFile() {
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
 * Génère le fichier index des stories
 */
function generateStoriesIndex(components) {
  const imports = components.map(comp => 
    `import * as ${comp.name}Stories from './${comp.name}.stories';`
  ).join('\\n');
  
  const exports = components.map(comp => 
    `export const ${comp.name} = ${comp.name}Stories;`
  ).join('\\n');
  
  return `// Auto-generated stories index
${imports}

${exports}
`;
}

/**
 * Génère le fichier package.json pour Storybook
 */
function generatePackageJson(appName) {
  return `{
  "name": "${appName.replace(/\\s+/g, '-').toLowerCase()}-storybook",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "storybook": "storybook dev -p 6006",
    "build-storybook": "storybook build"
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
    "storybook": "^7.6.0",
    "vite": "^5.0.0",
    "typescript": "^5.0.0"
  }
}
`;
}

/**
 * Génère le fichier Vite config
 */
function generateViteConfig() {
  return `import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
});
`;
}

/**
 * Génère le fichier HTML principal
 */
function generateIndexHtml(appName) {
  return `<!DOCTYPE html>
<html lang="fr">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${appName} - Storybook</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
`;
}

/**
 * Génère le fichier main.jsx
 */
function generateMainJsx() {
  return `import React from 'react';
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
`;
}

/**
 * Génère le CSS global
 */
function generateGlobalCSS() {
  return `* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: 'Inter', system-ui, -apple-system, sans-serif;
  line-height: 1.5;
  color: #374151;
  background: #f9fafb;
}

#root {
  min-height: 100vh;
  padding: 24px;
}
`;
}

/**
 * Génère le fichier tsconfig.json
 */
function generateTsConfig() {
  return `{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
`;
}

/**
 * Génère le fichier tsconfig.node.json
 */
function generateTsConfigNode() {
  return `{
  "compilerOptions": {
    "composite": true,
    "skipLibCheck": true,
    "module": "ESNext",
    "moduleResolution": "bundler",
    "allowSyntheticDefaultImports": true
  },
  "include": ["vite.config.ts"]
}
`;
}

/**
 * Génère un fichier README pour le projet Storybook
 */
function generateReadme(uxModel, components) {
  return `# ${uxModel.name} - Storybook Généré

## Description
${uxModel.description}

## Composants générés
${components.map(c => `- [${c.name}](./src/components/${c.name}.jsx) ${c.reused ? '(réutilisé)' : '(nouveau)'}`).join('\\n')}

## Installation

\`\`\`bash
npm install
\`\`\`

## Lancer Storybook

\`\`\`bash
npm run storybook
\`\`\`

Storybook sera disponible sur http://localhost:6006

## Build

\`\`\`bash
npm run build-storybook
\`\`\`

## Architecture

Ce Storybook a été généré automatiquement à partir d'un pitch produit en utilisant l'architecture **reuse-first** :

1. **Design Memory**: Base de composants réutilisables
2. **Pitch Transformer**: Analyse le pitch et génère un modèle UX
3. **Component Generator**: Génère les composants React en réutilisant ceux existants
4. **Storybook Generator**: Crée un Storybook complet et fonctionnel

## License
MIT
`;
}

/**
 * Génère un Storybook complet
 */
export async function generateStorybook(uxModel, components) {
  const projectId = uxModel.id;
  const storybookPath = path.join(__dirname, '../../storybook', projectId);
  
  console.log('📚 Generating Storybook...');
  
  // Créer la structure de dossiers
  await fs.ensureDir(path.join(storybookPath, 'src/components'));
  await fs.ensureDir(path.join(storybookPath, 'src/stories'));
  await fs.ensureDir(path.join(storybookPath, '.storybook'));
  
  // Générer les fichiers de configuration
  await fs.writeFile(
    path.join(storybookPath, '.storybook/main.ts'),
    generateStorybookConfig()
  );
  
  await fs.writeFile(
    path.join(storybookPath, '.storybook/preview.ts'),
    generateMainFile()
  );
  
  await fs.writeFile(
    path.join(storybookPath, 'vite.config.ts'),
    generateViteConfig()
  );
  
  await fs.writeFile(
    path.join(storybookPath, 'tsconfig.json'),
    generateTsConfig()
  );
  
  await fs.writeFile(
    path.join(storybookPath, 'tsconfig.node.json'),
    generateTsConfigNode()
  );
  
  await fs.writeFile(
    path.join(storybookPath, 'index.html'),
    generateIndexHtml(uxModel.name)
  );
  
  await fs.writeFile(
    path.join(storybookPath, 'package.json'),
    generatePackageJson(uxModel.name)
  );
  
  await fs.writeFile(
    path.join(storybookPath, 'src/main.jsx'),
    generateMainJsx()
  );
  
  await fs.writeFile(
    path.join(storybookPath, 'src/index.css'),
    generateGlobalCSS()
  );
  
  // Générer les composants
  const componentData = [];
  for (const component of components) {
    const { name, code, css, stories } = component;
    
    // Écrire le composant
    await fs.writeFile(
      path.join(storybookPath, 'src/components', `${name}.jsx`),
      code
    );
    
    // Écrire le CSS
    await fs.writeFile(
      path.join(storybookPath, 'src/components', `${name}.css`),
      css
    );
    
    // Écrire les stories
    await fs.writeFile(
      path.join(storybookPath, 'src/stories', `${name}.stories.jsx`),
      stories
    );
    
    componentData.push({
      name,
      path: `/src/components/${name}.jsx`,
      storiesPath: `/src/stories/${name}.stories.jsx`,
      reused: component.reused
    });
  }
  
  // Générer l'index des stories
  await fs.writeFile(
    path.join(storybookPath, 'src/stories/index.js'),
    generateStoriesIndex(components)
  );
  
  // Générer le README
  await fs.writeFile(
    path.join(storybookPath, 'README.md'),
    generateReadme(uxModel, components)
  );
  
  console.log('✅ Storybook generated at:', storybookPath);
  
  return {
    projectId,
    path: storybookPath,
    url: `/storybook/${projectId}`,
    components: componentData,
    componentCount: components.length
  };
}

export default generateStorybook;