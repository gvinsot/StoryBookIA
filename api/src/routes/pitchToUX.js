import { Router } from 'express';
import { transformPitchToUX } from '../engine/pitchTransformer.js';
import { generateComponents } from '../engine/componentGenerator.js';
import { generateStorybook } from '../engine/storybookGenerator.js';
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = Router();

/**
 * POST /api/pitch/transform
 * Transforme un pitch produit en modèle UX structuré
 */
router.post('/transform', async (req, res) => {
  try {
    const { pitch } = req.body;
    
    if (!pitch || typeof pitch !== 'string') {
      return res.status(400).json({ error: 'Pitch is required' });
    }

    console.log('🔄 Transforming pitch:', pitch);
    
    // Étape 1: Transformer le pitch en modèle UX
    const uxModel = transformPitchToUX(pitch);
    
    // Étape 2: Générer les composants React
    const components = generateComponents(uxModel);
    
    // Étape 3: Générer le Storybook
    const storybookData = await generateStorybook(uxModel, components);
    
    // Étape 4: Sauvegarder le projet généré
    const projectId = uuidv4();
    const projectPath = path.join(__dirname, '../../generated-projects', projectId);
    
    await fs.ensureDir(projectPath);
    await fs.writeJson(path.join(projectPath, 'ux-model.json'), uxModel, { spaces: 2 });
    await fs.writeJson(path.join(projectPath, 'components.json'), components, { spaces: 2 });
    await fs.writeJson(path.join(projectPath, 'storybook.json'), storybookData, { spaces: 2 });
    
    // Étape 5: Enregistrer dans l'historique
    const historyPath = path.join(__dirname, '../../generated-projects', 'history.json');
    await fs.ensureDir(path.dirname(historyPath));
    
    let history = [];
    try {
      if (await fs.pathExists(historyPath)) {
        history = await fs.readJson(historyPath);
      }
    } catch {
      history = [];
    }
    
    const newEntry = {
      id: uuidv4(),
      projectId,
      projectName: uxModel.name || 'Project',
      componentCount: components.length,
      description: pitch,
      createdAt: new Date().toISOString(),
      status: 'completed'
    };
    
    history.unshift(newEntry);
    const trimmedHistory = history.slice(0, 10);
    await fs.writeJson(historyPath, trimmedHistory, { spaces: 2 });
    
    console.log('✅ Project generated:', projectId);
    
    res.json({
      projectId,
      projectPath: `/generated-projects/${projectId}`,
      uxModel,
      componentsCount: components.length,
      storybookUrl: `/storybook/${projectId}`
    });
  } catch (error) {
    console.error('❌ Error transforming pitch:', error);
    res.status(500).json({ error: error.message });
  }
});

/**
 * GET /api/pitch/:projectId
 * Récupère un projet généré
 */
router.get('/:projectId', async (req, res) => {
  try {
    const { projectId } = req.params;
    const projectPath = path.join(__dirname, '../../generated-projects', projectId);
    
    if (!(await fs.pathExists(projectPath))) {
      return res.status(404).json({ error: 'Project not found' });
    }
    
    const uxModel = await fs.readJson(path.join(projectPath, 'ux-model.json'));
    const components = await fs.readJson(path.join(projectPath, 'components.json'));
    const storybookData = await fs.readJson(path.join(projectPath, 'storybook.json'));
    
    res.json({ projectId, uxModel, components, storybookData });
  } catch (error) {
    console.error('❌ Error retrieving project:', error);
    res.status(500).json({ error: error.message });
  }
});

export { router as pitchToUXRouter };