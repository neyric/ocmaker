import { useMutation, useQuery } from "@tanstack/react-query";
import clsx from "clsx";
import { useRef } from "react";
import { toast } from "sonner";
import { calculatorCredits, type Task } from "~/api/generator";
import { generateOCImage } from "~/api/generator/oc-image";
import { useUserProfile } from "~/contexts/user-profile";
import type { AvatarGeneratorDTO } from "~/schema/generator";
import { useDialogStore } from "~/store";
import { useTasks, useTasksStore } from "~/store/tasks";
import { ProfileGeneratorForm } from "./form";
import { ProfileGeneratorPreview } from "./preview";

import { useProfileGeneratorForm } from "./use-form";

export interface Option {
  key: string;
  title: string;
  unique?: boolean;
  data: Array<{ label: string; value: string }>;
}

export interface AvatarGeneratorProps extends React.ComponentProps<"div"> {
  genId: string;
  options: Array<Option>;
  previewBg?: string;
}

export function AvatarGenerator({
  className,
  genId,
  options,
  previewBg,
  ...props
}: AvatarGeneratorProps) {
  const { user, credits, setCredits } = useUserProfile();
  const setVisibleLoginDialog = useDialogStore(
    (state) => state.setVisibleLoginDialog,
  );
  const setVisibleUpgradeDialog = useDialogStore(
    (state) => state.setVisibleUpgradeDialog,
  );
  const addTask = useTasksStore((state) => state.addTask);
  const form = useProfileGeneratorForm({ id: genId });

  const { data } = useQuery({
    queryKey: ["oc-maker-credits"],
    queryFn: () => calculatorCredits(),
  });

  const mutation = useMutation({
    mutationFn: generateOCImage,
    onSuccess: (task) => {
      addTask(task);
      if (data) setCredits(credits - data.credits);
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  const handleGenerate = (values: AvatarGeneratorDTO) => {
    if (!user) {
      setVisibleLoginDialog(true, "before-create");
      return;
    }
    if (!data) return;
    if (credits < data.credits) {
      setVisibleUpgradeDialog(true, "credits");
      return;
    }
    mutation.mutate(values);
  };

  return (
    <div
      className={clsx(
        "flex max-lg:flex-col gap-4 xl:max-w-6xl mx-auto",
        className,
      )}
      {...props}
    >
      <ProfileGeneratorForm
        className="flex-1 min-w-0 w-full"
        form={form}
        options={options}
        onGenerate={handleGenerate}
        isGenerating={mutation.isPending}
        credits={data?.credits}
      />
      <ProfileGeneratorPreview
        className="flex-1 min-w-0 w-full"
        previewBg={previewBg}
      />
    </div>
  );
}
