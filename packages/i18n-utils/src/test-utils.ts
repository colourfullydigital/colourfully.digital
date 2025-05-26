import type { 
  NestedTranslations, 
  SupportedLocale,
  ValidationResult, 
  CompletenessReport,
  TranslationWithPlurals,
  TranslationValue,
  LocaleString
} from './types';
import { SUPPORTED_LOCALES, isTranslationValue, isTranslationWithPlurals } from './types';
import { TranslationLoader } from './loader';
import { TranslationValidator } from './validator';

export interface TestTranslationUtils {
  mockTranslations: (namespace: string, overrides: Partial<NestedTranslations>) => void;
  assertTranslationExists: (key: string, locale: SupportedLocale) => void;
  assertTranslationEquals: (key: string, locale: SupportedLocale, expected: string) => void;
  assertPluralForm: (key: string, locale: SupportedLocale, count: number, expected: string) => void;
  validateTranslationFormat: (translations: unknown) => Promise<ValidationResult>;
  getCompletenessReport: (namespace: string) => Promise<CompletenessReport>;
}

export class TranslationTestUtils implements TestTranslationUtils {
  private loader: TranslationLoader;
  private validator: TranslationValidator;
  private mocks: Map<string, NestedTranslations> = new Map();

  constructor() {
    this.loader = new TranslationLoader('en', true);
    this.validator = new TranslationValidator(true);
  }

  public mockTranslations(namespace: string, overrides: Partial<NestedTranslations>): void {
    this.mocks.set(namespace, overrides as NestedTranslations);
  }

  private getValueFromMocks(key: string): TranslationValue | TranslationWithPlurals | undefined {
    const [namespace, ...rest] = key.split('.');
    const translations = this.mocks.get(namespace);
    if (!translations) {
      throw new Error(`Namespace "${namespace}" not found in mocks`);
    }

    let current: NestedTranslations | TranslationValue | TranslationWithPlurals = translations;
    for (const part of rest) {
      if (typeof current !== 'object' || current === null || !(part in current)) {
        return undefined;
      }
      current = (current as NestedTranslations)[part];
    }

    return isTranslationValue(current) || isTranslationWithPlurals(current) ? current : undefined;
  }

  public assertTranslationExists(key: string, locale: SupportedLocale): void {
    // Validate locale first
    if (!SUPPORTED_LOCALES.includes(locale)) {
      throw new Error(`Unsupported locale "${locale}". Supported locales are: ${SUPPORTED_LOCALES.join(', ')}`);
    }

    // Validate that we have mocked translations
    if (this.mocks.size === 0) {
      throw new Error('No translations have been mocked. Use mockTranslations() first.');
    }

    const value = this.getValueFromMocks(key);
    if (!value) {
      throw new Error(`Translation key "${key}" not found`);
    }

    if (isTranslationValue(value) && !value[locale]) {
      throw new Error(`Translation missing for locale "${locale}" at key "${key}"`);
    }
  }

  public assertTranslationEquals(key: string, locale: SupportedLocale, expected: string): void {
    // First ensure translation exists
    this.assertTranslationExists(key, locale);

    const value = this.getValueFromMocks(key);
    if (isTranslationValue(value) && value[locale] !== expected) {
      throw new Error(`Translation value does not match for key "${key}" and locale "${locale}". Expected "${expected}" but got "${value[locale]}"`);
    }
  }

  public assertPluralForm(key: string, locale: SupportedLocale, count: number, expected: string): void {
    const value = this.getValueFromMocks(key);
    if (!value || !isTranslationWithPlurals(value)) {
      throw new Error(`Translation key "${key}" not found or is not a plural form`);
    }

    const form = count === 0 ? 'zero' : count === 1 ? 'one' : 'other';
    const pluralForm = value[form];
    if (!pluralForm || !pluralForm[locale]) {
      throw new Error(`Plural form "${form}" missing for locale "${locale}" at key "${key}"`);
    }

    const actual = pluralForm[locale].replace('{count}', count.toString());
    if (actual !== expected) {
      throw new Error(`Translation value does not match for key "${key}" and locale "${locale}". Expected "${expected}" but got "${actual}"`);
    }
  }

  public async validateTranslationFormat(translations: unknown): Promise<ValidationResult> {
    return this.validator.validateContent(translations);
  }

  public async getCompletenessReport(namespace: string): Promise<CompletenessReport> {
    const translations = this.mocks.get(namespace);
    if (!translations) {
      throw new Error(`Namespace "${namespace}" not found in mocks`);
    }

    const totalKeys = this.countKeys(translations);
    const completedKeys = this.countCompletedKeys(translations);
    const missingKeys: string[] = [];
    const missingPlurals: string[] = [];

    return {
      totalKeys,
      completedKeys,
      missingKeys,
      missingPlurals,
      completionPercentage: totalKeys > 0 ? Math.round((completedKeys / totalKeys) * 100) : 0
    };
  }

  private countKeys(translations: NestedTranslations): number {
    let count = 0;
    for (const [key, value] of Object.entries(translations)) {
      if (isTranslationValue(value) || isTranslationWithPlurals(value)) {
        count++;
      } else {
        count += this.countKeys(value);
      }
    }
    return count;
  }

  private countCompletedKeys(translations: NestedTranslations): number {
    let count = 0;
    for (const [key, value] of Object.entries(translations)) {
      if (isTranslationValue(value)) {
        // Count as completed if all locales have values
        count += SUPPORTED_LOCALES.every(locale => !!value[locale]) ? 1 : 0;
      } else if (isTranslationWithPlurals(value)) {
        // For plurals, check required forms (one and other) have values
        const hasAllForms = ['one', 'other'].every(form => {
          const pluralForm = value[form as keyof TranslationWithPlurals];
          return pluralForm && SUPPORTED_LOCALES.every(locale => !!pluralForm[locale]);
        });
        count += hasAllForms ? 1 : 0;
      } else {
        count += this.countCompletedKeys(value);
      }
    }
    return count;
  }
}

// Create a singleton instance for easy import
export const translationTestUtils = new TranslationTestUtils();
