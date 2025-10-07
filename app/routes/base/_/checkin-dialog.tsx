import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import clsx from "clsx";
import { Ring2 } from "ldrs/react";
import { DollarSign, Gift } from "lucide-react";
import { getCheckinStatus, performCheckin } from "~/api/user";
import { Image } from "~/components/common";
import { Check } from "~/components/icons";
import { Dialog, DialogContent } from "~/components/ui/dialog";
import { Drawer, DrawerContent } from "~/components/ui/drawer";
import { useUserProfile } from "~/contexts/user-profile";
import { useBreakpoint } from "~/hooks/dom";
import { useTranslate } from "~/i18n";
import { useRootLoader } from "~/root";
import type { CheckinStats } from "~/routes/_api/basic/checkin";
import { useDialogStore } from "~/store";

export function CheckinDialog() {
  const t = useTranslate();
  const { user, reload: reloadUserInfo } = useUserProfile();

  const [_, { isMobile }] = useBreakpoint();
  const queryClient = useQueryClient();

  const visible = useDialogStore((state) => state.visibleCheckinDialog);
  const setVisible = useDialogStore((state) => state.setVisibleCheckinDialog);

  const handleClose = () => setVisible(false);

  // 使用 useQuery 获取签到状态
  const { data: stats, isLoading: isLoadingStats } = useQuery({
    queryKey: ["checkin-status"],
    queryFn: getCheckinStatus,
    enabled: !!user, // 只有当对话框打开时才请求
    staleTime: 5 * 60 * 1000, // 5分钟内数据保持新鲜
  });

  // 使用 useMutation 处理签到
  const checkinMutation = useMutation({
    mutationFn: performCheckin,
    onSuccess: (data) => {
      if (!stats) {
        queryClient.invalidateQueries({ queryKey: ["checkin-status"] });
      } else {
        // 签到成功后，直接更新缓存中的签到状态，避免重新请求期间的重复点击问题
        queryClient.setQueryData<CheckinStats>(["checkin-status"], () => {
          // 根据签到返回的数据更新状态
          return {
            has_checked_in_today: true,
            consecutive_days: data.consecutive_days,
            total_days: stats.total_days + 1,
            last_checkin_date: data.today,
          };
        });
      }

      // 更新用户信息（积分等）
      reloadUserInfo();
    },
    onError: (error) => {
      console.error("Checkin Fail:", error);
    },
  });

  if (isMobile) {
    return (
      <Drawer open={visible} onOpenChange={handleClose}>
        <DrawerContent
          className="md:hidden border-none bg-transparent"
          onOpenAutoFocus={(e) => e.preventDefault()}
        >
          <div className="relative">
            <div
              className={clsx(
                "absolute inset-x-0 -top-6.5 xs:-top-10 xs:pt-px sm:-top-11 flex items-center justify-center"
              )}
            >
              <Image
                className="max-w-80 xs:max-w-120 sm:max-w-132"
                src="https://cdn.ocmaker.app/assets/daily-checkin.webp"
              />
            </div>
            {isLoadingStats ? (
              <div className="bg-base-100 rounded-t-2xl md:rounded-2xl px-6 pt-8 sm:pt-12 pb-6">
                <div className="text-center py-12">
                  <Ring2 color="#ef4444" size={32} stroke={3} />
                  <p className="text-base-content/70 mt-4">
                    {t("dialogs.checkin.status.loading")}
                  </p>
                </div>
              </div>
            ) : (
              <CheckinContent
                stats={stats}
                isLoading={checkinMutation.isPending}
                onCheckin={() => checkinMutation.mutate()}
              />
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
        className="max-mdhidden !max-w-2xl p-0 border-none bg-transparent"
      >
        <div className="relative">
          <div className="absolute inset-x-0 -top-11 pt-px flex items-center justify-center">
            <Image
              className="max-w-132"
              src="https://cdn.ocmaker.app/assets/daily-checkin.webp"
            />
          </div>
          {isLoadingStats ? (
            <div className="bg-base-100 rounded-t-2xl md:rounded-2xl px-6 pt-8 sm:pt-12 pb-6">
              <div className="text-center py-12">
                <Ring2 color="#ef4444" size={32} stroke={3} />
                <p className="text-base-content/70 mt-4">
                  {t("dialogs.checkin.status.loading")}
                </p>
              </div>
            </div>
          ) : (
            <CheckinContent
              stats={stats}
              isLoading={checkinMutation.isPending}
              onCheckin={() => checkinMutation.mutate()}
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

interface CheckinContentProps {
  stats?: CheckinStats;
  isLoading: boolean;
  onCheckin: () => void;
}

function CheckinContent({ stats, isLoading, onCheckin }: CheckinContentProps) {
  const t = useTranslate();
  const rootData = useRootLoader();
  const minCredits = rootData?.CHECKIN_MIN_CREDITS || 5;
  const maxCredits = rootData?.CHECKIN_MAX_CREDITS || 10;
  const streakBonus = rootData?.CHECKIN_STREAK_BONUS || 30;

  // 生成7天签到奖励数据
  const checkinRewards = [
    { day: 1, type: "credit" },
    { day: 2, type: "credit" },
    { day: 3, type: "credit" },
    { day: 4, type: "credit" },
    { day: 5, type: "credit" },
    { day: 6, type: "credit" },
    { day: 7, type: "gift" },
  ];

  const hasCheckedInToday = stats?.has_checked_in_today || false;
  const consecutiveDays = stats?.consecutive_days ?? 0;

  // 计算当前进度天数（要签到的天数）
  // 如果今天已签到，当前进度就是 consecutiveDays
  // 如果今天未签到，当前进度是 consecutiveDays + 1（下一个要签的天）
  const currentProgressDay = hasCheckedInToday
    ? consecutiveDays
    : consecutiveDays + 1;

  // 用于显示的连续签到天数
  const displayConsecutiveDays = consecutiveDays;

  return (
    <div className="bg-base-100 rounded-t-2xl md:rounded-2xl px-6 pt-8 sm:pt-12 pb-6">
      {/* 标题和描述 */}
      <div className="text-center">
        <h2 className="text-xl sm:text-2xl font-bold max-w-sm mx-auto mb-2 sm:mb-4">
          {t("dialogs.checkin.streak.title", { bonus: streakBonus })}
        </h2>

        <p className="text-sm sm:text-base text-base-content/70">
          {t("dialogs.checkin.streak.description", {
            days: `${displayConsecutiveDays} ${displayConsecutiveDays !== 1 ? "days" : "day"}`,
            minCredits,
            maxCredits,
          })}
        </p>
      </div>

      {/* 7天签到网格 */}
      <div className="grid grid-cols-4 sm:grid-cols-7 gap-2 my-4 sm:my-6">
        {checkinRewards.map((reward) => {
          // 判断是否已签到：已签到的天数是 1 到 consecutiveDays
          const isChecked = reward.day <= consecutiveDays;

          // 判断是否为当前可签到的天数
          const isCurrentAvailable =
            !hasCheckedInToday && reward.day === currentProgressDay;

          // 判断图标是否高亮（已签到或当前可签到）
          const isHighlighted = isChecked || isCurrentAvailable;

          return (
            <div
              key={reward.day}
              className={clsx(
                "rounded bg-base-200 px-2 py-4",
                "flex flex-col items-center justify-center gap-1"
              )}
            >
              {reward.type === "gift" ? (
                <div
                  className={clsx(
                    "h-11 flex items-center justify-center",
                    "text-base-content/60 aria-checked:text-[#f3ac3c]"
                  )}
                  aria-checked={isHighlighted}
                >
                  <Gift className={clsx("size-11")} />
                </div>
              ) : (
                <div
                  className={clsx(
                    "bg-base-300 text-base-content/80 group",
                    "aria-checked:bg-gradient-to-b from-[#fced62] to-[#f3ac3c]",
                    "aria-checked:text-yellow-800",
                    "size-11 rounded-full flex items-center justify-center"
                  )}
                  aria-checked={isHighlighted}
                >
                  <div
                    className={clsx(
                      "border-[1.5px] border-grid-border aria-checked:border-yellow-800/40",
                      "size-9 rounded-full flex items-center justify-center"
                    )}
                    aria-checked={isHighlighted}
                  >
                    <DollarSign size={20} />
                  </div>
                </div>
              )}
              <div className="h-5 flex items-center justify-center overflow-hidden">
                {isChecked ? (
                  <Check className="text-green-500 size-6" />
                ) : (
                  <span
                    className={`text-sm ${
                      isCurrentAvailable
                        ? "text-base-content"
                        : "text-base-content/50"
                    }`}
                  >
                    {t("dialogs.checkin.status.day", { day: reward.day })}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex items-center justify-center">
        <button
          onClick={onCheckin}
          disabled={hasCheckedInToday || isLoading}
          className="btn btn-lg h-12 text-xl font-medium rounded-full w-80 bg-red-500 hover:bg-red-400 disabled:cursor-not-allowed"
        >
          {isLoading && <Ring2 color="white" size={24} stroke={3} />}
          {hasCheckedInToday
            ? t("dialogs.checkin.button.done")
            : isLoading
              ? t("dialogs.checkin.button.checking")
              : t("dialogs.checkin.button.checkin")}
        </button>
      </div>
    </div>
  );
}
