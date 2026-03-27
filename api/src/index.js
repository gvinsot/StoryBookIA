import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import path from 'path';
import { fileURLToPath } from 'url';
import { pitchToUXRouter } from './routes/pitchToUX.js';
import { componentRouter } from './routes/components.js';
import { storybookRouter } from './routes/storybook.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/api/pitch', pitchToUXRouter);
app.use('/api/components', componentRouter);
app.use('/api/storybook', storybookRouter);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'storybook-ia-backend' });
});

// Serve static files for generated storybook
app.use('/storybook', express.static(path.join(__dirname, '../../storybook')));

app.listen(PORT, () => {
  console.log(`🚀 StoryBook IA Backend running on port ${PORT}`);
  console.log(`📚 Storybook available at http://localhost:${PORT}/storybook`);
});

export default app;