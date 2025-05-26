import type { MiddlewareHandler } from 'astro';
import { SUPPORTED_LOCALES } from './i18n';
import type { SupportedLocale } from './i18n';

interface MiddlewareLocals {
  locale: SupportedLocale;
}

// Middleware for handling language redirects and SEO
export const onRequest: MiddlewareHandler = async (context, next) => {
  const { request } = context;
  const locals = context.locals as MiddlewareLocals;
  const url = new URL(request.url);
  const [, locale] = url.pathname.split('/');

  // If no locale in URL, detect from Accept-Language header and redirect
  if (!locale) {
    const acceptLanguage = request.headers.get('accept-language');
    let preferredLocale: SupportedLocale = 'en'; // Default to English

    if (acceptLanguage) {
      // Parse Accept-Language header
      const languages = acceptLanguage.split(',')
        .map((lang: string) => lang.split(';')[0].trim().toLowerCase())
        .map((lang: string) => lang.split('-')[0]);

      // Find the first supported locale
      const matchedLocale = languages.find((lang: string) => 
        SUPPORTED_LOCALES.includes(lang as SupportedLocale)
      ) as SupportedLocale | undefined;

      if (matchedLocale) {
        preferredLocale = matchedLocale;
      }
    }

    // Redirect to the preferred locale
    return Response.redirect(`${url.origin}/${preferredLocale}${url.pathname}`, 302);
  }

  // If invalid locale, redirect to default locale (en)
  if (!SUPPORTED_LOCALES.includes(locale as SupportedLocale)) {
    return Response.redirect(`${url.origin}/en${url.pathname.substring(locale.length + 1)}`, 302);
  }

  // Store the current locale in locals for use in components
  locals.locale = locale as SupportedLocale;

  // Add Vary header to ensure proper caching with language detection
  const response = await next();
  response.headers.append('Vary', 'Accept-Language');
  
  return response;
};