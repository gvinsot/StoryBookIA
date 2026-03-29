import { generateStorybook } from '../engine/storybookGenerator.js';
import { transformPitchToUX } from '../engine/pitchTransformer.js';
import { generateComponents } from '../engine/componentGenerator.js';
import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

describe('Storybook Generator', () => {
  test('should generate storybook structure', async () => {
    const uxModel = transformPitchToUX('Application de test');
    const components = generateComponents(uxModel);
    const result = await generateStorybook(uxModel, components);
    
    expect(result.projectId).toBeTruthy();
    expect(result.components.length).toBeGreaterThan(0);
    expect(result.componentCount).toBe(components.length);
    expect(result.path).toBeTruthy();
    expect(result.url).toBeTruthy();
  });

  test('should create storybook files', async () => {
    const uxModel = transformPitchToUX('Application de test');
    const components = generateComponents(uxModel);
    const result = await generateStorybook(uxModel, components);
    
    // Utiliser le chemin relatif au projet
    const storybookPath = path.join(__dirname, '../../storybook', result.projectId);
    expect(await fs.pathExists(path.join(storybookPath, 'package.json'))).toBe(true);
    expect(await fs.pathExists(path.join(storybookPath, 'index.html'))).toBe(true);
  });
});