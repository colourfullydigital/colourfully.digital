/**
 * Color contrast utilities for testing WCAG 2.1 AA compliance
 */

/**
 * Calculates relative luminance of a color
 * @see https://www.w3.org/WAI/GL/wiki/Relative_luminance
 */
function getLuminance(r: number, g: number, b: number): number {
  const [rs, gs, bs] = [r, g, b].map(c => {
    const sRGB = c / 255;
    return sRGB <= 0.03928
      ? sRGB / 12.92
      : Math.pow((sRGB + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

/**
 * Converts a hex color to RGB values
 */
function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) {
    throw new Error(`Invalid hex color: ${hex}`);
  }
  return {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16),
  };
}

/**
 * Calculates contrast ratio between two colors
 * @see https://www.w3.org/WAI/GL/wiki/Contrast_ratio
 */
export function getContrastRatio(color1: string, color2: string): number {
  const c1 = hexToRgb(color1);
  const c2 = hexToRgb(color2);
  
  const l1 = getLuminance(c1.r, c1.g, c1.b);
  const l2 = getLuminance(c2.r, c2.g, c2.b);
  
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  
  return (lighter + 0.05) / (darker + 0.05);
}

/**
 * Checks if a color combination meets WCAG 2.1 AA standards
 */
export function meetsWCAGAA(
  foreground: string,
  background: string,
  isLargeText: boolean = false
): boolean {
  const ratio = getContrastRatio(foreground, background);
  return isLargeText ? ratio >= 3 : ratio >= 4.5;
}

/**
 * Gets CSS custom property value
 */
export function getCssVariable(variableName: string): string {
  const styles = getComputedStyle(document.documentElement);
  return styles.getPropertyValue(variableName).trim();
}

/**
 * Tests all text color combinations in the theme
 */
export function testThemeContrast(): Array<{
  combination: string;
  ratio: number;
  passes: boolean;
}> {
  type ContrastResult = {
    combination: string;
    ratio: number;
    passes: boolean;
  };
  
  const results: ContrastResult[] = [];
  const colors = {
    background: getCssVariable('--color-background'),
    surface: getCssVariable('--color-surface'),
    textPrimary: getCssVariable('--color-text-primary'),
    textSecondary: getCssVariable('--color-text-secondary'),
    // Add other color combinations to test
  };

  // Test text colors against backgrounds
  Object.entries(colors).forEach(([bgName, bgColor]) => {
    if (bgName.startsWith('text')) return;
    
    Object.entries(colors).forEach(([fgName, fgColor]) => {
      if (!fgName.startsWith('text')) return;
      
      const ratio = getContrastRatio(fgColor, bgColor);
      const passes = meetsWCAGAA(fgColor, bgColor);
      
      results.push({
        combination: `${fgName} on ${bgName}`,
        ratio,
        passes
      });
    });
  });

  return results;
}
