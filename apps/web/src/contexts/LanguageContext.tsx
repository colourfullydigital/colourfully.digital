import { createContext, useContext, useEffect, useState } from 'react';
import type { SupportedLocale, TranslateFunction } from '../i18n';
import { getPreferredLocale, SUPPORTED_LOCALES } from '../i18n';

interface LanguageContextType {
  currentLocale: SupportedLocale;
  setLocale: (locale: SupportedLocale) => void;
  t: TranslateFunction;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ 
  children,
  initialLocale,
  translationFunction 
}: { 
  children: React.ReactNode;
  initialLocale?: SupportedLocale;
  translationFunction: TranslateFunction;
}) {
  // Initialize with passed locale, stored preference, or browser preference
  const [currentLocale, setCurrentLocale] = useState<SupportedLocale>(
    initialLocale || 
    (typeof localStorage !== 'undefined' && localStorage.getItem('preferredLocale') as SupportedLocale) || 
    getPreferredLocale()
  );

  // Persist locale preference
  useEffect(() => {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('preferredLocale', currentLocale);
    }
  }, [currentLocale]);

  const setLocale = (newLocale: SupportedLocale) => {
    if (SUPPORTED_LOCALES.includes(newLocale)) {
      setCurrentLocale(newLocale);
      // Update URL to reflect new locale
      const currentPath = window.location.pathname;
      const newPath = '/' + newLocale + currentPath.substring(3); // Replace language prefix
      window.history.pushState({}, '', newPath);
    }
  };

  return (
    <LanguageContext.Provider value={{ 
      currentLocale, 
      setLocale,
      t: translationFunction
    }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
