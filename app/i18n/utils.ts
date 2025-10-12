import type { Locale } from "./type";

/**
 * Get nested value from object using dot notation
 * @param obj - The object to search in
 * @param path - Dot notation path (e.g., 'games.survival.title')
 * @param fallback - Fallback value if path not found
 */
function getNestedValue(obj: any, path: string, fallback?: string): any {
  return path.split(".").reduce((current, key) => {
    return current && current[key] !== undefined ? current[key] : fallback;
  }, obj);
}

/**
 * Translate function that can be used both on client and server
 * @param locale - The locale object containing translations
 * @param key - Translation key in dot notation (e.g., 'games.survival.title')
 * @param params - Optional parameters for string interpolation
 * @param fallback - Optional fallback text
 */
export function translate(
  locale: Record<string, unknown>,
  key: string,
  params?: Record<string, string | number>,
  fallback?: string,
): string {
  const translation = getNestedValue(locale, key, fallback || key);

  if (typeof translation !== "string") {
    return fallback || key;
  }

  // Simple string interpolation
  if (params) {
    return translation.replace(/\{(\w+)\}/g, (match, paramKey) => {
      return params[paramKey]?.toString() || match;
    });
  }

  return translation;
}

/**
 * Create a translation function bound to a specific locale
 * @param locale - The locale object
 */
export function getTranslate(locale: Record<string, unknown>) {
  return (
    key: string,
    params?: Record<string, string | number>,
    fallback?: string,
  ) => {
    return translate(locale, key, params, fallback);
  };
}
