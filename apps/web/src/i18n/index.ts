// Types for our translation structure
export interface TranslationValue {
  en: string;
  fr: string;
}

export interface NestedTranslations {
  [key: string]: TranslationValue | NestedTranslations;
}

// Helper function to get a nested translation value
export function getTranslationValue(obj: NestedTranslations, path: string, locale: string): string {
  const parts = path.split('.');
  let current: any = obj;

  for (const part of parts) {
    if (current[part] === undefined) {
      console.warn(`Translation key not found: ${path}`);
      return path; // Fallback to the key itself
    }
    current = current[part];
  }

  if (typeof current === 'object' && current[locale]) {
    return current[locale];
  }

  console.warn(`Translation not found for locale ${locale} at path ${path}`);
  return path; // Fallback to the key itself
}

// Translation function type
export type TranslateFunction = (key: string) => string;

// Helper to create a translation function for a specific locale and translation file
export function createTranslator(translations: NestedTranslations, locale: string): TranslateFunction {
  return (key: string) => getTranslationValue(translations, key, locale);
}

// Supported locales
export const SUPPORTED_LOCALES = ['en', 'fr'] as const;
export type SupportedLocale = typeof SUPPORTED_LOCALES[number];

// Check if a locale is supported
export function isSupportedLocale(locale: string): locale is SupportedLocale {
  return SUPPORTED_LOCALES.includes(locale as SupportedLocale);
}

// Get browser's preferred locale that we support
export function getPreferredLocale(): SupportedLocale {
  if (typeof navigator === 'undefined') return 'en';

  const browserLocales = navigator.languages || [navigator.language];
  
  for (const locale of browserLocales) {
    const shortLocale = locale.split('-')[0];
    if (isSupportedLocale(shortLocale)) {
      return shortLocale;
    }
  }
  
  return 'en'; // Default to English if no supported locale is found
}
