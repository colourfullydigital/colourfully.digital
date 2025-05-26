import { test, expect } from '@playwright/test';

test.describe('SEO Implementation', () => {
  test('English page should have correct meta tags and alternate links', async ({ page }) => {
    await page.goto('/en/');
    
    // Verify language meta tags
    await expect(page.locator('html')).toHaveAttribute('lang', 'en');
    await expect(page.locator('meta[name="language"]')).toHaveAttribute('content', 'en');
    
    // Verify alternate language links
    await expect(page.locator('link[hreflang="en"]')).toHaveAttribute('href', 'https://colourfully.digital/en/');
    await expect(page.locator('link[hreflang="fr"]')).toHaveAttribute('href', 'https://colourfully.digital/fr/');
    await expect(page.locator('link[hreflang="x-default"]')).toHaveAttribute('href', 'https://colourfully.digital/en/');
    
    // Verify Open Graph tags
    await expect(page.locator('meta[property="og:locale"]')).toHaveAttribute('content', 'en_US');
    await expect(page.locator('meta[property="og:locale:alternate"]')).toHaveAttribute('content', 'fr_FR');
    
    // Verify structured data
    const structuredData = await page.locator('script[type="application/ld+json"]').textContent();
    const jsonData = JSON.parse(structuredData || '{}');
    expect(jsonData.inLanguage).toBe('en-US');
    expect(jsonData.alternateLanguage[0].name).toBe('Français');
  });

  test('French page should have correct meta tags and alternate links', async ({ page }) => {
    await page.goto('/fr/');
    
    // Verify language meta tags
    await expect(page.locator('html')).toHaveAttribute('lang', 'fr');
    await expect(page.locator('meta[name="language"]')).toHaveAttribute('content', 'fr');
    
    // Verify alternate language links
    await expect(page.locator('link[hreflang="en"]')).toHaveAttribute('href', 'https://colourfully.digital/en/');
    await expect(page.locator('link[hreflang="fr"]')).toHaveAttribute('href', 'https://colourfully.digital/fr/');
    await expect(page.locator('link[hreflang="x-default"]')).toHaveAttribute('href', 'https://colourfully.digital/en/');
    
    // Verify Open Graph tags
    await expect(page.locator('meta[property="og:locale"]')).toHaveAttribute('content', 'fr_FR');
    await expect(page.locator('meta[property="og:locale:alternate"]')).toHaveAttribute('content', 'en_US');
    
    // Verify structured data
    const structuredData = await page.locator('script[type="application/ld+json"]').textContent();
    const jsonData = JSON.parse(structuredData || '{}');
    expect(jsonData.inLanguage).toBe('fr-FR');
    expect(jsonData.alternateLanguage[0].name).toBe('English');
  });

  test('Language switcher should work correctly', async ({ page }) => {
    // Start at English page
    await page.goto('/en/');
    
    // Click language switcher and verify redirection
    await page.click('text=Français');
    await expect(page).toHaveURL('/fr/');
    
    // Verify language switch in meta tags
    await expect(page.locator('html')).toHaveAttribute('lang', 'fr');
    await expect(page.locator('meta[property="og:locale"]')).toHaveAttribute('content', 'fr_FR');
  });
});
