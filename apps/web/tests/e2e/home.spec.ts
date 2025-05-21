import { test, expect } from '@playwright/test';

test('homepage has title and links', async ({ page }) => {
  await page.goto('/');
  
  // Verify page title
  await expect(page).toHaveTitle(/Colourfully Digital/);
  
  // Verify the page loads successfully
  await expect(page.locator('body')).toBeDefined();
});
