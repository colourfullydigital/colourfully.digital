import type { SupportedLocale } from '../i18n';

export interface SEOProps {
  title: string;
  description: string;
  currentLocale: SupportedLocale;
  currentPath: string;
  siteUrl: string;
}

export function generateAlternateUrls(siteUrl: string, currentPath: string) {
  const normalizedSiteUrl = siteUrl.endsWith('/') ? siteUrl : `${siteUrl}/`;
  return {
    en: `${normalizedSiteUrl}en${currentPath.replace(/^\/(en|fr)/, '')}`,
    fr: `${normalizedSiteUrl}fr${currentPath.replace(/^\/(en|fr)/, '')}`
  };
}

export function generateStructuredData({
  title,
  description,
  currentLocale,
  currentPath,
  siteUrl
}: SEOProps) {
  const alternateUrls = generateAlternateUrls(siteUrl, currentPath);
  
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "url": alternateUrls[currentLocale],
    "name": title,
    "description": description,
    "inLanguage": currentLocale === 'fr' ? 'fr-FR' : 'en-US',
    "alternateLanguage": [
      {
        "@type": "Language",
        "name": currentLocale === 'fr' ? 'English' : 'Français',
        "alternateName": currentLocale === 'fr' ? 'en' : 'fr',
        "url": currentLocale === 'fr' ? alternateUrls.en : alternateUrls.fr
      }
    ]
  };
}

export function getLanguageMetaTags(currentLocale: SupportedLocale) {
  return {
    htmlLang: currentLocale,
    ogLocale: currentLocale === 'fr' ? 'fr_FR' : 'en_US',
    alternateLocale: currentLocale === 'fr' ? 'en_US' : 'fr_FR'
  };
}
