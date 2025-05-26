/// <reference types="react" />

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
  type ReactNode,
  type JSX
} from 'react';

import type { 
  NestedTranslations, 
  SupportedLocale,
  TranslationValue,
  TranslationWithPlurals,
  TranslationEntry
} from './types';
import { isTranslationValue, isNestedTranslations, isTranslationEntry, isTranslationWithPlurals } from './types';
import type { TranslationLoader } from './loader';

// Context type definition
interface TranslationContextType {
  currentLocale: SupportedLocale;
  setLocale: (locale: SupportedLocale) => void;
  t: (key: string, params?: Record<string, string | number>) => string;
  isLoading: boolean;
  error: Error | null;
}

const TranslationContext = createContext<TranslationContextType | null>(null);

// Provider props interface
interface TranslationProviderProps {
  children: ReactNode;
  loader: TranslationLoader;
  initialLocale?: SupportedLocale;
  fallbackLocale?: SupportedLocale;
  namespaces: string[];
}

// Hook to use translations
export function useTranslation(): TranslationContextType {
  const context = useContext(TranslationContext);
  if (!context) {
    throw new Error('useTranslation must be used within a TranslationProvider');
  }
  return context;
}

export function TranslationProvider({
  children,
  loader,
  initialLocale = 'en',
  fallbackLocale = 'en',
  namespaces
}: TranslationProviderProps): JSX.Element {
  const [currentLocale, setCurrentLocale] = useState<SupportedLocale>(initialLocale);
  const [translations, setTranslations] = useState<NestedTranslations>({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const loadTranslations = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const loadedTranslations: NestedTranslations = {};
        await Promise.all(
          namespaces.map(async (namespace: string) => {
            const content = await loader.loadNamespace(namespace);
            if (isNestedTranslations(content)) {
              loadedTranslations[namespace] = content;
            } else {
              throw new Error(`Invalid translation format for namespace: ${namespace}`);
            }
          })
        );
        setTranslations(loadedTranslations);
      } catch (e) {
        setError(e instanceof Error ? e : new Error('Failed to load translations'));
      } finally {
        setIsLoading(false);
      }
    };

    loadTranslations();
  }, [loader, namespaces]);

  const translate = useCallback((key: string, params?: Record<string, string | number>): string => {
    const parts = key.split('.');
    if (parts.length < 2) {
      console.warn('Translation key should include namespace, e.g., "namespace.key"');
      return key;
    }

    const [namespace, ...keyParts] = parts;
    const translation = translations[namespace];

    if (!translation) {
      console.warn(`Namespace "${namespace}" not loaded`);
      return key;
    }

    let current: NestedTranslations | TranslationEntry = translation;

    // Navigate through the nested structure
    for (let i = 0; i < keyParts.length - 1; i++) {
      const part = keyParts[i];
      if (!isNestedTranslations(current)) {
        console.warn(`Translation path "${key}" is not a nested structure`);
        return key;
      }
      current = current[part];
      if (!current) {
        console.warn(`Translation path "${key}" not found`);
        return key;
      }
    }

    // Get the final value
    const finalKey = keyParts[keyParts.length - 1];
    if (!isNestedTranslations(current)) {
      console.warn(`Translation key "${key}" points to a leaf node, expected a nested structure`);
      return key;
    }
    
    const value = current[finalKey];
    if (!value || (!isTranslationValue(value) && !isTranslationWithPlurals(value))) {
      console.warn(`Translation key "${key}" not found or invalid`);
      return key;
    }

    let valueStr: string;
    
    if (isTranslationWithPlurals(value) && typeof params?.count === 'number') {
      const count = params.count;
      const form = count === 0 ? 'zero' : count === 1 ? 'one' : 'other';
      const pluralForm = value[form];
      valueStr = pluralForm ? pluralForm[currentLocale] || pluralForm[fallbackLocale] || key : key;
    } else if (isTranslationValue(value)) {
      valueStr = value[currentLocale] || value[fallbackLocale] || key;
    } else {
      return key;
    }

    let result = valueStr;

    if (params) {
      Object.entries(params).forEach(([paramKey, paramValue]) => {
        result = result.replace(new RegExp(`{${paramKey}}`, 'g'), String(paramValue));
      });
    }

    return result;
  }, [translations, currentLocale, fallbackLocale]);

  const setLocale = useCallback((locale: SupportedLocale) => {
    if (locale === currentLocale) return;
    setCurrentLocale(locale);
  }, [currentLocale]);

  const contextValue = useMemo<TranslationContextType>(() => ({
    currentLocale,
    setLocale,
    t: translate,
    isLoading,
    error
  }), [currentLocale, setLocale, translate, isLoading, error]);

  return (
    <TranslationContext.Provider value={contextValue}>
      {children}
    </TranslationContext.Provider>
  );
};

// Main component and context exports
export { TranslationContext, type TranslationContextType, type TranslationProviderProps };

// Default export
export default TranslationProvider;
