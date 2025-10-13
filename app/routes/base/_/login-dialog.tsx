import { Save } from "lucide-react";
import { Link, Logo } from "~/components/common";
import { Google } from "~/components/icons";
import { Dialog, DialogContent } from "~/components/ui/dialog";
import { useUserProfile } from "~/contexts/user-profile";
import { useGoogleLogin } from "~/hooks/data";
import { useTranslate } from "~/i18n";
import { useRootLoader } from "~/root";
import { useDialogStore } from "~/store";

export function LoginDialog({ useOneTap = false }: { useOneTap?: boolean }) {
  const t = useTranslate();
  const rootLoader = useRootLoader();
  const { login, isLoging } = useGoogleLogin({ useOneTap });

  const initlize = rootLoader?.INITLIZE_CREDITS;

  const visible = useDialogStore((state) => state.visibleLoginDialog);
  const dialogType = useDialogStore((state) => state.loginDialogType);
  const setVisible = useDialogStore((state) => state.setVisibleLoginDialog);

  const { setUser, setCredits, setSubscription } = useUserProfile();

  const handleClose = () => setVisible(false);

  const handleLogin = async () => {
    const result = await login();
    setUser(result.profile);
    setCredits(result.credits);
    setSubscription(result.subscription);

    handleClose();
  };

  return (
    <Dialog open={visible} onOpenChange={handleClose}>
      <DialogContent
        className="sm:!max-w-sm"
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <div className="flex flex-col items-center">
          <Logo className="mr-3" size="lg" />
          <div className="my-4 mb-8 text-center">
            <div className="font-semibold text-2xl sm:text-3xl text-base-content">
              {dialogType === "before-create"
                ? t("dialogs.login.titleBeforeCreate")
                : t("dialogs.login.title")}
            </div>
            <p className="text-base text-base-content/70">
              {t("dialogs.login.description", { credits: initlize || 0 })}
            </p>
          </div>
          <div className="w-full px-4 space-y-2">
            <button
              className="btn bg-white text-black border-[#e5e5e5] w-full"
              onClick={handleLogin}
              disabled={isLoging}
            >
              {isLoging ? (
                <span className="loading loading-spinner loading-sm" />
              ) : (
                <Google className="size-5" />
              )}
              {t("dialogs.login.googleButton")}
            </button>
            <p className="text-xs text-base-content/70 text-center">
              {t("dialogs.login.termsText")}{" "}
              <Link
                className="underline"
                target="_blank"
                to="/legal/terms"
                autoLang
              >
                {t("dialogs.login.termsLink")}
              </Link>
            </p>
            {dialogType === "before-create" && (
              <div className="flex items-center justify-center mt-4">
                <div className="bg-primary/10 text-primary px-4 py-2 text-sm rounded-field text-center flex items-center gap-2 cursor-pointer">
                  <Save size={20} />
                  {t("dialogs.login.saveNote")}
                </div>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
