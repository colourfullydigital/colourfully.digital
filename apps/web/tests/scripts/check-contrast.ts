#!/usr/bin/env node
/**
 * This script runs automated contrast checks for the theme colors
 * and reports any WCAG AA violations.
 */
import fs from 'fs';
import path from 'path';
import { getContrastRatio, meetsWCAGAA } from '../utils/contrast';

interface ColorSet {
  [key: string]: string;
}

// Color combinations to test
const colorSets: ColorSet = {
  // Primary colors
  '--color-text-primary': '#121212',
  '--color-text-secondary': '#555555',
  '--color-text-hint': '#888888',
  '--color-text-on-primary': '#FFFFFF',
  '--color-text-on-dark': '#FFFFFF',
  '--color-background': '#FFFFFF',
  '--color-surface': '#F5F5F5',
  '--color-surface-variant': '#EEEEEE',
  // High contrast colors
  '--color-high-contrast-text': '#000000',
  '--color-high-contrast-background': '#FFFFFF',
  '--color-high-contrast-link': '#0000EE',
  '--color-high-contrast-button-text': '#FFFFFF',
  '--color-high-contrast-button': '#000000'
};

interface ContrastResult {
  combination: string;
  ratio: number;
  passes: {
    normalText: boolean;
    largeText: boolean;
  };
  requiredRatio: {
    normalText: number;
    largeText: number;
  };
}

function testColorCombinations(): ContrastResult[] {
  const results: ContrastResult[] = [];
  const textColors = Object.entries(colorSets).filter(([key]) => 
    key.includes('text') || key.includes('link')
  );
  const bgColors = Object.entries(colorSets).filter(([key]) => 
    key.includes('background') || key.includes('surface')
  );

  for (const [textName, textColor] of textColors) {
    for (const [bgName, bgColor] of bgColors) {
      const ratio = getContrastRatio(textColor, bgColor);
      const result: ContrastResult = {
        combination: `${textName} on ${bgName}`,
        ratio,
        passes: {
          normalText: meetsWCAGAA(textColor, bgColor, false),
          largeText: meetsWCAGAA(textColor, bgColor, true)
        },
        requiredRatio: {
          normalText: 4.5,
          largeText: 3.0
        }
      };
      results.push(result);
    }
  }

  return results;
}

function generateReport(results: ContrastResult[]): void {
  let failures = 0;
  console.log('\nColor Contrast Audit Report');
  console.log('=========================\n');

  results.forEach(result => {
    console.log(`Testing: ${result.combination}`);
    console.log(`Contrast Ratio: ${result.ratio.toFixed(2)}:1`);
    
    if (!result.passes.normalText) {
      console.log(`❌ Failed normal text (${result.requiredRatio.normalText}:1 required)`);
      failures++;
    } else {
      console.log('✅ Passed normal text');
    }
    
    if (!result.passes.largeText) {
      console.log(`❌ Failed large text (${result.requiredRatio.largeText}:1 required)`);
      failures++;
    } else {
      console.log('✅ Passed large text');
    }
    
    console.log('-------------------\n');
  });

  console.log(`Summary: ${failures} failures found`);
  
  if (failures > 0) {
    process.exit(1);
  }
}

// Run the tests
const results = testColorCombinations();
generateReport(results);
