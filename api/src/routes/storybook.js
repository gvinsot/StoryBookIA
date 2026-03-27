import { Router } from 'express';
import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = Router();

/**
 * GET /api/storybook/:projectId
 * Récupère les données Storybook pour un projet
 */
router.get('/:projectId', async (req, res) => {
  try {
    const { projectId } = req.params;
    const storybookPath = path.join(__dirname, '../../generated-projects', projectId, 'storybook.json');
    
    if (!(await fs.pathExists(storybookPath))) {
      return res.status(404).json({ error: 'Storybook not found' });
    }
    
    const storybookData = await fs.readJson(storybookPath);
    res.json(storybookData);
  } catch (error) {
    console.error('❌ Error retrieving storybook:', error);
    res.status(500).json({ error: error.message });
  }
});

/**
 * GET /api/storybook/:projectId/stories
 * Récupère les stories générées
 */
router.get('/:projectId/stories', async (req, res) => {
  try {
    const { projectId } = req.params;
    const storiesPath = path.join(__dirname, '../../generated-projects', projectId, 'stories');
    
    if (!(await fs.pathExists(storiesPath))) {
      return res.status(404).json({ error: 'Stories not found' });
    }
    
    const files = await fs.readdir(storiesPath);
    const stories = [];
    
    for (const file of files) {
      if (file.endsWith('.stories.jsx')) {
        const content = await fs.readFile(path.join(storiesPath, file), 'utf-8');
        stories.push({ filename: file, content });
      }
    }
    
    res.json({ count: stories.length, stories });
  } catch (error) {
    console.error('❌ Error retrieving stories:', error);
    res.status(500).json({ error: error.message });
  }
});

export { router as storybookRouter };