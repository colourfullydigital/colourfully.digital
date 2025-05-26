import { describe, it, expect } from 'vitest';
import { generateStructuredData, getLanguageMetaTags, generateAlternateUrls } from '../../src/utils/seo';

describe('SEO Utilities', () => {
  describe('generateAlternateUrls', () => {
    it('should generate correct alternate URLs', () => {
      const siteUrl = 'https://colourfully.digital';
      const currentPath = '/en/services/web-development';
      
      const urls = generateAlternateUrls(siteUrl, currentPath);
      
      expect(urls.en).toBe('https://colourfully.digital/en/services/web-development');
      expect(urls.fr).toBe('https://colourfully.digital/fr/services/web-development');
    });

    it('should handle root path correctly', () => {
      const siteUrl = 'https://colourfully.digital';
      const currentPath = '/en/';
      
      const urls = generateAlternateUrls(siteUrl, currentPath);
      
      expect(urls.en).toBe('https://colourfully.digital/en/');
      expect(urls.fr).toBe('https://colourfully.digital/fr/');
    });
  });

  describe('getLanguageMetaTags', () => {
    it('should return correct meta tags for English', () => {
      const meta = getLanguageMetaTags('en');
      
      expect(meta.htmlLang).toBe('en');
      expect(meta.ogLocale).toBe('en_US');
      expect(meta.alternateLocale).toBe('fr_FR');
    });

    it('should return correct meta tags for French', () => {
      const meta = getLanguageMetaTags('fr');
      
      expect(meta.htmlLang).toBe('fr');
      expect(meta.ogLocale).toBe('fr_FR');
      expect(meta.alternateLocale).toBe('en_US');
    });
  });

  describe('generateStructuredData', () => {
    it('should generate correct structured data', () => {
      const data = generateStructuredData({
        title: 'Test Page',
        description: 'Test Description',
        currentLocale: 'en',
        currentPath: '/en/test',
        siteUrl: 'https://colourfully.digital'
      });
      
      expect(data['@context']).toBe('https://schema.org');
      expect(data['@type']).toBe('WebPage');
      expect(data.url).toBe('https://colourfully.digital/en/test');
      expect(data.name).toBe('Test Page');
      expect(data.description).toBe('Test Description');
      expect(data.inLanguage).toBe('en-US');
      expect(data.alternateLanguage).toHaveLength(1);
      expect(data.alternateLanguage[0].name).toBe('Français');
      expect(data.alternateLanguage[0].alternateName).toBe('fr');
      expect(data.alternateLanguage[0].url).toBe('https://colourfully.digital/fr/test');
    });

    it('should handle French pages correctly', () => {
      const data = generateStructuredData({
        title: 'Page de test',
        description: 'Description de test',
        currentLocale: 'fr',
        currentPath: '/fr/test',
        siteUrl: 'https://colourfully.digital'
      });
      
      expect(data.inLanguage).toBe('fr-FR');
      expect(data.alternateLanguage[0].name).toBe('English');
      expect(data.alternateLanguage[0].alternateName).toBe('en');
      expect(data.alternateLanguage[0].url).toBe('https://colourfully.digital/en/test');
    });
  });
});
