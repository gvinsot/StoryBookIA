import { Router } from 'express';
import { DesignMemory } from '../memory/designMemory.js';
import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = Router();
const designMemory = new DesignMemory();

/**
 * GET /api/components/search
 * Recherche des composants existants dans la Design Memory
 */
router.get('/search', async (req, res) => {
  try {
    const { query, type } = req.query;
    
    const results = designMemory.searchComponents(query, type);
    
    res.json({
      count: results.length,
      components: results
    });
  } catch (error) {
    console.error('❌ Error searching components:', error);
    res.status(500).json({ error: error.message });
  }
});

/**
 * GET /api/components/list
 * Liste tous les composants disponibles
 */
router.get('/list', async (req, res) => {
  try {
    const components = designMemory.getAllComponents();
    
    res.json({
      count: components.length,
      components
    });
  } catch (error) {
    console.error('❌ Error listing components:', error);
    res.status(500).json({ error: error.message });
  }
});

/**
 * POST /api/components/register
 * Enregistre un nouveau composant dans la Design Memory
 */
router.post('/register', async (req, res) => {
  try {
    const { name, type, props, description, category } = req.body;
    
    if (!name || !type) {
      return res.status(400).json({ error: 'name and type are required' });
    }
    
    const component = designMemory.registerComponent({
      name,
      type,
      props: props || [],
      description: description || '',
      category: category || 'general'
    });
    
    res.json({ success: true, component });
  } catch (error) {
    console.error('❌ Error registering component:', error);
    res.status(500).json({ error: error.message });
  }
});

export { router as componentRouter };