import { baseLanguage, languages } from "~/i18n";
import { getMakerList } from "~/i18n/maker";
import type { Route } from "./+types/[sitemap.xml]";

interface Sitemaps {
  path: string;
  priority: string;
  withI18N?: boolean;
  lastmod?: Date;
}
const defaultSitemaps: Sitemaps[] = [
  {
    path: "/",
    priority: "1.0",
    withI18N: true,
    lastmod: new Date("2025-10-13"),
  },
  {
    path: "/pricing",
    priority: "1.0",
    withI18N: true,
    lastmod: new Date("2025-10-13"),
  },
  {
    path: "/maker",
    priority: "1.0",
    withI18N: true,
    lastmod: new Date("2025-10-13"),
  },
  {
    path: "/legal/privacy",
    priority: "0.6",
    lastmod: new Date("2025-09-23"),
  },
  {
    path: "/legal/terms",
    priority: "0.6",
    lastmod: new Date("2025-09-23"),
  },
  {
    path: "/legal/cookie",
    priority: "0.6",
    lastmod: new Date("2025-09-23"),
  },
  {
    path: "/legal/refund",
    priority: "0.6",
    lastmod: new Date("2025-09-23"),
  },
];

export const loader = async ({ request }: Route.LoaderArgs) => {
  const makers = await getMakerList();
  const keys = Object.keys(makers).sort();

  const url = new URL(request.url);

  let sitemapList = [] as {
    loc: string;
    lastmod: string;
    priority: string;
  }[];

  keys.forEach((key) => {
    let url = `/maker/${key}`;
    const list = languages.map((lang) => {
      const value = {
        loc: lang === baseLanguage ? url : `/${lang}${url}`,
        lastmod: new Date().toISOString(),
        priority: "0.8",
      };
      return value;
    });
    sitemapList = sitemapList.concat(list);
  });

  const list = [] as typeof sitemapList;
  defaultSitemaps.forEach((site) => {
    if (site.withI18N) {
      const result = languages.map((lang) => {
        const value = {
          loc: lang === baseLanguage ? site.path : `/${lang}${site.path}`,
          lastmod: site.lastmod
            ? site.lastmod.toISOString()
            : new Date().toISOString(),
          priority: site.priority,
        };
        return value;
      });

      list.push(...result);
    } else {
      list.push({
        loc: site.path,
        lastmod: site.lastmod
          ? site.lastmod.toISOString()
          : new Date().toISOString(),
        priority: site.priority,
      });
    }
  });

  const content = `
      <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        ${list
          .concat(sitemapList)
          .map((site) => {
            const loc = new URL(site.loc, url.origin).toString();
            return `
            <url>
              <loc>${loc.endsWith("/") ? loc.slice(0, -1) : loc}</loc>
              <lastmod>${site.lastmod}</lastmod>
              <priority>${site.priority}</priority>
            </url>
          `;
          })
          .join("\n")}
      </urlset>
      `;

  return new Response(content, {
    status: 200,
    headers: {
      "Content-Type": "application/xml",
      "xml-version": "1.0",
      encoding: "UTF-8",
    },
  });
};
