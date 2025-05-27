import { describe, it, expect } from 'vitest';
import { getContrastRatio, meetsWCAGAA } from './contrast';

describe('Contrast Utilities', () => {
  it('calculates contrast ratio correctly', () => {
    // White on Black
    expect(getContrastRatio('#FFFFFF', '#000000')).toBeCloseTo(21, 0);
    
    // Black on White
    expect(getContrastRatio('#000000', '#FFFFFF')).toBeCloseTo(21, 0);
    
    // Our primary text on background
    expect(getContrastRatio('#121212', '#FFFFFF')).toBeGreaterThan(4.5);
  });

  it('validates WCAG AA compliance', () => {
    // Test normal text (4.5:1 required)
    expect(meetsWCAGAA('#000000', '#FFFFFF')).toBe(true);
    expect(meetsWCAGAA('#777777', '#FFFFFF')).toBe(false);

    // Test large text (3:1 required)
    expect(meetsWCAGAA('#666666', '#FFFFFF', true)).toBe(true);
    expect(meetsWCAGAA('#999999', '#FFFFFF', true)).toBe(false);
  });

  it('validates theme color combinations', () => {
    // Primary Colors
    expect(meetsWCAGAA('#121212', '#FFFFFF')).toBe(true); // Text on background
    expect(meetsWCAGAA('#FFFFFF', '#121212')).toBe(true); // Text on dark
    
    // Secondary Colors
    expect(meetsWCAGAA('#555555', '#FFFFFF')).toBe(true); // Secondary text
    expect(meetsWCAGAA('#888888', '#FFFFFF', true)).toBe(true); // Hint text (large)
  });
});
