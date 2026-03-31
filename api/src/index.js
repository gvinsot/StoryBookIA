import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs-extra';
import { pitchToUXRouter } from './routes/pitchToUX.js';
import { componentRouter } from './routes/components.js';
import { storybookRouter } from './routes/storybook.js';
import { historyRouter } from './routes/history.js';
import { downloadRouter } from './routes/download.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
// Note: In production, Traefik strips the /api prefix before forwarding.
// The Vite dev proxy forwards /api/* as-is, so we mount at both paths.
app.use('/api/pitch', pitchToUXRouter);
app.use('/api/components', componentRouter);
app.use('/api/storybook', storybookRouter);
app.use('/api/history', historyRouter);
app.use('/api/download', downloadRouter);
app.use('/pitch', pitchToUXRouter);
app.use('/components', componentRouter);
app.use('/storybook', storybookRouter);
app.use('/history', historyRouter);
app.use('/download', downloadRouter);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'storybook-ia-backend' });
});

// Serve static files for generated storybook
// FIX: Serve from api/storybook directory where storybooks are actually generated
const storybookDir = path.join(__dirname, '../storybook');

// Route to serve storybook HTML for a specific project
app.get('/storybook/:projectId', async (req, res) => {
  try {
    const { projectId } = req.params;
    const projectPath = path.join(storybookDir, projectId);
    const indexPath = path.join(projectPath, 'index.html');
    
    // Check if project exists
    if (!(await fs.pathExists(projectPath))) {
      return res.status(404).send('<h1>Storybook not found</h1><p>The requested project does not exist.</p>');
    }
    
    // Check if index.html exists
    if (!(await fs.pathExists(indexPath))) {
      return res.status(404).send('<h1>Storybook index not found</h1><p>The project exists but index.html is missing.</p>');
    }
    
    // Serve the index.html with proper base path for assets
    let html = await fs.readFile(indexPath, 'utf-8');
    
    // Replace /src with /storybook/<projectId>/src for proper asset loading
    html = html.replace(/href="\/src\//g, `href="/storybook/${projectId}/src/`);
    html = html.replace(/src="\/src\//g, `src="/storybook/${projectId}/src/`);
    html = html.replace(/src="\//g, `src="/storybook/${projectId}/`);
    
    res.set('Content-Type', 'text/html');
    res.send(html);
  } catch (error) {
    console.error('❌ Error serving storybook:', error);
    res.status(500).send('<h1>Internal Server Error</h1><p>Failed to load the storybook.</p>');
  }
});

// Serve static assets for storybooks
app.use('/storybook/:projectId', express.static(storybookDir));

app.listen(PORT, () => {
  console.log(`🚀 StoryBook IA Backend running on port ${PORT}`);
  console.log(`📚 Storybook available at http://localhost:${PORT}/storybook/<projectId>`);
});

export default app;