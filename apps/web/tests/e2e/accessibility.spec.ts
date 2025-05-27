import { test, expect } from '@playwright/test';

test.describe('Keyboard Navigation', () => {
  test('skip link appears on focus and works correctly', async ({ page }) => {
    await page.goto('/');
    
    // Tab to skip link
    await page.keyboard.press('Tab');
    
    // Verify skip link is visible
    const skipLink = page.locator('.skip-to-content');
    await expect(skipLink).toBeVisible();
    
    // Click the skip link
    await skipLink.click();
    
    // Verify focus is on main content
    await expect(page.locator('#main-content')).toBeFocused();
  });

  test('all interactive elements are keyboard accessible', async ({ page }) => {
    await page.goto('/');
    
    // Get all interactive elements
    const interactiveElements = page.locator('a, button, input, select, textarea, [tabindex]:not([tabindex="-1"])');
    
    // Tab through each element and verify it receives focus
    const count = await interactiveElements.count();
    for (let i = 0; i < count; i++) {
      await page.keyboard.press('Tab');
      const element = interactiveElements.nth(i);
      await expect(element).toBeFocused();
    }
  });

  test('navigation menu is keyboard accessible', async ({ page }) => {
    await page.goto('/');
    
    // Tab to the navigation menu
    await page.keyboard.press('Tab');
    
    // Find all navigation links
    const navLinks = page.locator('nav a');
    
    // Verify each nav link can be focused
    const count = await navLinks.count();
    for (let i = 0; i < count; i++) {
      await page.keyboard.press('Tab');
      const link = navLinks.nth(i);
      await expect(link).toBeFocused();
    }
  });

  test('dropdowns trap focus correctly', async ({ page }) => {
    await page.goto('/');
    
    // Find and open dropdown
    const dropdown = page.locator('button[aria-haspopup="true"]').first();
    await dropdown.focus();
    await page.keyboard.press('Enter');
    
    // Verify focus is trapped in dropdown
    const dropdownItems = page.locator('[role="menu"] [role="menuitem"]');
    const itemCount = await dropdownItems.count();
    
    // Tab through dropdown items
    for (let i = 0; i < itemCount; i++) {
      await page.keyboard.press('Tab');
      const item = dropdownItems.nth(i);
      await expect(item).toBeFocused();
    }
    
    // Verify focus returns to dropdown button on close
    await page.keyboard.press('Escape');
    await expect(dropdown).toBeFocused();
  });
});
