/**
 * Global application constants.
 * Centralizing these values ensures consistency across the app,
 * and makes it easier to manage URLs, metadata, and configuration limits.
 */

export const SITE_METADATA = {
  title: 'Next.js Ignite Kit',
  description: 'Premium Next.js starter kit for high-performance SaaS and portfolios.',
  author: 'Gaurav Porwal',
  url: 'https://nextjs-ignite-kit.vercel.app',
  twitter: '@gauravprwl14',
};

export const API_ENDPOINTS = {
  // Simulated backend endpoint for translations
  TRANSLATIONS: '/api/v1/translations',
};

export const UI_CONSTANTS = {
  MAX_BLOG_RESULTS: 10,
  SEARCH_DEBOUNCE_MS: 300,
  THEME_STORAGE_KEY: 'ignite-kit-theme',
};

export const SUPPORTED_LOCALES = ['en', 'hi'] as const;
export type Locale = (typeof SUPPORTED_LOCALES)[number];

export const DEFAULT_LOCALE: Locale = 'en';

export const COOKIE_NAMES = {
  LOCALE: 'NEXT_LOCALE',
  USER_SESSION: 'USER_SESSION',
};
