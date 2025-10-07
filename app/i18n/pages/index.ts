import type { Language, PageLocale } from "../types";

// Page locale loader function
export async function loadPageLocale(
  lang: Language,
  pageName: string,
): Promise<PageLocale | null> {
  try {
    const locale = await import(`./${lang}/${pageName}.ts`);
    return locale.default || locale;
  } catch (error) {
    console.warn(`Page locale not found: ${lang}/${pageName}`);
    return null;
  }
}

// Server-side page locale loader
export async function getPageLocale(
  lang: Language,
  pageName: string,
): Promise<PageLocale> {
  const pageLocale = await loadPageLocale(lang, pageName);

  // Fallback to English if locale not found
  if (!pageLocale && lang !== "en") {
    const fallbackLocale = await loadPageLocale("en", pageName);
    if (fallbackLocale) {
      return fallbackLocale;
    }
  }

  return pageLocale || {};
}
