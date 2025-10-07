import { useEffect, useState } from "react";
import { useLanguage } from "../hooks";
import type { Language, PageLocale } from "../types";

/**
 * Hook to load page-specific locale data
 * @param pageName - Name of the page (e.g., 'home', 'dashboard')
 * @returns Page locale data and loading state
 */
export function usePageLocale(pageName: string) {
  const { lang } = useLanguage();
  const [pageLocale, setPageLocale] = useState<PageLocale | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadPageLocale() {
      setLoading(true);
      setError(null);

      try {
        // Dynamic import of page locale
        const locale = await import(`../pages/${lang}/${pageName}.ts`);
        setPageLocale(locale.default || locale);
      } catch (err) {
        // Try fallback to English
        if (lang !== "en") {
          try {
            const fallbackLocale = await import(`../pages/en/${pageName}.ts`);
            setPageLocale(fallbackLocale.default || fallbackLocale);
          } catch (fallbackErr) {
            setError(`Page locale not found: ${pageName}`);
            setPageLocale(null);
          }
        } else {
          setError(`Page locale not found: ${pageName}`);
          setPageLocale(null);
        }
      } finally {
        setLoading(false);
      }
    }

    loadPageLocale();
  }, [lang, pageName]);

  return { pageLocale, loading, error };
}

/**
 * Hook to use translation with page-specific locale
 * Combines the base locale with page-specific translations
 * @param pageName - Name of the page
 * @returns Translation function with page locale merged
 */
export function usePageTranslate(pageName: string) {
  const { pageLocale } = usePageLocale(pageName);
  const translateHook = require("../hooks").useTranslate;

  // Get the translate function with page locale merged
  return translateHook(pageLocale || undefined);
}
