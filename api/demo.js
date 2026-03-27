import { transformPitchToUX } from './src/engine/pitchTransformer.js';
import { generateComponents } from './src/engine/componentGenerator.js';
import { generateStorybook } from './src/engine/storybookGenerator.js';

/**
 * Script de demonstration du POC StoryBook IA
 */

async function demo() {
  console.log('');
  console.log('🎬 StoryBook IA - Demonstration');
  console.log('');
  console.log('============================================================');
  
  // Pitch d'exemple
  const pitch = 'Application de gestion de reservations de salles avec calendrier, filtres, notifications et dashboard admin';
  
  console.log('');
  console.log('📝 PITCH ENTREE:');
  console.log('"' + pitch + '"');
  console.log('');
  console.log('============================================================');
  
  // Etape 1: Transformer le pitch en modele UX
  console.log('');
  console.log('🔄 Etape 1: Transformation du pitch en modele UX...');
  console.log('');
  const uxModel = transformPitchToUX(pitch);
  
  console.log('');
  console.log('📊 RESULTATS DE L\'ANALYSE:');
  console.log('  • Features detectees: ' + uxModel.analysis.features.join(', '));
  console.log('  • Entites detectees: ' + uxModel.analysis.entities.join(', '));
  console.log('  • Roles detectes: ' + uxModel.analysis.roles.join(', '));
  
  console.log('');
  console.log('📄 PAGES GENEREES:');
  uxModel.pages.forEach(page => {
    console.log('  • ' + page.name + ' (' + page.path + ')');
    console.log('    Composants: ' + page.components.join(', '));
  });
  
  // Etape 2: Generer les composants
  console.log('');
  console.log('');
  console.log('🧩 Etape 2: Generation des composants React...');
  console.log('');
  const components = generateComponents(uxModel);
  
  console.log('');
  console.log('📦 COMPOSANTS GENERES:');
  components.forEach(comp => {
    console.log('  • ' + comp.name + ' (' + comp.type + ')');
    console.log('    ' + comp.description);
  });
  
  // Etape 3: Generer le Storybook
  console.log('');
  console.log('');
  console.log('📚 Etape 3: Generation du Storybook...');
  console.log('');
  const storybookResult = await generateStorybook(uxModel, components);
  
  console.log('');
  console.log('✅ STORYBOOK GENERE:');
  console.log('  • Nom du projet: ' + uxModel.name);
  console.log('  • Nombre de composants: ' + components.length);
  console.log('  • Chemin: api/storybook/' + uxModel.id);
  
  console.log('');
  console.log('📁 STRUCTURE DU STORYBOOK:');
  console.log('  .storybook/');
  console.log('    ├── main.js       # Configuration Storybook');
  console.log('    └── preview.js    # Preview global');
  console.log('');
  console.log('  src/');
  console.log('    ├── components/');
  components.forEach(c => {
    console.log('    │   ├── ' + c.name + '.jsx');
    console.log('    │   ├── ' + c.name + '.css');
    console.log('    │   └── ' + c.name + '.stories.jsx');
  });
  console.log('    ├── main.jsx      # Application d\'exemple');
  console.log('    └── styles.css    # Styles globaux');
  console.log('');
  console.log('  index.html');
  console.log('  package.json');
  console.log('  vite.config.js');
  console.log('  README.md');
  
  console.log('');
  console.log('🚀 POUR DEMARRER LE STORYBOOK:');
  console.log('  cd api/storybook/' + uxModel.id);
  console.log('  npm install');
  console.log('  npm run dev');
  console.log('');
  console.log('  Le Storybook sera disponible sur http://localhost:6006');
  console.log('');
  
  console.log('============================================================');
  console.log('✅ Demonstration terminee!');
  console.log('');
}

// Lancer la demonstration
demo().catch(console.error);