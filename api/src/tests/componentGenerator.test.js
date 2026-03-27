import { generateComponents } from '../engine/componentGenerator.js';
import { transformPitchToUX } from '../engine/pitchTransformer.js';

describe('Component Generator', () => {
  test('should generate components from UX model', () => {
    const uxModel = transformPitchToUX('Application avec calendrier et notifications');
    const components = generateComponents(uxModel);
    
    expect(components.length).toBeGreaterThan(0);
    expect(components.every(c => c.code)).toBe(true);
    expect(components.every(c => c.css)).toBe(true);
    expect(components.every(c => c.stories)).toBe(true);
  });

  test('should reuse existing components from Design Memory', () => {
    const uxModel = transformPitchToUX('Application simple avec bouton');
    const components = generateComponents(uxModel);
    
    const buttonComponent = components.find(c => c.name === 'Button');
    expect(buttonComponent).toBeTruthy();
    expect(buttonComponent.generated).toBe(true);
  });

  test('should generate valid React code', () => {
    const uxModel = transformPitchToUX('Application avec input');
    const components = generateComponents(uxModel);
    
    const inputComponent = components.find(c => c.name === 'Input');
    expect(inputComponent.code).toContain('import React');
    expect(inputComponent.code).toContain('export const Input');
  });
});