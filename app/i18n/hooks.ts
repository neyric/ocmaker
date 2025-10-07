import type { ReactNode } from "react";
import { useRootLoader } from "~/root";
import { getTranslate } from "./utils";

/**
 * Extended translation function type with chunk support for React components
 */
interface TranslateFunction {
  (
    key: string,
    params?: Record<string, string | number>,
    fallback?: string
  ): string;
  chunk: (
    key: string,
    renderer: (content: string) => ReactNode,
    params?: Record<string, string | number>,
    fallback?: string
  ) => ReactNode[];
}

/**
 * Hook to get the translation function with React component support
 * @param extraLocale - Optional additional locale data to merge with the base locale
 * @returns Translation function that can be used as:
 *   - t('key.path', params, fallback) for simple translations
 *   - t.chunk('key.path', (content) => <span>{content}</span>, params) for React components
 */
export function useTranslate(
  extraLocale?: Record<string, any>
): TranslateFunction {
  const rootData = useRootLoader();

  if (!rootData) {
    // Fallback function that returns the key if no locale is available
    const fallbackFn = (
      key: string,
      _params?: Record<string, string | number>,
      fallback?: string
    ) => {
      return fallback || key;
    };

    // Add chunk method for consistency even in fallback mode
    (fallbackFn as TranslateFunction).chunk = (
      key: string,
      renderer: (content: string) => ReactNode,
      _params?: Record<string, string | number>,
      fallback?: string
    ) => {
      const text = fallback || key;
      return [renderer(text)];
    };

    return fallbackFn as TranslateFunction;
  }

  // Merge extra locale with base locale if provided
  const mergedLocale = extraLocale ? extraLocale : rootData.i18n.locale;

  const translateFn = getTranslate(mergedLocale);

  // Extend the translate function with chunk method
  const extendedTranslate = translateFn as TranslateFunction;

  extendedTranslate.chunk = (
    key: string,
    renderer: (content: string) => ReactNode,
    params?: Record<string, string | number>,
    fallback?: string
  ): ReactNode[] => {
    const translation = translateFn(key, params, fallback);

    // Parse the translation string to find tagged sections like <g>content</g>
    const parts: ReactNode[] = [];
    const tagRegex = /<(\w+)>(.*?)<\/\1>/g;
    let lastIndex = 0;
    let match = tagRegex.exec(translation);

    while (match !== null) {
      // Add text before the tag
      if (match.index > lastIndex) {
        parts.push(translation.slice(lastIndex, match.index));
      }

      // Process the content inside the tag
      const tagContent = match[2];

      // If the tag content has placeholders, replace them
      let processedContent = tagContent;
      if (params) {
        processedContent = tagContent.replace(/\{(\w+)\}/g, (m, paramKey) => {
          return params[paramKey]?.toString() || m;
        });
      }

      // Apply the renderer to the tag content
      parts.push(renderer(processedContent));

      lastIndex = match.index + match[0].length;
      match = tagRegex.exec(translation);
    }

    // Add any remaining text after the last tag
    if (lastIndex < translation.length) {
      parts.push(translation.slice(lastIndex));
    }

    // If no tags were found, return the whole translation wrapped in renderer
    if (parts.length === 0) {
      parts.push(renderer(translation));
    }

    return parts;
  };

  return extendedTranslate;
}

/**
 * Hook to get the current language information
 */
export function useLanguage() {
  const rootData = useRootLoader();

  return {
    lang: rootData?.i18n?.lang || "en",
    langCode: rootData?.i18n?.langCode || "en",
    locale: rootData?.i18n?.locale,
  };
}
