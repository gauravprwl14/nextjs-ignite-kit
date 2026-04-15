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
      title: "I build systems that scale. You focus on growth.",
      subtitle:
        "Principal Technical Consultant with a decade of experience transforming complex challenges into elegant, scalable architectures.",
      badge: "Available for Strategic Engagements",
    },
    common: {
      getStarted: "Get Started",
      learnMore: "Learn More",
      startProject: "Start a Project",
      viewWork: "View Case Studies",
      contactMe: "Get in Touch",
    },
  },
  hi: {
    hero: {
      title: "मैं स्केलेबल सिस्टम बनाता हूं। आप विकास पर ध्यान दें।",
      subtitle:
        "एक दशक के अनुभव के साथ प्रिंसिपल टेक्निकल कंसल्टेंट, जटिल चुनौतियों को सुंदर, स्केलेबल आर्किटेक्चर में बदलता है।",
      badge: "रणनीतिक सहभागिता के लिए उपलब्ध",
    },
    common: {
      getStarted: "शुरू करें",
      learnMore: "और जानें",
      startProject: "प्रोजेक्ट शुरू करें",
      viewWork: "केस स्टडीज देखें",
      contactMe: "संपर्क करें",
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
