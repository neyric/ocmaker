import clsx from "clsx";
import { useTranslate } from "~/i18n";

interface Example {
  title: string;
  description: string;
  prompt: string;
}

interface ProfileGeneratorExamplesProps extends React.ComponentProps<"div"> {
  onChoose: (example: Example) => void;
  examples: Example[];
}

export function ProfileGeneratorExamples({
  onChoose,
  examples,
  className,
  ...props
}: ProfileGeneratorExamplesProps) {
  const t = useTranslate();

  return (
    <div className={clsx(className)} {...props}>
      <div className="mb-4 space-y-1">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-base-content/70">
          {t("maker.generator.exampleTitle")}
        </h3>
        <p className="text-sm text-base-content/70">
          {t("maker.generator.exampleDescription")}
        </p>
      </div>
      <div className="grid gap-3 grid-cols-2">
        {examples.map((example, index) => (
          <button
            key={index}
            type="button"
            className="group flex h-full flex-col gap-2 rounded-lg border border-grid-border cursor-pointer bg-base-100 p-4 text-left transition hover:border-primary/60 hover:shadow-sm"
            onClick={() => onChoose(example)}
          >
            <p className="text-base font-medium text-base-content">
              {example.title}
            </p>
            <p className="text-sm text-base-content/70">
              {example.description}
            </p>
            <div className="grow" />
            <p className="text-sm text-primary/80 group-hover:text-primary">
              {t("maker.generator.exampleButton")}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
}
