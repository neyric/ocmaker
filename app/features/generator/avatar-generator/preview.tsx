import clsx from "clsx";
import { Image } from "~/components/common";
import {
  type ProfileGeneratorExample,
  profileGeneratorExamples,
} from "~/data/profile-generator";

interface ProfileGeneratorPreviewProps extends React.ComponentProps<"div"> {
  onChoose: (example: ProfileGeneratorExample) => void;
  examples?: ProfileGeneratorExample[];
}

export function ProfileGeneratorPreview({
  onChoose,
  examples = profileGeneratorExamples,
  className,
  ...props
}: ProfileGeneratorPreviewProps) {
  return (
    <div
      className={clsx(
        "border border-grid-border p-3 sm:p-4 rounded-lg overflow-hidden relative aspect-square",
        className
      )}
      {...props}
    >
      <div className="absolute inset-0 opacity-10 select-none pointer-events-none">
        <Image
          className="size-full object-cover"
          src="https://cdn.ocmaker.app/example/honkai-star-rail-oc-generated-3.webp"
        />
      </div>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <h3 className="text-lg font-bold uppercase tracking-wide text-base-content/80 mb-2">
          Quick starters
        </h3>
        <p className="text-base text-base-content/60 max-w-80">
          Click to load an example prompt and tweak it before generating.
        </p>
      </div>
    </div>
  );
}
