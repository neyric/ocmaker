import Clarity from "@microsoft/clarity";
import { useEffect, useRef } from "react";
import {
  Links,
  Meta,
  Scripts,
  ScrollRestoration,
  useRouteError,
} from "react-router";
import { Toaster } from "~/components/ui/sonner";
import { Providers } from "./provider";

interface DocumentProps {
  DOMAIN?: string;
  GOOGLE_ADS_ID?: string;
  GOOGLE_ANALYTICS_ID?: string;
  CLARITY_ID?: string;
  lang?: string;
  theme?: "light" | "dark";
  structure?: Record<string, unknown>;
}
export function Document({
  lang = "pt-BR",
  theme = "light",
  structure,
  children,
  DOMAIN,
  GOOGLE_ADS_ID,
  GOOGLE_ANALYTICS_ID,
  CLARITY_ID,
}: React.PropsWithChildren<DocumentProps>) {
  const rootRef = useRef<HTMLHtmlElement>(null);
  const error = useRouteError();

  useEffect(() => {
    if (!rootRef.current) return;
    rootRef.current.lang = lang;
  }, [lang]);

  useEffect(() => {
    if (!import.meta.env.PROD) return;

    if (!CLARITY_ID) return;

    const timer = setTimeout(() => {
      Clarity.init(CLARITY_ID);
    }, 3000);

    return () => clearTimeout(timer);
  }, [CLARITY_ID]);

  useEffect(() => {
    if (!import.meta.env.PROD) return;

    if (!GOOGLE_ANALYTICS_ID) return;

    let gaScript: HTMLScriptElement;
    let gaInitScript: HTMLScriptElement;

    gaScript = document.createElement("script");
    gaScript.src = `https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ANALYTICS_ID}`;
    gaScript.async = true;

    // Initlize
    gaInitScript = document.createElement("script");
    gaInitScript.id = "gtag-init";
    gaInitScript.async = true;

    gaInitScript.textContent = `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GOOGLE_ANALYTICS_ID}', {
              page_path: window.location.pathname,
            });
          `;

    const timer = setTimeout(() => {
      document.head.appendChild(gaScript);
      document.head.appendChild(gaInitScript);
    }, 3000);

    return () => {
      clearTimeout(timer);
      if (gaScript) gaScript.remove();
      if (gaInitScript) gaInitScript.remove();
    };
  }, [GOOGLE_ANALYTICS_ID]);

  useEffect(() => {
    if (!import.meta.env.PROD) return;

    let adsScript: HTMLScriptElement;
    let pScript: HTMLScriptElement;

    // Adsense
    if (GOOGLE_ADS_ID && !error) {
      adsScript = document.createElement("script");
      adsScript.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-${GOOGLE_ADS_ID}`;
      adsScript.async = true;
      adsScript.crossOrigin = "anonymous";

      document.head.appendChild(adsScript);
    }

    // Plausible
    if (DOMAIN) {
      pScript = document.createElement("script");
      pScript.src = "https://app.pageview.app/js/script.js";
      pScript.dataset.domain = new URL(DOMAIN).hostname;
      pScript.defer = true;

      document.head.appendChild(pScript);
    }

    return () => {
      if (adsScript) adsScript.remove();
      if (pScript) pScript.remove();
    };
  }, [GOOGLE_ADS_ID, DOMAIN, error]);

  return (
    <html ref={rootRef} lang={lang} data-theme={theme}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {GOOGLE_ADS_ID && (
          <meta name="google-adsense-account" content={`ca-${GOOGLE_ADS_ID}`} />
        )}
        <Meta />
        <Links />
        {structure && (
          <script
            id="Organization"
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(structure) }}
          />
        )}
      </head>
      <body>
        <Providers>{children}</Providers>
        <Toaster theme={theme} />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}
