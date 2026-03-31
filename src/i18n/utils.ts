import en from './en.json';
import es from './es.json';

type DeepStringRecord = { [key: string]: string | DeepStringRecord };

const translations: Record<string, DeepStringRecord> = { en, es };

export type SupportedLocale = 'en' | 'es';

export function useTranslations(locale: string | undefined) {
  const lang = (locale === 'es' ? 'es' : 'en') as SupportedLocale;
  const t = translations[lang] ?? translations.en;

  return function get(key: string): string {
    const keys = key.split('.');
    let value: string | DeepStringRecord = t;
    for (const k of keys) {
      if (typeof value !== 'object') return key;
      value = (value as DeepStringRecord)[k];
    }
    if (typeof value === 'string') return value;
    // Fall back to English if missing
    let fallback: string | DeepStringRecord = translations.en;
    for (const k of keys) {
      if (typeof fallback !== 'object') return key;
      fallback = (fallback as DeepStringRecord)[k];
    }
    return typeof fallback === 'string' ? fallback : key;
  };
}
