import { useMutation } from "@tanstack/react-query";
import { forwardRef, useImperativeHandle, useState } from "react";
import { toast } from "sonner";
import { submitGhostFace } from "~/api/generator/ghost-face";
import { Dialog, DialogContent } from "~/components/ui/dialog";
import { Drawer, DrawerContent } from "~/components/ui/drawer";
import { useUserProfile } from "~/contexts/user-profile";
import { useBreakpoint } from "~/hooks/dom";
import { useDialogStore, useTasksStore } from "~/store";
import { findClosestAspectRatio } from "~/utils/image-aspect-ratio";
import { FotoProfissionalForm } from "./form";
import { useFPForm } from "./use-form";

export interface FotoProfissionalItem {
  id: string;
  type: string;
  image: string;
}

export interface FotoProfissionalRef {
  open: (file: File) => void;
}

export interface FotoProfissionalProps {
  fotoProfissionalList: FotoProfissionalItem[];
}

export const FotoProfissional = forwardRef<
  FotoProfissionalRef,
  FotoProfissionalProps
>(({ fotoProfissionalList }, ref) => {
  const { user, credits, reload } = useUserProfile();

  const setVisibleLoginDialog = useDialogStore(
    (state) => state.setVisibleLoginDialog,
  );
  const setVisibleUpgradeDialog = useDialogStore(
    (state) => state.setVisibleUpgradeDialog,
  );
  const setVisibleTaskBoxDialog = useDialogStore(
    (state) => state.setVisibleTaskBoxDialog,
  );
  const addTask = useTasksStore((state) => state.addTask);

  const form = useFPForm();
  const [_, { isMobile }] = useBreakpoint();
  const [isOpen, setIsOpen] = useState(false);

  // useMutation hook for submitting foto profissional
  const mutation = useMutation({
    mutationFn: submitGhostFace,
    onSuccess: (data) => {
      reload();
      data.reverse().forEach((item) => {
        addTask(item);
      });
      setVisibleTaskBoxDialog(true);

      handleClose();
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  useImperativeHandle(
    ref,
    () => ({
      open: async (file: File) => {
        // Check if file is an image
        if (!file.type.startsWith("image/")) {
          console.error("File is not an image type:", file.type);
          return;
        }
        const aspect = await findClosestAspectRatio(file);

        form.setValue("image", file);
        form.setValue("aspect", aspect);
        form.setValue("effectIds", [] as string[]);

        setIsOpen(true);
      },
    }),
    [form],
  );

  const handleClose = () => {
    setIsOpen(false);
    form.reset();
  };

  const handleSubmit = form.handleSubmit(async (data) => {
    if (!user) {
      setVisibleLoginDialog(true, "before-create");
      return;
    }
    if (data.effectIds.length > credits) {
      setVisibleUpgradeDialog(true, "credits");
      return;
    }
    mutation.mutate(data);
  });
  if (isMobile) {
    return (
      <Drawer open={isOpen} onOpenChange={setIsOpen}>
        <DrawerContent
          className="border-none bg-transparent p-0"
          onOpenAutoFocus={(e) => e.preventDefault()}
        >
          <div className="bg-base-100 rounded-t-xl overflow-hidden">
            <FotoProfissionalForm
              form={form}
              fotoProfissionalList={fotoProfissionalList}
              onCancel={handleClose}
              onSubmit={handleSubmit}
            />
            {mutation.isPending && (
              <div className="absolute inset-0 bg-base-100/80 flex items-center justify-center z-30">
                <div className="loading loading-spinner loading-lg" />
              </div>
            )}
          </div>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent
        withCloseButton={false}
        onOpenAutoFocus={(e) => e.preventDefault()}
        className="sm:max-w-xl md:max-w-3xl lg:max-w-4xl xl:max-w-5xl border-none bg-transparent"
      >
        <div className="bg-base-100 rounded-xl overflow-hidden max-h-80vh relative">
          <FotoProfissionalForm
            form={form}
            fotoProfissionalList={fotoProfissionalList}
            onCancel={handleClose}
            onSubmit={handleSubmit}
          />
          {mutation.isPending && (
            <div className="absolute inset-0 bg-base-100/80 flex items-center justify-center z-30 rounded-2xl">
              <div className="loading loading-spinner loading-lg" />
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
});

FotoProfissional.displayName = "FotoProfissional";
