import { z } from 'zod';

export const SUPPORTED_LOCALES = ['en', 'fr'] as const;
export type SupportedLocale = typeof SUPPORTED_LOCALES[number];
export type SupportedFormat = 'json' | 'yaml';

export type LocaleString<T extends string = string> = {
  [K in SupportedLocale]: T;
};

export interface TranslationValue extends LocaleString {}

export interface TranslationWithPlurals {
  zero?: LocaleString;
  one: LocaleString;
  other: LocaleString;
}

export type TranslationEntry = TranslationValue | TranslationWithPlurals;

export interface NestedTranslations {
  [key: string]: TranslationEntry | NestedTranslations;
}

export type TranslationMap = {
  [key: string]: string | TranslationMap;
};

export interface ValidationError {
  key: string;
  type: 'missing_translation' | 'invalid_format' | 'unused_key' | 'missing_plural';
  locale?: SupportedLocale;
  message: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: ValidationError[];
}

export interface CompletenessReport {
  totalKeys: number;
  completedKeys: number;
  missingKeys: string[];
  completionPercentage: number;
  missingPlurals: string[];
}

// Type guard to check if a value is a TranslationWithPlurals
export function isTranslationWithPlurals(value: unknown): value is TranslationWithPlurals {
  if (!value || typeof value !== 'object') return false;
  const obj = value as Record<string, unknown>;
  return (
    'one' in obj &&
    'other' in obj &&
    (!('zero' in obj) || typeof obj.zero === 'object')
  );
}

// Type guard to check if a value is a TranslationValue
export function isTranslationValue(value: unknown): value is TranslationValue {
  if (!value || typeof value !== 'object') return false;
  const obj = value as Record<string, unknown>;
  return SUPPORTED_LOCALES.every(locale => 
    locale in obj && typeof obj[locale] === 'string'
  );
}

// Type guard to check if a value is a NestedTranslations
export function isNestedTranslations(value: unknown): value is NestedTranslations {
  if (!value || typeof value !== 'object') return false;
  const obj = value as Record<string, unknown>;
  return Object.values(obj).every(val => 
    isTranslationValue(val) || isTranslationWithPlurals(val) || isNestedTranslations(val)
  );
}

// Type guard to check if a value is a specific type
export function isTranslationEntry(value: unknown): value is TranslationEntry {
  return isTranslationValue(value) || isTranslationWithPlurals(value);
}

// Zod schemas for validation
export const translationValueSchema = z.object({
  en: z.string(),
  fr: z.string()
});

export const translationWithPluralsSchema = z.object({
  zero: translationValueSchema.optional(),
  one: translationValueSchema,
  other: translationValueSchema
});

export const translationEntrySchema = z.union([
  translationValueSchema,
  translationWithPluralsSchema
]);

export const nestedTranslationsSchema: z.ZodType<NestedTranslations> = z.lazy(() =>
  z.record(z.union([translationEntrySchema, nestedTranslationsSchema]))
);

// Helper function to validate nested translations
export const validateNestedTranslations = (data: unknown): data is NestedTranslations => {
  return isNestedTranslations(data);
};
