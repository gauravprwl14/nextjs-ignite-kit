'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { DEFAULT_LOCALE, Locale } from '@/lib/constants';
import { fetchTranslations, Translations } from '@/lib/i18n/service';

interface I18nContextType {
  locale: Locale;
  t: (key: string) => string;
  setLocale: (locale: Locale) => void;
  isLoading: boolean;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

/**
 * Provider component for managing application-wide translations.
 * Handles fetching translations based on the current locale and provides a translation function.
 */
export function I18nProvider({
  children,
  initialLocale = DEFAULT_LOCALE,
}: Readonly<{
  children: React.ReactNode;
  initialLocale?: Locale;
}>) {
  const [locale, setLocaleState] = useState<Locale>(initialLocale);
  const [translations, setTranslations] = useState<Translations>({});
  const [isLoading, setIsLoading] = useState(true);

  // Load translations whenever the locale changes
  useEffect(() => {
    async function loadTranslations() {
      setIsLoading(true);
      try {
        const data = await fetchTranslations(locale);
        setTranslations(data);
      } catch (error) {
        console.error('Failed to load translations:', error);
      } finally {
        setIsLoading(false);
      }
    }

    loadTranslations();
  }, [locale]);

  /**
   * Function to look up a translation key. 
   * Supports nested keys (e.g., 'hero.title').
   */
  const t = React.useCallback((key: string): string => {
    const keys = key.split('.');
    let result: string | Record<string, string> | Translations = translations;

    for (const k of keys) {
      if (result && typeof result === 'object' && k in result) {
        result = (result as Record<string, string | Record<string, string>>)[k];
      } else {
        return key; // Return the key itself if not found
      }
    }

    return typeof result === 'string' ? result : key;
  }, [translations]);

  /**
   * Updates the locale and sets the cookie for persistence (SSO-friendly).
   */
  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=31536000; SameSite=Lax`;
  };

  const value = React.useMemo(
    () => ({ locale, t, setLocale, isLoading }),
    [locale, t, isLoading]
  );

  return (
    <I18nContext.Provider value={value}>
      {children}
    </I18nContext.Provider>
  );
}

/**
 * Hook to access translations and locale management within components.
 */
export function useTranslation() {
  const context = useContext(I18nContext);
  if (context === undefined) {
    throw new Error('useTranslation must be used within an I18nProvider');
  }
  return context;
}
