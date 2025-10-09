import clsx from "clsx";
import { PartyPopper, WandSparkles } from "lucide-react";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { useTranslate } from "~/i18n";
import type { AvatarGeneratorDTO } from "~/schema/generator";
import { type Option } from "./index";
import type { ProfileGeneratorFormMethod } from "./use-form";

interface ProfileGeneratorFormProps extends React.ComponentProps<"div"> {
  form: ProfileGeneratorFormMethod;
  options: Option[];
  onGenerate: (values: AvatarGeneratorDTO) => void;
  isGenerating?: boolean;
}

export function ProfileGeneratorForm({
  form,
  onGenerate,
  isGenerating = false,
  className,
  options,
  ...props
}: ProfileGeneratorFormProps) {
  const t = useTranslate();
  const aiOptimize = form.watch("aiOptimize");

  const hanldeOptionClick = (option: Option, value: string) => {
    const { options, prompt } = form.getValues();
    const prevValue = options[option.key] || null;
    const prompts = prompt
      ? prompt
          .split(",")
          .map((value) => value.trim())
          .filter(Boolean)
      : [];

    if (!prevValue) {
      if (!value) return;
      options[option.key] = value;
      prompts.push(value, "");
      form.setValue("options", options);
      form.setValue("prompt", prompts.join(", "));
    } else {
      if (!value) {
        options[option.key] = "";
        form.setValue("options", options);

        const newPrompts = prompts.filter((prompt) => prompt !== prevValue);
        if (newPrompts.length === prompts.length) {
          return;
        } else {
          newPrompts.push("");
          form.setValue("prompt", newPrompts.join(", "));
        }
      } else {
        options[option.key] = value;
        let newPrompts = Array.from(prompts);
        const oldIndex = newPrompts.findIndex((prompt) => prompt === prevValue);
        if (oldIndex !== -1) {
          newPrompts[oldIndex] = value;
        } else {
          newPrompts.push(value, "");
        }

        form.setValue("options", options);
        form.setValue("prompt", newPrompts.join(", "));
      }
    }
  };

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
            {t("maker.generator.ocTitle")}
          </label>
          <div className="textarea px-0 pb-0 block w-full text-sm disabled:opacity-50 focus-within:outline-none">
            <textarea
              rows={8}
              id="profile-generator-prompt"
              {...form.register("prompt")}
              className="px-2 pb-2 resize-none w-full"
              placeholder={t("maker.generator.ocPlaceholder")}
            />
            <div className="w-full h-px bg-grid-border" />
            <div className="p-2 flex justify-between">
              <button
                className="btn btn-xs btn-primary btn-ghost"
                type="button"
              >
                <PartyPopper className="size-4" />
                {t("maker.generator.ocRandomize")}
              </button>

              <div className="flex items-center space-x-2">
                <label
                  htmlFor="ai-optimize"
                  className="text-xs flex items-center gap-2 cursor-pointer select-none"
                >
                  <WandSparkles className="size-4 text-primary" />
                  {t("maker.generator.ocAiOptimize")}
                </label>
                <input
                  id="ai-optimize"
                  type="checkbox"
                  checked={aiOptimize}
                  onChange={() => form.setValue("aiOptimize", !aiOptimize)}
                  className="toggle toggle-sm checked:border-primary checked:bg-primary checked:text-primary-content"
                />
              </div>
            </div>
          </div>

          <div className="mb-4">
            {options.map((option) => (
              <OptionItem
                item={option}
                key={option.key}
                onClick={(value) => hanldeOptionClick(option, value)}
              />
            ))}
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
          <span>
            {isGenerating
              ? t("maker.generator.ocGenerating")
              : t("maker.generator.ocGenerator")}
          </span>
        </button>
      </form>
    </div>
  );
}

interface OptionItemProps {
  item: Option;
  onClick: (value: string) => void;
}
function OptionItem({ item, onClick }: OptionItemProps) {
  const [open, setOpen] = useState(false);

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <button className="btn btn-sm btn-primary btn-dash" type="button">
          {item.title}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="start"
        sideOffset={6}
        className="w-full max-w-88"
      >
        <div className="flex flex-wrap gap-2">
          {item.data.map((data, index) => (
            <button
              type="button"
              key={`${item.key}__${index}`}
              className="btn btn-outline btn-primary btn-sm h-6.5 px-4"
              onClick={() => onClick(data.value)}
            >
              {data.label}
            </button>
          ))}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
