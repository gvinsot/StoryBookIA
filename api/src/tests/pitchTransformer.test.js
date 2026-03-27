import { transformPitchToUX } from '../engine/pitchTransformer.js';

describe('Pitch Transformer', () => {
  test('should analyze pitch with calendar feature', () => {
    const pitch = 'Application de gestion de réservations de salles avec calendrier';
    const result = transformPitchToUX(pitch);
    
    expect(result.analysis.features).toContain('calendar');
    expect(result.analysis.entities).toContain('room');
    expect(result.pages.length).toBeGreaterThan(0);
  });

  test('should detect admin role', () => {
    const pitch = 'Dashboard admin avec gestion des utilisateurs';
    const result = transformPitchToUX(pitch);
    
    expect(result.analysis.roles).toContain('admin');
    expect(result.pages.some(p => p.id === 'admin')).toBe(true);
  });

  test('should generate component requirements', () => {
    const pitch = 'Application avec notifications et filtres';
    const result = transformPitchToUX(pitch);
    
    expect(result.componentRequirements.length).toBeGreaterThan(0);
    expect(result.componentRequirements.some(c => c.name === 'Notification')).toBe(true);
  });

  test('should extract app name from pitch', () => {
    const pitch = 'Mon Application de Réservation de Salles';
    const result = transformPitchToUX(pitch);
    
    expect(result.name).toBeTruthy();
    expect(typeof result.name).toBe('string');
  });
});