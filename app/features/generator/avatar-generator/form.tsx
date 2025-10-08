import clsx from "clsx";
import { PartyPopper, WandSparkles } from "lucide-react";
import { ZapFill } from "~/components/icons";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";

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
          <div className="textarea px-0 pb-0 block w-full text-sm disabled:opacity-50 focus-within:outline-none">
            <textarea
              rows={8}
              id="profile-generator-prompt"
              {...form.register("prompt")}
              className="px-2 pb-2 resize-none w-full"
              placeholder="Describe the video effect you want, for example: make water ripple in the image, add particle effects, etc..."
            />
            <div className="w-full h-px bg-grid-border" />
            <div className="p-2 flex justify-between">
              <button className="btn btn-xs btn-primary btn-ghost">
                <PartyPopper className="size-4" />
                Randomize
              </button>

              <div className="flex items-center space-x-2">
                <label
                  htmlFor="ai-optimize"
                  className="text-xs flex items-center gap-2 cursor-pointer select-none"
                >
                  <WandSparkles className="size-4 text-primary" />
                  AI Optimize
                </label>
                <input
                  id="ai-optimize"
                  type="checkbox"
                  // checked="checked"
                  className="toggle toggle-sm checked:border-primary checked:bg-primary checked:text-primary-content"
                />
              </div>
            </div>
          </div>

          <div className="mb-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="btn btn-sm btn-primary btn-dash">
                  Gender
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="start"
                sideOffset={6}
                className="w-full max-w-88"
              >
                <div className="flex flex-wrap gap-3">
                  <button className="btn btn-outline btn-primary btn-sm">
                    Outline
                  </button>
                  <button className="btn btn-outline btn-primary btn-sm">
                    Outline
                  </button>
                  <button className="btn btn-outline btn-primary btn-sm">
                    Outline
                  </button>
                  <button className="btn btn-outline btn-primary btn-sm">
                    Outline
                  </button>
                  <button className="btn btn-outline btn-primary btn-sm">
                    Outline
                  </button>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
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
