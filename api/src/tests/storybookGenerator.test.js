import { generateStorybook } from '../engine/storybookGenerator.js';
import { transformPitchToUX } from '../engine/pitchTransformer.js';
import { generateComponents } from '../engine/componentGenerator.js';
import fs from 'fs-extra';
import path from 'path';

describe('Storybook Generator', () => {
  test('should generate storybook structure', async () => {
    const uxModel = transformPitchToUX('Application de test');
    const components = generateComponents(uxModel);
    const result = await generateStorybook(uxModel, components);
    
    expect(result.projectName).toBeTruthy();
    expect(result.components.length).toBeGreaterThan(0);
    expect(result.componentCount).toBe(components.length);
  });

  test('should create storybook files', async () => {
    const uxModel = transformPitchToUX('Application de test');
    const components = generateComponents(uxModel);
    const result = await generateStorybook(uxModel, components);
    
    const storybookPath = path.join(process.cwd(), '../../storybook', result.projectName);
    expect(await fs.pathExists(path.join(storybookPath, 'package.json'))).toBe(true);
    expect(await fs.pathExists(path.join(storybookPath, 'index.html'))).toBe(true);
  });
});