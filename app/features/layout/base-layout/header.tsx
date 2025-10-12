import { Bell, Menu, Moon, Sun, User, X } from "lucide-react";
import { Fragment, useEffect, useState } from "react";
import { updateTheme } from "~/api/common/theme";
import { Link, Logo } from "~/components/common";
import { useUserProfile } from "~/contexts/user-profile";
import { useWindowScroll } from "~/hooks/dom";
import { useTranslate } from "~/i18n";
import { useRootLoader } from "~/root";
import { useDialogStore } from "~/store/dialog";
import { CreditsMenu } from "./credits-menu";
import { LanguageSwitcher } from "./language-switcher";

export interface HeaderProps {
  navLinks: Array<{
    to: string;
    label: string;
    target?: React.HTMLAttributeAnchorTarget;
  }>;
}

export const Header = ({ navLinks }: HeaderProps) => {
  const t = useTranslate();
  const { user, credits } = useUserProfile();

  const loaderData = useRootLoader();
  const { y } = useWindowScroll();
  const isScrolled = y > 20;
  const { setVisibleLoginDialog } = useDialogStore();

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">(
    loaderData?.theme || "light"
  );

  useEffect(() => {
    if (loaderData?.theme) setTheme(loaderData.theme);
  }, [loaderData?.theme]);

  const toggleTheme = async () => {
    const newTheme = theme === "light" ? "dark" : "light";

    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);

    await updateTheme(newTheme);
  };

  return (
    <Fragment>
      <header
        className="fixed bg-neutral text-neutral-content inset-x-0 top-0 z-10"
        data-scrolled={isScrolled}
      >
        <div className="container">
          <div className="flex items-center h-16 gap-4">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center">
              <Link className="cursor-pointer" to="/" autoLang>
                <Logo size="base" />
              </Link>
            </div>
            <div className="grow" />

            {/* Desktop Menu */}
            <div className="items-center gap-4 text-sm hidden lg:flex">
              {navLinks.map((link, i) => (
                <Link
                  key={i}
                  className="hover:text-primary"
                  title={link.label}
                  to={link.to}
                  target={link.target}
                  autoLang
                >
                  {link.label}
                </Link>
              ))}
              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="p-2 hover:bg-base-200 hover:text-primary rounded-md"
                hidden
              >
                {theme === "light" ? (
                  <Moon className="w-5 h-5" />
                ) : (
                  <Sun className="w-5 h-5" />
                )}
              </button>
              <LanguageSwitcher />
            </div>
            <div className="flex items-center gap-2">
              {user ? (
                <>
                  <CreditsMenu credits={credits} />
                  <Link
                    to="/dashboard"
                    className="btn btn-primary btn-sm shadow-none"
                    onClick={() => setDrawerOpen(false)}
                    autoLang
                  >
                    <User className="w-4 h-4" />
                    {t("common.dashboard")}
                  </Link>
                </>
              ) : (
                <button
                  onClick={() => {
                    setVisibleLoginDialog(true);
                    setDrawerOpen(false);
                  }}
                  className="btn btn-primary btn-sm shadow-none"
                >
                  {t("common.login")}
                </button>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="drawer inline-block w-6 h-6 lg:hidden">
              <input
                id="my-drawer"
                type="checkbox"
                className="drawer-toggle"
                checked={drawerOpen}
                onChange={(e) => setDrawerOpen(e.target.checked)}
              />
              <div className="drawer-content">
                <label htmlFor="my-drawer" className="cursor-pointer">
                  {drawerOpen ? (
                    <X className="w-6 h-6" />
                  ) : (
                    <Menu className="w-6 h-6" />
                  )}
                </label>
              </div>
              <div className="drawer-side z-50 h-full">
                <label
                  htmlFor="my-drawer"
                  aria-label="close sidebar"
                  className="drawer-overlay"
                />
                <div className="bg-base-100 text-base-content w-72 h-full flex flex-col">
                  {/* Logo 区域 */}
                  <div className="h-16 flex items-center px-4">
                    <Link
                      className="cursor-pointer"
                      to="/"
                      onClick={() => setDrawerOpen(false)}
                      autoLang
                    >
                      <Logo />
                    </Link>
                  </div>

                  {/* 导航内容 */}
                  <div className="flex-1 p-4 overflow-y-auto">
                    <div className="flex flex-col gap-4">
                      {navLinks.map((link, i) => (
                        <Link
                          key={i}
                          data-role="hotzone"
                          className="hover:text-primary"
                          title={link.label}
                          to={link.to}
                          onClick={() => setDrawerOpen(false)}
                          autoLang
                        >
                          {link.label}
                        </Link>
                      ))}

                      <button data-role="hotzone" hidden onClick={toggleTheme}>
                        {theme === "light" ? (
                          <Moon className="size-5" />
                        ) : (
                          <Sun className="size-5" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </Fragment>
  );
};
