/// <reference types="vitest/globals" />
import { TranslationLoader } from '../src/loader';
import { TranslationTestUtils } from '../src/test-utils';
import type { NestedTranslations } from '../src/types';

const mockTranslations: NestedTranslations = {
  common: {
    button: {
      submit: {
        en: 'Submit',
        fr: 'Envoyer'
      },
      cancel: {
        en: 'Cancel',
        fr: 'Annuler'
      }
    },
    items: {
      zero: {
        en: 'No items',
        fr: 'Aucun élément'
      },
      one: {
        en: 'One item',
        fr: 'Un élément'
      },
      other: {
        en: '{count} items',
        fr: '{count} éléments'
      }
    }
  }
};

describe('TranslationTestUtils', () => {
  let testUtils: TranslationTestUtils;

  beforeEach(() => {
    testUtils = new TranslationTestUtils();
    testUtils.mockTranslations('common', mockTranslations.common as Partial<NestedTranslations>);
  });

  describe('assertTranslationExists', () => {
    it('should pass for existing translations', () => {
      expect(() => testUtils.assertTranslationExists('common.button.submit', 'en')).not.toThrow();
      expect(() => testUtils.assertTranslationExists('common.button.submit', 'fr')).not.toThrow();
    });

    it('should fail for non-existent translations', () => {
      expect(() => testUtils.assertTranslationExists('common.button.missing', 'en')).toThrow();
    });
  });

  describe('assertTranslationEquals', () => {
    it('should pass for matching translations', () => {
      expect(() => testUtils.assertTranslationEquals('common.button.submit', 'en', 'Submit')).not.toThrow();
      expect(() => testUtils.assertTranslationEquals('common.button.submit', 'fr', 'Envoyer')).not.toThrow();
    });

    it('should fail for non-matching translations', () => {
      expect(() => testUtils.assertTranslationEquals('common.button.submit', 'en', 'Wrong')).toThrow();
    });
  });

  describe('assertPluralForm', () => {
    it('should validate plural forms', () => {
      expect(() => testUtils.assertPluralForm('common.items', 'en', 0, 'No items')).not.toThrow();
      expect(() => testUtils.assertPluralForm('common.items', 'en', 1, 'One item')).not.toThrow();
      expect(() => testUtils.assertPluralForm('common.items', 'en', 2, '2 items')).not.toThrow();
    });

    it('should interpolate count parameter', () => {
      expect(() => testUtils.assertPluralForm('common.items', 'fr', 5, '5 éléments')).not.toThrow();
    });
  });
});

describe('TranslationLoader', () => {
  let testUtils: TranslationTestUtils;

  beforeEach(() => {
    testUtils = new TranslationTestUtils();
    testUtils.mockTranslations('common', mockTranslations.common as Partial<NestedTranslations>);
  });

  describe('getCompletenessReport', () => {
    it('should calculate translation completeness', async () => {
      const report = await testUtils.getCompletenessReport('common');
      expect(report.totalKeys).toBe(3); // submit, cancel, items
      expect(report.completedKeys).toBe(3);
      expect(report.completionPercentage).toBe(100);
      expect(report.missingKeys).toHaveLength(0);
      expect(report.missingPlurals).toHaveLength(0);
    });
  });
});
