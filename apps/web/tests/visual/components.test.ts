import { test, expect } from '@playwright/test';

// Test each component in both light and dark modes
const themes = ['light', 'dark'];

test.describe('Design System Components', () => {
  // Setup for each test
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  // Test buttons in different states and themes
  test.describe('Buttons', () => {
    for (const theme of themes) {
      test(`primary button appearance - ${theme} mode`, async ({ page }) => {
        // Set theme
        await page.evaluate((t) => document.documentElement.setAttribute('data-theme', t), theme);
        
        // Capture button in different states
        await expect(page.locator('.button-primary')).toHaveScreenshot(`button-primary-default-${theme}.png`);
        
        // Hover state
        await page.hover('.button-primary');
        await expect(page.locator('.button-primary')).toHaveScreenshot(`button-primary-hover-${theme}.png`);
        
        // Focus state
        await page.keyboard.press('Tab');
        await expect(page.locator('.button-primary')).toHaveScreenshot(`button-primary-focus-${theme}.png`);
      });

      test(`secondary button appearance - ${theme} mode`, async ({ page }) => {
        await page.evaluate((t) => document.documentElement.setAttribute('data-theme', t), theme);
        await expect(page.locator('.button-secondary')).toHaveScreenshot(`button-secondary-default-${theme}.png`);
        await page.hover('.button-secondary');
        await expect(page.locator('.button-secondary')).toHaveScreenshot(`button-secondary-hover-${theme}.png`);
      });
    }
  });

  // Test cards in different states and themes
  test.describe('Cards', () => {
    for (const theme of themes) {
      test(`standard card appearance - ${theme} mode`, async ({ page }) => {
        await page.evaluate((t) => document.documentElement.setAttribute('data-theme', t), theme);
        await expect(page.locator('.card')).toHaveScreenshot(`card-default-${theme}.png`);
        await page.hover('.card');
        await expect(page.locator('.card')).toHaveScreenshot(`card-hover-${theme}.png`);
      });

      test(`featured card appearance - ${theme} mode`, async ({ page }) => {
        await page.evaluate((t) => document.documentElement.setAttribute('data-theme', t), theme);
        await expect(page.locator('.card-featured')).toHaveScreenshot(`card-featured-default-${theme}.png`);
        await page.hover('.card-featured');
        await expect(page.locator('.card-featured')).toHaveScreenshot(`card-featured-hover-${theme}.png`);
      });
    }
  });

  // Test form elements
  test.describe('Form Elements', () => {
    for (const theme of themes) {
      test(`input fields appearance - ${theme} mode`, async ({ page }) => {
        await page.evaluate((t) => document.documentElement.setAttribute('data-theme', t), theme);
        
        // Text input
        await expect(page.locator('input[type="text"]')).toHaveScreenshot(`text-input-default-${theme}.png`);
        await page.focus('input[type="text"]');
        await expect(page.locator('input[type="text"]')).toHaveScreenshot(`text-input-focus-${theme}.png`);
        
        // Select input
        await expect(page.locator('select')).toHaveScreenshot(`select-default-${theme}.png`);
        await page.focus('select');
        await expect(page.locator('select')).toHaveScreenshot(`select-focus-${theme}.png`);
      });

      test(`checkbox and radio appearance - ${theme} mode`, async ({ page }) => {
        await page.evaluate((t) => document.documentElement.setAttribute('data-theme', t), theme);
        
        // Checkbox
        await expect(page.locator('input[type="checkbox"]')).toHaveScreenshot(`checkbox-unchecked-${theme}.png`);
        await page.click('input[type="checkbox"]');
        await expect(page.locator('input[type="checkbox"]')).toHaveScreenshot(`checkbox-checked-${theme}.png`);
        
        // Radio
        await expect(page.locator('input[type="radio"]')).toHaveScreenshot(`radio-unchecked-${theme}.png`);
        await page.click('input[type="radio"]');
        await expect(page.locator('input[type="radio"]')).toHaveScreenshot(`radio-checked-${theme}.png`);
      });
    }
  });

  // Test typography
  test.describe('Typography', () => {
    for (const theme of themes) {
      test(`typography elements - ${theme} mode`, async ({ page }) => {
        await page.evaluate((t) => document.documentElement.setAttribute('data-theme', t), theme);
        
        // Headings
        for (let i = 1; i <= 6; i++) {
          await expect(page.locator(`h${i}`)).toHaveScreenshot(`heading-${i}-${theme}.png`);
        }
        
        // Body text
        await expect(page.locator('p')).toHaveScreenshot(`body-text-${theme}.png`);
        
        // Links
        await expect(page.locator('a')).toHaveScreenshot(`link-default-${theme}.png`);
        await page.hover('a');
        await expect(page.locator('a')).toHaveScreenshot(`link-hover-${theme}.png`);
      });
    }
  });
});
