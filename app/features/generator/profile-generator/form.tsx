import clsx from "clsx";
import { Eraser } from "lucide-react";
import { ZapFill } from "~/components/icons";
import { useTranslate } from "~/i18n";
import type { ProfileGeneratorDTO } from "~/schema/generator";
import type { ProfileGeneratorFormMethod } from "./use-form";

interface ProfileGeneratorFormProps extends React.ComponentProps<"div"> {
  form: ProfileGeneratorFormMethod;
  onGenerate: (values: ProfileGeneratorDTO) => void;
  isGenerating?: boolean;
  defaultPrompt: string;
}

export function ProfileGeneratorForm({
  form,
  onGenerate,
  isGenerating = false,
  defaultPrompt,
  className,
  ...props
}: ProfileGeneratorFormProps) {
  const t = useTranslate();

  const errorMessage = form.formState.errors.prompt?.message;

  return (
    <div
      className={clsx(
        "rounded-xl border border-grid-border bg-base-100 p-3 sm:p-4",
        className
      )}
      {...props}
    >
      <form
        onSubmit={form.handleSubmit(onGenerate)}
        className="flex flex-col gap-3 sm:gap-4 h-full"
      >
        <div className="flex flex-col flex-1 min-h-0 gap-2">
          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="profile-generator-prompt"
                className="text-sm font-medium text-base-content flex-1 min-w-0"
              >
                {t("maker.generator.describe")}
              </label>
              <button
                className="btn btn-ghost btn-xs"
                type="button"
                onClick={() => form.setValue("prompt", "")}
              >
                <Eraser className="size-4" />
                {t("maker.generator.exampleClear")}
              </button>
            </div>
            <p className="label text-sm whitespace-normal">
              {t("maker.generator.description")}
            </p>
          </div>
          <textarea
            id="profile-generator-prompt"
            rows={8}
            className="textarea textarea-bordered flex-1 min-h-48 md:min-h-64 w-full"
            placeholder={t("maker.generator.placeholder")}
            defaultValue={defaultPrompt}
            {...form.register("prompt")}
          />
          {errorMessage && <p className="text-sm text-error">{errorMessage}</p>}
        </div>

        <button
          type="submit"
          className="btn btn-primary btn-lg"
          disabled={isGenerating}
        >
          {isGenerating && (
            <span className="loading loading-spinner loading-sm" aria-hidden />
          )}

          <span>
            {isGenerating
              ? t("maker.generator.exampleGenerating")
              : t("maker.generator.exampleGenerator")}
          </span>
          {!isGenerating && (
            <span className="bg-primary-content text-primary badge gap-1">
              <ZapFill />
              Free
            </span>
          )}
        </button>
      </form>
    </div>
  );
}
