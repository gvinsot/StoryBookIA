import { Router } from 'express';
import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';
import { v4 as uuidv4 } from 'uuid';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = Router();
const historyPath = path.join(__dirname, '../../generated-projects', 'history.json');

// Ensure history file exists
async function ensureHistory() {
  await fs.ensureDir(path.dirname(historyPath));
  if (!(await fs.pathExists(historyPath))) {
    await fs.writeJson(historyPath, [], { spaces: 2 });
  }
}

// Load history
async function loadHistory() {
  await ensureHistory();
  try {
    return await fs.readJson(historyPath);
  } catch {
    return [];
  }
}

// Save history
async function saveHistory(history) {
  await ensureHistory();
  await fs.writeJson(historyPath, history, { spaces: 2 });
}

/**
 * GET /api/history
 * Récupère l'historique des générations (max 10)
 */
router.get('/', async (req, res) => {
  try {
    const history = await loadHistory();
    const recentHistory = history.slice(0, 10);
    res.json({ count: recentHistory.length, history: recentHistory });
  } catch (error) {
    console.error('❌ Error retrieving history:', error);
    res.status(500).json({ error: error.message });
  }
});

/**
 * POST /api/history
 * Enregistre une nouvelle génération dans l'historique
 */
router.post('/', async (req, res) => {
  try {
    const { projectId, projectName, componentCount, description } = req.body;
    
    if (!projectId) {
      return res.status(400).json({ error: 'projectId is required' });
    }
    
    const history = await loadHistory();
    
    const newEntry = {
      id: uuidv4(),
      projectId,
      projectName: projectName || 'Project',
      componentCount: componentCount || 0,
      description: description || '',
      createdAt: new Date().toISOString(),
      status: 'completed'
    };
    
    // Add to beginning and keep only 10 entries
    history.unshift(newEntry);
    const trimmedHistory = history.slice(0, 10);
    await saveHistory(trimmedHistory);
    
    res.json({ success: true, entry: newEntry });
  } catch (error) {
    console.error('❌ Error saving history:', error);
    res.status(500).json({ error: error.message });
  }
});

/**
 * DELETE /api/history/:entryId
 * Supprime une entrée de l'historique
 */
router.delete('/:entryId', async (req, res) => {
  try {
    const { entryId } = req.params;
    let history = await loadHistory();
    
    const initialLength = history.length;
    history = history.filter(entry => entry.id !== entryId);
    
    if (history.length === initialLength) {
      return res.status(404).json({ error: 'Entry not found' });
    }
    
    await saveHistory(history);
    res.json({ success: true });
  } catch (error) {
    console.error('❌ Error deleting history entry:', error);
    res.status(500).json({ error: error.message });
  }
});

/**
 * GET /api/history/:entryId/replay
 * Récupère les données d'un projet pour re-génération
 */
router.get('/:entryId/replay', async (req, res) => {
  try {
    const { entryId } = req.params;
    const history = await loadHistory();
    const entry = history.find(h => h.id === entryId);
    
    if (!entry) {
      return res.status(404).json({ error: 'Entry not found' });
    }
    
    const projectPath = path.join(__dirname, '../../generated-projects', entry.projectId);
    
    if (!(await fs.pathExists(projectPath))) {
      return res.status(404).json({ error: 'Project files not found' });
    }
    
    const uxModel = await fs.readJson(path.join(projectPath, 'ux-model.json'));
    const components = await fs.readJson(path.join(projectPath, 'components.json'));
    
    res.json({ entry, uxModel, components });
  } catch (error) {
    console.error('❌ Error retrieving replay data:', error);
    res.status(500).json({ error: error.message });
  }
});

export { router as historyRouter };