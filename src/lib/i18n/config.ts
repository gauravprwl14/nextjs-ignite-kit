import { DEFAULT_LOCALE, Locale, SUPPORTED_LOCALES } from '../constants';

/**
 * i18n configuration utility.
 */
export const i18nConfig = {
  defaultLocale: DEFAULT_LOCALE,
  locales: SUPPORTED_LOCALES,
};

/**
 * Validates if the given locale is supported.
 */
export function isSupportedLocale(locale: string): locale is Locale {
  return (SUPPORTED_LOCALES as readonly string[]).includes(locale);
}
