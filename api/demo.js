import { transformPitchToUX } from './src/engine/pitchTransformer.js';
import { generateComponents } from './src/engine/componentGenerator.js';
import { generateStorybook } from './src/engine/storybookGenerator.js';

/**
 * Script de démonstration du POC StoryBook IA
 */

async function demo() {
  console.log('\\n🎬 StoryBook IA - Démonstration\\n');
  console.log('='.repeat(60));
  
  // Pitch d'exemple
  const pitch = 'Application de gestion de réservations de salles avec calendrier, filtres, notifications et dashboard admin';
  
  console.log('\\n📝 PITCH ENTRÉE:');
  console.log(`"${pitch}"\\n`);
  console.log('='.repeat(60));
  
  // Étape 1: Transformer le pitch en modèle UX
  console.log('\\n🔄 Étape 1: Transformation du pitch en modèle UX...\\n');
  const uxModel = transformPitchToUX(pitch);
  
  console.log('\\n📊 RÉSULTATS DE L\\'ANALYSE:');
  console.log(`  • Features détectées: ${uxModel.analysis.features.join(', ')}`);
  console.log(`  • Entités détectées: ${uxModel.analysis.entities.join(', ')}`);
  console.log(`  • Rôles détectés: ${uxModel.analysis.roles.join(', ')}`);
  
  console.log('\\n📄 PAGES GÉNÉRÉES:');
  uxModel.pages.forEach(page => {
    console.log(`  • ${page.name} (${page.path})`);
    console.log(`    Composants: ${page.components.join(', ')}`);
  });
  
  // Étape 2: Générer les composants
  console.log('\\n\\n🧩 Étape 2: Génération des composants React...\\n');
  const components = generateComponents(uxModel);
  
  console.log('\\n📦 COMPOSANTS GÉNÉRÉS:');
  components.forEach(comp => {
    console.log(`  • ${comp.name} (${comp.type})`);
    console.log(`    ${comp.description}`);
  });
  
  // Étape 3: Générer le Storybook
  console.log('\\n\\n📚 Étape 3: Génération du Storybook...\\n');
  const storybookResult = await generateStorybook(uxModel, components);
  
  console.log('\\n✅ STORYBOOK GÉNÉRÉ:');
  console.log(`  • Nom du projet: ${storybookResult.projectName}`);
  console.log(`  • Nombre de composants: ${storybookResult.componentCount}`);
  console.log(`  • Chemin: api/storybook/${storybookResult.projectName}`);
  
  console.log('\\n📁 STRUCTURE DU STORYBOOK:');
  console.log(`  .storybook/
    ├── main.js       # Configuration Storybook
    └── preview.js    # Preview global
  
  src/
    ├── components/
    │   ├── ${components.map(c => c.name + '.jsx').join('\\n    │   ├── ')}
    │   ├── ${components.map(c => c.name + '.css').join('\\n    │   ├── ')}
    │   └── ${components.map(c => c.name + '.stories.jsx').join('\\n    │   └── ')}
    ├── main.jsx      # Application d'exemple
    └── styles.css    # Styles globaux
  
  index.html
  package.json
  vite.config.js
  README.md`);
  
  console.log('\\n🚀 POUR DÉMARRER LE STORYBOOK:');
  console.log(`  cd api/storybook/${storybookResult.projectName}`);
  console.log('  npm install');
  console.log('  npm run dev');
  console.log('\\n  Le Storybook sera disponible sur http://localhost:6006\\n');
  
  console.log('='.repeat(60));
  console.log('✅ Démonstration terminée!\\n');
}

// Lancer la démonstration
demo().catch(console.error);