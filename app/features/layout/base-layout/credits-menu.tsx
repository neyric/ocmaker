import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import { CheckCircle2, DatabaseZap, Gift, Users } from "lucide-react";
import { useState } from "react";
import { getCheckinStatus } from "~/api/user";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { useUserProfile } from "~/contexts/user-profile";
import { useTranslate } from "~/i18n";
import { useDialogStore } from "~/store/dialog";

export const CreditsMenu = ({ credits }: { credits?: number }) => {
  const t = useTranslate();
  const { user, subscription } = useUserProfile();

  const [opened, setOpened] = useState(false);

  const { data: stats } = useQuery({
    queryKey: ["checkin-status"],
    queryFn: getCheckinStatus,
    enabled: !!user, // 只有当对话框打开时才请求
    staleTime: 5 * 60 * 1000, // 5分钟内数据保持新鲜
  });

  const setVisibleUpgradeDialog = useDialogStore(
    (state) => state.setVisibleUpgradeDialog
  );
  const setVisibleCheckinDialog = useDialogStore(
    (state) => state.setVisibleCheckinDialog
  );
  const setVisibleInviteDialog = useDialogStore(
    (state) => state.setVisibleInviteDialog
  );

  const handleClose = () => {
    setOpened(false);
  };

  const handleAddMore = () => {
    setVisibleUpgradeDialog(true, "basic");
    handleClose();
  };

  const handleCheckin = () => {
    setVisibleCheckinDialog(true);
    handleClose();
  };

  const handleInvite = () => {
    setVisibleInviteDialog(true);
    handleClose();
  };

  return (
    <DropdownMenu open={opened} onOpenChange={setOpened}>
      <DropdownMenuTrigger asChild>
        <div>
          <button
            className="btn btn-sm btn-warning hidden sm:flex"
            aria-label="Credits Menu"
          >
            {credits}
            <DatabaseZap className="size-4" />
          </button>
          <button
            className="btn btn-sm btn-warning sm:hidden"
            aria-label="Credits Menu"
          >
            <Gift className="size-4" />
          </button>
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="center"
        className="w-64 sm:w-72 !rounded-xl p-1"
        sideOffset={16}
      >
        <DropdownMenuLabel>
          {!subscription ? (
            <div>
              <div className="text-xl font-semibold">
                {t("creditsMenu.planTypes.free")}
              </div>
            </div>
          ) : (
            <div>
              <div className="text-xl font-semibold">
                {subscription.plan_type[0]
                  .toUpperCase()
                  .concat(subscription.plan_type.slice(1))}
              </div>
              {subscription.expired_at && (
                <div className="text-base-content/70">
                  {t("creditsMenu.expired", {
                    date: dayjs(subscription.expired_at).format("YYYY-MM-DD"),
                  })}
                </div>
              )}
            </div>
          )}
        </DropdownMenuLabel>

        <DropdownMenuLabel>
          <div className="bg-base-300 rounded p-3">
            <div className="leading-none text-base text-base-content mb-2">
              {t("creditsMenu.balance.title")}
            </div>
            <div className="flex justify-between font-normal text-sm leading-none text-base-content/70">
              <div>{t("creditsMenu.balance.label")}</div>
              <div className="text-red-500 flex items-center gap-1">
                <div>{credits}</div>
                <DatabaseZap size={16} />
              </div>
            </div>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuLabel>
          <button className="btn btn-warning btn-block btn-sm" onClick={handleAddMore}>
            {t("creditsMenu.buttons.addMore")}
          </button>
          <div className="grid grid-cols-2 mt-2 gap-2">
            <button
              className="btn btn-ghost btn-block btn-sm"
              onClick={handleInvite}
            >
              <Users className="size-5 text-primary" />
              {t("creditsMenu.buttons.invite")}
            </button>
            {stats?.has_checked_in_today ? (
              <button
                className="btn btn-ghost btn-block btn-sm opacity-50"
                onClick={handleCheckin}
              >
                <CheckCircle2 className="size-4" />
                {t("creditsMenu.buttons.checkedIn")}
              </button>
            ) : (
              <button
                className="btn btn-ghost btn-block btn-sm"
                onClick={handleCheckin}
              >
                <Gift className="size-5 text-warning" />
                {t("creditsMenu.buttons.checkin")}
              </button>
            )}
          </div>
        </DropdownMenuLabel>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
