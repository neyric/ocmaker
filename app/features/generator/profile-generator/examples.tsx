import clsx from "clsx";
import {
  type ProfileGeneratorExample,
  profileGeneratorExamples,
} from "~/data/profile-generator";

interface ProfileGeneratorExamplesProps extends React.ComponentProps<"div"> {
  onChoose: (example: ProfileGeneratorExample) => void;
  examples?: ProfileGeneratorExample[];
}

export function ProfileGeneratorExamples({
  onChoose,
  examples = profileGeneratorExamples,
  className,
  ...props
}: ProfileGeneratorExamplesProps) {
  return (
    <div className={clsx(className)} {...props}>
      <div className="mb-4 space-y-1">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-base-content/70">
          Quick starters
        </h3>
        <p className="text-sm text-base-content/70">
          Click to load an example prompt and tweak it before generating.
        </p>
      </div>
      <div className="grid gap-3 grid-cols-2">
        {examples.map((example) => (
          <button
            key={example.id}
            type="button"
            className="group flex h-full flex-col gap-2 rounded-lg border border-grid-border cursor-pointer bg-base-100 p-4 text-left transition hover:border-primary/60 hover:shadow-sm"
            onClick={() => onChoose(example)}
          >
            <span className="text-base font-medium text-base-content">
              {example.title}
            </span>
            <span className="text-sm text-base-content/70">
              {example.description}
            </span>
            <span className="text-sm text-primary/80 group-hover:text-primary">
              Use this example
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
