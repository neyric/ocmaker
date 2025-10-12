import clsx from "clsx";
import { ZapFill } from "~/components/icons";
import { useTranslate } from "~/i18n";
import type { ProfileGeneratorDTO } from "~/schema/generator";
import type { ProfileGeneratorFormMethod } from "./use-form";

interface ProfileGeneratorFormProps extends React.ComponentProps<"div"> {
  form: ProfileGeneratorFormMethod;
  onGenerate: (values: ProfileGeneratorDTO) => void;
  isGenerating?: boolean;
}

export function ProfileGeneratorForm({
  form,
  onGenerate,
  isGenerating = false,
  className,
  ...props
}: ProfileGeneratorFormProps) {
  const t = useTranslate();

  const errorMessage = form.formState.errors.prompt?.message;

  return (
    <div
      className={clsx(
        "rounded-xl border border-grid-border bg-base-100 p-3 sm:p-4",
        className,
      )}
      {...props}
    >
      <form
        onSubmit={form.handleSubmit(onGenerate)}
        className="flex flex-col gap-3 sm:gap-4 h-full"
      >
        <div className="flex flex-col flex-1 min-h-0 gap-2">
          <label
            htmlFor="profile-generator-prompt"
            className="text-sm font-medium text-base-content"
          >
            {t("maker.generator.describe")}
          </label>
          <textarea
            id="profile-generator-prompt"
            rows={8}
            className="textarea textarea-bordered flex-1 min-h-48 md:min-h-64 w-full"
            placeholder={t("maker.generator.placeholder")}
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
