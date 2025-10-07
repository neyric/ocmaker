import { createContext, RouterContextProvider, redirect } from "react-router";
import { baseLanguage, getLocale, getPageLocale } from "~/i18n";
import type { Language, PageLocale } from "~/i18n/types";
import type { Route } from "../../+types/root";

type I18nContext = Awaited<ReturnType<typeof getLocale>> & {
  getPageLocale: (pageName: string) => Promise<PageLocale>;
};
export const i18nContext = createContext<I18nContext>();

export const i18nMiddleware: Route.MiddlewareFunction = async ({
  request,
  params,
  context,
}) => {
  if (params.lang === baseLanguage) {
    const url = new URL(request.url);
    url.pathname = url.pathname.split("/").slice(2).join("/");
    return redirect(url.toString());
  }

  const locale = await getLocale(params.lang);
  if (!locale) throw new Response(null, { status: 404 });

  // Add getPageLocale function to the context
  const i18nData: I18nContext = {
    ...locale,
    getPageLocale: (pageName: string) =>
      getPageLocale(locale.lang as Language, pageName),
  };

  context.set(i18nContext, i18nData);
};

export const getI18nConetxt = (context: Readonly<RouterContextProvider>) => {
  const i18n = context.get(i18nContext);
  if (!i18n) throw new Response(null, { status: 404 });
  return i18n;
};
