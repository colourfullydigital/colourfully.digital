import { readFile } from 'fs/promises';
import { parse as parseYAML } from 'yaml';
import { 
  type ValidationError,
  type NestedTranslations,
  type TranslationWithPlurals,
  nestedTranslationsSchema,
  isTranslationWithPlurals
} from './types';

export interface ValidationResult {
  isValid: boolean;
  errors: ValidationError[];
}

export class TranslationValidator {
  private debug: boolean;

  constructor(debug = false) {
    this.debug = debug;
  }

  public async validateFile(filePath: string): Promise<ValidationResult> {
    try {
      const content = await readFile(filePath, 'utf-8');
      const format = filePath.endsWith('.yaml') || filePath.endsWith('.yml') ? 'yaml' : 'json';
      const parsed = format === 'yaml' ? parseYAML(content) : JSON.parse(content);
      return this.validateContent(parsed);
    } catch (err) {
      const error = err as Error;
      const validationError: ValidationError = {
        key: filePath,
        type: 'invalid_format',
        message: `Failed to parse file: ${error.message}`
      };
      
      if (this.debug) {
        console.error(`Validation error in ${filePath}:`, error);
      }

      return {
        isValid: false,
        errors: [validationError]
      };
    }
  }

  public validateContent(content: unknown): ValidationResult {
    try {
      // First validate the basic structure
      nestedTranslationsSchema.parse(content);
      
      // Now do deeper validation
      const translations = content as NestedTranslations;
      const errors: ValidationError[] = [];

      // Check for missing translations and plurals
      this.validateNestedStructure(translations, '', errors);

      return {
        isValid: errors.length === 0,
        errors
      };
    } catch (err) {
      const error = err as Error;
      return {
        isValid: false,
        errors: [{
          key: 'root',
          type: 'invalid_format',
          message: error.message
        }]
      };
    }
  }

  private validateNestedStructure(
    obj: NestedTranslations,
    parentKey: string,
    errors: ValidationError[]
  ): void {
    for (const [key, value] of Object.entries(obj)) {
      const currentKey = parentKey ? `${parentKey}.${key}` : key;

      if (isTranslationWithPlurals(value)) {
        this.validatePluralTranslation(value, currentKey, errors);
      } else if (typeof value === 'object' && value !== null) {
        this.validateNestedStructure(value as NestedTranslations, currentKey, errors);
      }
    }
  }

  private validatePluralTranslation(
    translation: TranslationWithPlurals,
    key: string,
    errors: ValidationError[]
  ): void {
    if (!translation.one || !translation.other) {
      errors.push({
        key,
        type: 'missing_plural',
        message: `Missing required plural forms 'one' or 'other' for key: ${key}`
      });
    }
  }
}