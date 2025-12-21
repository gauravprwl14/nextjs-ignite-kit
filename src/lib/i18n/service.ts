import { DEFAULT_LOCALE, Locale } from '../constants';

/**
 * Type defining the structure of translations.
 * Key-value pairs where values can be nested objects or strings.
 */
export type Translations = Record<string, string | Record<string, string>>;

/**
 * In-memory cache for translations to avoid redundant network/backend calls.
 * This ensures high performance on subsequent requests.
 */
const translationCache: Map<Locale, Translations> = new Map();

/**
 * Mock translations simulating a backend response.
 */
const mockTranslations: Record<Locale, Translations> = {
  en: {
    hero: {
      title: 'Architecting High-Performance User Experiences',
      subtitle: 'Building specialized, scalable web applications with a focus on modern design and technical excellence.',
    },
    common: {
      getStarted: 'Get Started',
      learnMore: 'Learn More',
    },
  },
  hi: {
    hero: {
      title: 'उच्च प्रदर्शन उपयोगकर्ता अनुभवों का निर्माण',
      subtitle: 'आधुनिक डिजाइन और तकनीकी उत्कृष्टता पर ध्यान केंद्रित करते हुए विशेष, स्केलेबल वेब अनुप्रयोगों का निर्माण।',
    },
    common: {
      getStarted: 'शुरू करें',
      learnMore: 'और जानें',
    },
  },
};

/**
 * Fetches translations for a given locale.
 * Simulates a backend request with a small delay and implements caching.
 */
export async function fetchTranslations(locale: Locale): Promise<Translations> {
  // Check cache first
  if (translationCache.has(locale)) {
    return translationCache.get(locale)!;
  }

  // Simulate network delay
  // In a real app, this would be: await fetch(`/api/translations?lang=${locale}`).then(r => r.json());
  await new Promise((resolve) => setTimeout(resolve, 50));

  const translations = mockTranslations[locale] || mockTranslations[DEFAULT_LOCALE];
  
  // Update cache
  translationCache.set(locale, translations);

  return translations;
}
