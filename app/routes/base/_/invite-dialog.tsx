import { useQuery } from "@tanstack/react-query";
import clsx from "clsx";
import dayjs from "dayjs";
import { Ring2 } from "ldrs/react";
import { useState } from "react";
import { getInviteData } from "~/api/user";
import { Image } from "~/components/common";
import { Dialog, DialogContent } from "~/components/ui/dialog";
import { Drawer, DrawerContent } from "~/components/ui/drawer";
import { useUserProfile } from "~/contexts/user-profile";
import { useBreakpoint } from "~/hooks/dom";
import { useTranslate } from "~/i18n";
import { useRootLoader } from "~/root";
import { useDialogStore } from "~/store";

export function InviteDialog() {
  const t = useTranslate();
  const { user } = useUserProfile();
  const [_, { isMobile }] = useBreakpoint();

  const visible = useDialogStore((state) => state.visibleInviteDialog);
  const setVisible = useDialogStore((state) => state.setVisibleInviteDialog);

  const handleClose = () => setVisible(false);

  // 使用 useQuery 获取邀请数据
  const { data, isLoading: isLoadingData } = useQuery({
    queryKey: ["invite-data"],
    queryFn: getInviteData,
    enabled: !!user,
    staleTime: 5 * 60 * 1000, // 5分钟内数据保持新鲜
  });

  if (isMobile) {
    return (
      <Drawer open={visible} onOpenChange={handleClose}>
        <DrawerContent
          className="md:hidden border-none"
          onOpenAutoFocus={(e) => e.preventDefault()}
        >
          <div className="relative flex-1 min-h-0 flex flex-col">
            <div
              className={clsx(
                "absolute inset-x-0 -top-6.5 xs:-top-10 xs:pt-px sm:-top-11 flex items-center justify-center",
              )}
            >
              <Image
                className="max-w-80 xs:max-w-120 sm:max-w-132"
                src="https://cdn.ocmaker.app/assets/daily-checkin.webp"
              />
            </div>
            {isLoadingData ? (
              <div className="bg-base-100 rounded-t-2xl md:rounded-2xl px-6 pt-8 sm:pt-12 pb-6">
                <div className="text-center py-12">
                  <Ring2 color="#ef4444" size={32} stroke={3} />
                  <p className="text-neutral-600 mt-4">{t("common.loading")}</p>
                </div>
              </div>
            ) : (
              <InviteContent data={data} />
            )}
          </div>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Dialog open={visible} onOpenChange={handleClose}>
      <DialogContent
        onOpenAutoFocus={(e) => e.preventDefault()}
        className="max-md:hidden !max-w-xl p-0 border-none"
      >
        <div className="relative flex-1 min-h-0 flex flex-col max-h-[70vh]">
          <div className="absolute inset-x-0 -top-11 pt-px flex items-center justify-center">
            <Image
              className="max-w-132"
              src="https://cdn.ocmaker.app/assets/daily-checkin.webp"
            />
          </div>
          {isLoadingData ? (
            <div className="bg-white rounded-t-2xl md:rounded-2xl px-6 pt-8 sm:pt-12 pb-6">
              <div className="text-center py-12">
                <Ring2 color="#ef4444" size={32} stroke={3} />
                <p className="text-neutral-600 mt-4">{t("common.loading")}</p>
              </div>
            </div>
          ) : (
            <InviteContent data={data} />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

interface InviteContentProps {
  data?: Awaited<ReturnType<typeof getInviteData>>;
}

function InviteContent({ data }: InviteContentProps) {
  const t = useTranslate();
  const [copied, setCopied] = useState(false);
  const rootData = useRootLoader();
  const inviteRewardCredits = rootData?.INVITE_REWARD_CREDITS || 0;

  const handleCopy = async () => {
    if (!window || !data) return;

    setCopied(true);
    await window.navigator.clipboard.writeText(data.inviteLink);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };
  return (
    <div className="pt-8 sm:pt-12 flex-1 min-h-0 flex flex-col">
      {/* 内容区域暂时留空 */}
      <div className="text-center px-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-neutral-700 max-w-sm mx-auto mb-1 sm:mb-2">
          {t("dialogs.invite.title")}
        </h2>

        <p className="text-base text-neutral-600">
          {t("dialogs.invite.description", { credits: inviteRewardCredits })}
        </p>
      </div>
      <div className="flex items-center gap-3 my-4 px-6">
        <input
          value={data?.inviteLink}
          onChange={(e) => e.preventDefault()}
          readOnly
          className="input focus-visible:outline-none focus-visible:ring-0 focus-visible:border-input flex-1 min-w-0"
        />
        <button
          className="btn btn-primary w-28"
          disabled={copied}
          onClick={handleCopy}
        >
          {copied
            ? t("dialogs.invite.copiedButton")
            : t("dialogs.invite.copyButton")}
        </button>
      </div>
      <div className="w-full h-px bg-neutral-300" />
      <div className="flex-1 min-h-0 px-6 pt-4 pb-6 overflow-y-auto">
        <h3 className="text-xl font-semibold">
          {t("dialogs.invite.history.title")}
        </h3>
        {!data?.invitations.length ? (
          <div className="text-center pt-4 text-base text-neutral-600">
            {t("dialogs.invite.history.empty")}
          </div>
        ) : (
          <div className="mt-2">
            {data.invitations.map((invitation) => (
              <div
                className="rounded border-b last-of-type:border-b-0 border-neutral-100 py-2"
                key={invitation.id}
              >
                <div className="flex items-center gap-2">
                  <div className="avatar">
                    <div className="w-8 h-8 rounded-full border">
                      {invitation.invitee.avatar_url ? (
                        <img
                          src={invitation.invitee.avatar_url}
                          alt={invitation.invitee.nickname}
                        />
                      ) : (
                        <div className="flex items-center justify-center bg-base-300 text-base-content w-full h-full text-sm font-medium">
                          {invitation.invitee.nickname.charAt(0)}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex-1 min-w-0 space-y-0.5">
                    <div className="font-medium text-base leading-none">
                      {invitation.invitee.nickname}
                    </div>
                    <div className="text-xs leading-none text-muted-foreground">
                      {dayjs(invitation.created_at).format(
                        "YYYY-MM-DD HH:mm:ss",
                      )}
                    </div>
                  </div>
                  <div className="text-base leading-none text-red-500 font-medium">
                    {t("dialogs.invite.history.reward", {
                      credits: invitation.reward_credits,
                    })}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
