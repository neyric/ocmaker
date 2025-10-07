import { merge } from "lodash-es";
import { baseLanguage as DEFAULT_LANGUAGE } from "../index";
import type { Language, PageLocale } from "../types";

type PageLocaleLoader = () => Promise<PageLocale>;

const BASE_VARIANT = "base";

const pageLocaleModules = Object.fromEntries(
  Object.entries(
    import.meta.glob(["./**/*.ts", "!./index.ts"], {
      import: "default",
    }) as Record<string, PageLocaleLoader>
  ).map(([key, loader]) => [key.slice(2, -3), loader] as const)
);

const normalizePageName = (value: string) =>
  value
    .trim()
    .replace(/^\.+\//, "")
    .replace(/^\//, "")
    .replace(/\.(ts|tsx|js|jsx)$/, "");

const getLoader = (page: string, locale: string) =>
  pageLocaleModules[`${page}/${locale}`];

const loadLocale = async (loader?: PageLocaleLoader | null) => {
  if (!loader) return null;

  const result = await loader();
  return result ?? null;
};

export async function getPageLocale(
  lang: Language,
  pageName: string
): Promise<PageLocale> {
  const page = normalizePageName(pageName);

  const baseLocale = await loadLocale(getLoader(page, BASE_VARIANT));
  const languageLocale = await loadLocale(getLoader(page, lang));

  if (!languageLocale && lang !== DEFAULT_LANGUAGE) {
    const fallbackLocale = await loadLocale(getLoader(page, DEFAULT_LANGUAGE));

    if (baseLocale || fallbackLocale) {
      return merge({}, baseLocale ?? {}, fallbackLocale ?? {});
    }

    return {};
  }

  if (!baseLocale && !languageLocale) return {};

  return merge({}, baseLocale ?? {}, languageLocale ?? {});
}
