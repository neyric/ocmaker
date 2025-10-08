import clsx from "clsx";
import type { ProfileGeneratorFormValues } from "~/schema/generator/profile-generator";
import type { ProfileGeneratorFormMethod } from "./use-form";

interface ProfileGeneratorFormProps extends React.ComponentProps<"div"> {
  form: ProfileGeneratorFormMethod;
  onGenerate: (values: ProfileGeneratorFormValues) => void;
  isGenerating?: boolean;
}

export function ProfileGeneratorForm({
  form,
  onGenerate,
  isGenerating = false,
  className,
  ...props
}: ProfileGeneratorFormProps) {
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
          <label
            htmlFor="profile-generator-prompt"
            className="text-sm font-medium text-base-content"
          >
            About Your OC
          </label>
          <textarea
            id="profile-generator-prompt"
            rows={8}
            className="textarea textarea-bordered flex-1 min-h-[12rem] w-full"
            placeholder="Example: Craft a friendly LinkedIn bio for a product designer leading AI-driven experiments..."
            {...form.register("prompt")}
          />
          {errorMessage && <p className="text-sm text-error">{errorMessage}</p>}
        </div>

        <button
          type="submit"
          className="btn btn-primary"
          disabled={isGenerating}
        >
          {isGenerating && (
            <span className="loading loading-spinner loading-sm" aria-hidden />
          )}
          <span>Generator</span>
        </button>
      </form>
    </div>
  );
}
