import { ChevronDown, Globe } from "lucide-react";
import { useLocation, useParams } from "react-router";
import { Link } from "~/components/common";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";

import {
  baseLanguage,
  langCodes,
  langNames,
  languages,
  useLanguage,
} from "~/i18n";

export const LanguageSwitcher = () => {
  const params = useParams();
  const location = useLocation();

  const { lang } = useLanguage();

  const buildLinkTo = (language: typeof lang) => {
    let pathname = location.pathname;
    if (params.lang) pathname = pathname.split("/").slice(2).join("/");
    if (language === baseLanguage) pathname = "/" + pathname;
    else pathname = `/${language}/` + pathname;

    return pathname.replace("//", "/");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className="p-2 hover:bg-base-200 hover:text-primary rounded-md focus-visible:outline-none hover:outline-none active:outline-none"
          aria-label="i18n button"
        >
          <Globe className="size-5" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        {languages.map((language) => (
          <DropdownMenuItem
            key={language}
            asChild
            className={`aria-checked:bg-base-300 hover:text-base-content hover:bg-base-200 aria-check:text-base-content focus:outline-0 hover:outline-0`}
            aria-checked={language === lang}
          >
            <Link
              to={buildLinkTo(language)}
              reloadDocument
              hrefLang={langCodes[language]}
            >
              {langNames[language]}
            </Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
