import { baseLanguage, langCodes, languages } from "~/i18n";

type MetaDescriptor = {
  tagName: "link";
  rel: "canonical" | "alternate";
  href: string;
  hrefLang?: string;
};

export const createCanonical = (
  pathname: string,
  domain: string,
): MetaDescriptor => {
  const href = new URL(pathname, domain).toString();

  return {
    tagName: "link",
    rel: "canonical",
    href: href.endsWith("/") ? href.slice(0, -1) : href,
  };
};

export const createAlternative = (
  pathname: string,
  domain: string,
  language: string,
  lang?: string,
): MetaDescriptor => {
  const hrefLang = lang || language;
  const href = new URL(pathname, domain).toString();

  return {
    tagName: "link",
    rel: "alternate",
    href: href.endsWith("/") ? href.slice(0, -1) : href,
    hrefLang,
  };
};

export const createAlternatives = (
  domain: string,
  languages: Array<{ code: string; path: string; hrefLang?: string }>,
): MetaDescriptor[] => {
  return languages.map(({ code, path, hrefLang }) => {
    return createAlternative(path, domain, code, hrefLang);
  });
};

export const createNormalAlternatives = (
  path: string,
  domain: string,
): MetaDescriptor[] => {
  const alternatives = languages.map((lang) => ({
    code: lang,
    path: lang === baseLanguage ? path : `/${lang}${path}`,
    hrefLang: lang === baseLanguage ? "x-default" : langCodes[lang],
  }));

  return createAlternatives(domain, alternatives);
};
