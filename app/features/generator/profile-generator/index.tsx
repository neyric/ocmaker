import { useMutation } from "@tanstack/react-query";
import clsx from "clsx";
import { useState } from "react";
import { toast } from "sonner";
import { generatePrompt } from "~/api/generator/prompt";
import type { ProfileGeneratorExample } from "~/data/profile-generator";
import type { GeneratePromptResult } from "~/routes/_api/basic/_ai.generate.prompt/route";
import type { ProfileGeneratorFormValues } from "~/schema/generator/profile-generator";
import { ProfileGeneratorExamples } from "./examples";
import { ProfileGeneratorForm } from "./form";
import { ProfileGeneratorPreview } from "./preview";
import { useProfileGeneratorForm } from "./use-form";

export interface ProfileGeneratorProps extends React.ComponentProps<"div"> {}

export function ProfileGenerator({
  className,
  ...props
}: ProfileGeneratorProps) {
  const form = useProfileGeneratorForm();
  const [preview, setPreview] = useState<GeneratePromptResult | null>(null);

  const mutation = useMutation({
    mutationFn: generatePrompt,
    onSuccess: (data) => {
      setPreview(data);
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  const handleGenerate = (values: ProfileGeneratorFormValues) => {
    mutation.mutate({ type: "text", input: values.prompt });
  };

  const handleSelectExample = (example: ProfileGeneratorExample) => {
    form.clearErrors("prompt");
    form.setValue("prompt", example.prompt, {
      shouldDirty: true,
      shouldTouch: true,
    });
    form.setFocus("prompt");
  };

  return (
    <div
      className={clsx(
        "flex max-lg:flex-col gap-4 xl:max-w-6xl mx-auto",
        className
      )}
      {...props}
    >
      <ProfileGeneratorForm
        className="flex-1 min-w-0 w-full"
        form={form}
        onGenerate={handleGenerate}
        isGenerating={mutation.isPending}
      />
      <ProfileGeneratorExamples
        className="flex-1 min-w-0 w-full"
        onChoose={handleSelectExample}
      />
      {/* <ProfileGeneratorPreview
          isLoading={mutation.isPending}
          result={preview?.prompt}
          original={preview?.original}
        /> */}
    </div>
  );
}
