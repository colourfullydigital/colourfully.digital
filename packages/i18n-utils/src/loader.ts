import { parse as parseYAML } from 'yaml';
import { readFile } from 'fs/promises';
import { join } from 'path';
import type {
  NestedTranslations,
  SupportedFormat,
  SupportedLocale,
  CompletenessReport
} from './types';
import { TranslationValidator } from './validator';
import type { ValidationResult } from './validator';

export class TranslationLoader {
  private cache: Map<string, NestedTranslations> = new Map();
  private loadedNamespaces: Set<string> = new Set();
  private validator: TranslationValidator;

  constructor(
    private readonly defaultLocale: SupportedLocale = 'en',
    private readonly debug: boolean = false,
    private readonly baseDir: string = '.'
  ) {
    this.validator = new TranslationValidator(debug);
  }

  public getSupportedFormats(): SupportedFormat[] {
    return ['json', 'yaml'];
  }

  public async loadNamespace(namespace: string, format: SupportedFormat = 'json'): Promise<NestedTranslations> {
    const cacheKey = `${namespace}:${format}`;
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey)!;
    }

    try {
      let content: NestedTranslations;
      const filePath = join(this.baseDir, 'i18n', `${namespace}.${format}`);

      if (format === 'yaml') {
        const fileContent = await readFile(filePath, 'utf-8');
        content = parseYAML(fileContent);
      } else {
        // For JSON files, first try dynamic import
        try {
          const module = await import(filePath);
          content = module.default;
        } catch (e) {
          // Fallback to fs if dynamic import fails (e.g., in Node.js)
          const fileContent = await readFile(filePath, 'utf-8');
          content = JSON.parse(fileContent);
        }
      }

      // Validate the loaded content
      const validationResult = await this.validator.validateFile(filePath);
      if (!validationResult.isValid) {
        throw new Error(`Invalid translation file ${filePath}: ${validationResult.errors.map(e => e.message).join(', ')}`);
      }

      this.cache.set(cacheKey, content);
      this.loadedNamespaces.add(namespace);
      return content;
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      throw new Error(`Failed to load namespace ${namespace}: ${message}`);
    }
  }

  public async validate(namespace: string, format: SupportedFormat = 'json'): Promise<ValidationResult> {
    try {
      const filePath = join(this.baseDir, 'i18n', `${namespace}.${format}`);
      return await this.validator.validateFile(filePath);
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      return {
        isValid: false,
        errors: [{
          key: namespace,
          type: 'invalid_format',
          message: `Failed to validate namespace ${namespace}: ${message}`
        }]
      };
    }
  }

  public async getCompletenessReport(namespace: string): Promise<CompletenessReport> {
    const translations = await this.loadNamespace(namespace);
    const report: CompletenessReport = {
      totalKeys: 0,
      completedKeys: 0,
      missingKeys: [],
      completionPercentage: 0,
      missingPlurals: []
    };

    const processNode = (node: NestedTranslations, path = ''): void => {
      for (const [key, value] of Object.entries(node)) {
        const currentPath = path ? `${path}.${key}` : key;

        if (typeof value === 'object' && value !== null) {
          if ('one' in value || 'other' in value) {
            report.totalKeys++;
            const hasAllRequired = value.one && value.other;
            if (hasAllRequired) {
              report.completedKeys++;
            } else {
              report.missingPlurals.push(currentPath);
            }
          } else {
            processNode(value as NestedTranslations, currentPath);
          }
        }
      }
    };

    processNode(translations);
    report.completionPercentage = report.totalKeys > 0 
      ? (report.completedKeys / report.totalKeys) * 100 
      : 100;

    return report;
  }
}
