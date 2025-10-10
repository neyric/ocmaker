import { useMutation } from "@tanstack/react-query";
import clsx from "clsx";
import { useState } from "react";
import { toast } from "sonner";
import { generateOCProfile } from "~/api/generator/oc-profile";
import type { GeneratePromptResult } from "~/routes/_api/basic/_ai.generate.prompt/route";
import type { ProfileGeneratorDTO } from "~/schema/generator";
import { ProfileGeneratorExamples } from "./examples";
import { ProfileGeneratorForm } from "./form";
import { ProfileGeneratorPreview } from "./preview";
import { useProfileGeneratorForm } from "./use-form";

interface Example {
  title: string;
  description: string;
  prompt: string;
}
export interface ProfileGeneratorProps extends React.ComponentProps<"div"> {
  genId: string;
  examples: Array<Example>;
}

export function ProfileGenerator({
  genId,
  examples,
  className,
  ...props
}: ProfileGeneratorProps) {
  const defaultPrompt = examples?.[0]?.prompt ?? "";
  const examplesList = examples?.slice(1, 5) ?? [];

  const form = useProfileGeneratorForm({
    id: genId,
    prompt: defaultPrompt,
  });
  const [preview, setPreview] = useState<GeneratePromptResult | null>(null);

  const { data, isError, error, status, isPending, mutate } = useMutation({
    mutationFn: generateOCProfile,
    onSuccess: (data) => {
      console.log("data", data);
      // setPreview(data);
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  const handleGenerate = (values: ProfileGeneratorDTO) => {
    // console.log("values", values);
    mutate(values);
  };

  const handleSelectExample = (example: Example) => {
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
        isGenerating={isPending}
      />
      {status === "idle" ? (
        <ProfileGeneratorExamples
          className="flex-1 min-w-0 w-full"
          examples={examplesList}
          onChoose={handleSelectExample}
        />
      ) : (
        <ProfileGeneratorPreview
          className="flex-1 min-w-0 w-full lg:max-h-96 overflow-y-auto"
          isLoading={isPending}
          result={data?.node}
          isError={isError}
          errorMessage={error?.message}
        />
      )}
    </div>
  );
}
