import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Ring2 } from "ldrs/react";
import { Camera } from "lucide-react";
import { forwardRef, useImperativeHandle, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import type { z } from "zod";
import { updateProfile } from "~/api/user";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "~/components/ui/drawer";
import { useBreakpoint } from "~/hooks/dom";
import { useTranslate } from "~/i18n";
import { updateProfileSchema } from "~/schema/profile";

export interface EditProfileDialogRef {
  open: (user: UserInfo) => void;
  close: () => void;
}

export interface EditProfileDialogProps {
  onSuccess?: (user: UserInfo) => void;
}

type ProfileFormData = z.infer<typeof updateProfileSchema>;

export const EditProfileDialog = forwardRef<
  EditProfileDialogRef,
  EditProfileDialogProps
>(({ onSuccess }, ref) => {
  const t = useTranslate();

  const [open, setOpen] = useState(false);
  const [breakpoint] = useBreakpoint();
  const isMobile = breakpoint === "xs" || breakpoint === "sm";

  const [user, setUser] = useState<UserInfo>();

  const form = useForm<ProfileFormData>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: {
      username: "",
      nickname: "",
      bio: "",
      avatar: null,
    },
  });

  const [avatar] = form.watch(["avatar"]);
  const avatarUrl = useMemo(() => {
    if (!user && !avatar) return null;
    if (!avatar) return user?.avatar ?? null;
    return URL.createObjectURL(avatar);
  }, [avatar, user]);

  // 使用 useMutation 处理更新请求
  const updateProfileMutation = useMutation({
    mutationFn: updateProfile,
    onSuccess: async (data) => {
      onSuccess?.(data);
      setOpen(false);
    },
    onError: (error: Error) => {
      console.error("Error updating profile:", error);
      toast.error(error.message || "Failed to update profile");
    },
  });

  useImperativeHandle(ref, () => ({
    open: (user) => {
      setUser(user);
      setOpen(true);
      form.reset({
        username: user.user_name ?? "",
        nickname: user.name,
        bio: user.bio,
        avatar: null,
      });
    },
    close: () => setOpen(false),
  }));

  const onSubmit = (data: ProfileFormData) => {
    updateProfileMutation.mutate(data);
  };

  const FormContent = () => (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <div className="flex flex-col justify-center items-center gap-3 mb-4">
        <div className="relative group">
          <div className="avatar">
            <div className="w-24 rounded-full">
              {avatarUrl ? (
                <img src={avatarUrl} alt={user?.name} />
              ) : (
                <div className="bg-neutral text-neutral-content w-24 h-24 flex items-center justify-center text-2xl rounded-full">
                  {user?.name?.charAt(0)?.toUpperCase() || "U"}
                </div>
              )}
            </div>
          </div>
          <label
            htmlFor="avatar-upload"
            className="absolute inset-0 flex items-center justify-center rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer backdrop-blur-sm bg-black/50"
          >
            <Camera className="w-6 h-6 text-white" />
          </label>
          <input
            id="avatar-upload"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                form.setValue("avatar", file);
              }
            }}
          />
        </div>
        <p className="label text-sm">{t("profile.edit.avatarDesc")}</p>
        {form.formState.errors.avatar && (
          <span className="text-error text-sm">
            {form.formState.errors.avatar.message}
          </span>
        )}
      </div>

      <fieldset className="fieldset">
        <legend className="fieldset-legend">
          {t("profile.edit.nickname")}
        </legend>
        <input
          type="text"
          placeholder={t("profile.edit.nicknamePlaceholder")}
          className="input w-full"
          {...form.register("nickname")}
        />
        <p className="label">{t("profile.edit.nicknameDesc")}</p>
        {form.formState.errors.nickname && (
          <span className="text-error text-sm">
            {form.formState.errors.nickname.message}
          </span>
        )}
      </fieldset>

      <fieldset className="fieldset">
        <legend className="fieldset-legend">
          {t("profile.edit.username")}
        </legend>
        <input
          type="text"
          placeholder={t("profile.edit.usernamePlaceholder")}
          className="input w-full"
          {...form.register("username")}
        />
        {form.formState.errors.username && (
          <span className="text-error text-sm">
            {form.formState.errors.username.message}
          </span>
        )}
      </fieldset>

      <fieldset className="fieldset">
        <legend className="fieldset-legend">{t("profile.edit.bio")}</legend>
        <textarea
          placeholder={t("profile.edit.bioPlaceholder")}
          className="textarea textarea-bordered h-24 w-full"
          rows={4}
          {...form.register("bio")}
        />
        {form.formState.errors.bio && (
          <span className="text-error text-sm">
            {form.formState.errors.bio.message}
          </span>
        )}
      </fieldset>

      {/* Submit buttons */}
      <div className="flex gap-3 mt-4 justify-end">
        <button
          type="button"
          className="btn flex-1 min-w-0"
          onClick={() => setOpen(false)}
          disabled={updateProfileMutation.isPending}
        >
          {t("profile.edit.cancel")}
        </button>
        <button
          type="submit"
          className="btn btn-primary flex-1 min-w-0"
          disabled={updateProfileMutation.isPending}
        >
          {updateProfileMutation.isPending && (
            <Ring2 size={16} stroke={3} color="white" />
          )}
          {t("profile.edit.confirm")}
        </button>
      </div>
    </form>
  );

  // Mobile uses Drawer
  if (isMobile) {
    return (
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerContent
          className="px-4 pb-6"
          onOpenAutoFocus={(e) => e.preventDefault()}
        >
          <DrawerHeader>
            <DrawerTitle>{t("profile.edit.title")}</DrawerTitle>
            <DrawerDescription>
              {t("profile.edit.description")}
            </DrawerDescription>
          </DrawerHeader>
          <div className="mt-4">
            <FormContent />
          </div>
        </DrawerContent>
      </Drawer>
    );
  }

  // Desktop uses Dialog
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        className="sm:max-w-md"
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>{t("profile.edit.title")}</DialogTitle>
          <DialogDescription>{t("profile.edit.description")}</DialogDescription>
        </DialogHeader>
        <FormContent />
      </DialogContent>
    </Dialog>
  );
});

EditProfileDialog.displayName = "EditProfileDialog";
