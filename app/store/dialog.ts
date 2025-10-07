import { create } from "zustand";

interface DialogStore {
  // 套餐升级相关 Dialog
  visibleUpgradeDialog: boolean;
  upgradeDialogType: "basic" | "credits" | "features";
  setVisibleUpgradeDialog: (
    value: boolean,
    type?: this["upgradeDialogType"],
  ) => void;
  // 登录相关 Dialog
  visibleLoginDialog: boolean;
  loginDialogType: "basic" | "before-create";
  setVisibleLoginDialog: (
    value: boolean,
    type?: this["loginDialogType"],
  ) => void;
  // 签到相关 Dialog
  visibleCheckinDialog: boolean;
  setVisibleCheckinDialog: (value: boolean) => void;
  // 邀请相关 Dialog
  visibleInviteDialog: boolean;
  setVisibleInviteDialog: (value: boolean) => void;
  // Task 盒子
  visibleTaskBoxDialog: boolean;
  setVisibleTaskBoxDialog: (value: boolean) => void;
}

export const useDialogStore = create<DialogStore>((set) => {
  return {
    visibleUpgradeDialog: false,
    upgradeDialogType: "basic",
    loginDialogType: "basic",
    setVisibleUpgradeDialog: (value, type = "basic") =>
      set({ visibleUpgradeDialog: value, upgradeDialogType: type }),
    visibleLoginDialog: false,
    setVisibleLoginDialog: (value, type = "basic") =>
      set({ visibleLoginDialog: value, loginDialogType: type }),
    visibleCheckinDialog: false,
    setVisibleCheckinDialog: (value) => set({ visibleCheckinDialog: value }),
    visibleInviteDialog: false,
    setVisibleInviteDialog: (value) => set({ visibleInviteDialog: value }),
    visibleTaskBoxDialog: false,
    setVisibleTaskBoxDialog: (value) => set({ visibleTaskBoxDialog: value }),
  };
});
