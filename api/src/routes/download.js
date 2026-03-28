import { Router } from 'express';
import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';
import archiver from 'archiver';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = Router();

/**
 * GET /api/download/:projectId
 * Télécharge le storybook généré en ZIP
 */
router.get('/:projectId', async (req, res) => {
  try {
    const { projectId } = req.params;
    const storybookPath = path.join(__dirname, '../../storybook', projectId);
    
    if (!(await fs.pathExists(storybookPath))) {
      return res.status(404).json({ error: 'Storybook not found' });
    }
    
    const archive = archiver('zip', {
      zlib: { level: 9 }
    });
    
    res.attachment(`${projectId}-storybook.zip`);
    
    archive.pipe(res);
    archive.directory(storybookPath, false);
    await archive.finalize();
  } catch (error) {
    console.error('❌ Error downloading storybook:', error);
    if (!res.headersSent) {
      res.status(500).json({ error: error.message });
    }
  }
});

export { router as downloadRouter };