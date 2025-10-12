import { merge } from "lodash-es";
import baseLocale from "./base";

export * from "./hooks";
export { getMakerLocale } from "./maker";
export { getPageLocale } from "./pages";
export * from "./types";
export * from "./utils";

const locales = Object.fromEntries(
  Array.from(
    Object.entries(
      import.meta.glob(["./*.ts", "!./type.ts", "!./utils.ts", "!./hooks.ts"], {
        import: "default",
      })
    )
  ).map(([key, value]) => [key.slice(2, -3), value] as const)
);

export type LangCode = (typeof languages)[number];

export const languages = ["en", "zh"] as const;
export const langNames: Record<LangCode, string> = {
  en: "English",
  zh: "简体中文",
};
export const langCodes: Record<LangCode, string> = {
  en: "en",
  zh: "zh-Hans",
};

export const baseLanguage = languages[0];

export const getLangCode = (lang: keyof typeof langCodes = baseLanguage) => {
  if (lang in langCodes) return langCodes[lang];
  return langCodes[baseLanguage];
};

export const getLocale = async (value?: string) => {
  const lang = (value ?? baseLanguage) as (typeof languages)[number];

  if (!languages.includes(lang)) return null;
  // 如果是默认语言，则直接返回 baseLocale
  if (lang === baseLanguage) {
    const locale = merge({}, baseLocale);
    const langCode = langCodes[lang];

    return { locale, lang, langCode };
  }

  const localePromise = locales[lang];
  // 如果没有获取到 Promise 说明配置文件存在问题，
  if (!localePromise) return null;

  // 使用获取到的内容进行 merge 得到完整的内容
  const result = await localePromise();
  const locale = merge({}, baseLocale, result);
  const langCode = langCodes[lang];

  return { locale, lang, langCode };
};
