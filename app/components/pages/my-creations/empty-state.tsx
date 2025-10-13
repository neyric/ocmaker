import type { ReactNode } from "react";
import { GridSection } from "~/components/ui/grid-section";

interface EmptyStateProps {
  title: string;
  description: string;
  action?: ReactNode;
}

export function EmptyState({ title, description, action }: EmptyStateProps) {
  return (
    <GridSection borderX={false} borderY={false}>
      <div className="mx-auto w-full max-w-3xl rounded-2xl border border-dashed border-base-content/20 bg-base-200/40 p-12 text-center">
        <h2 className="text-2xl font-semibold">{title}</h2>
        <p className="mt-3 text-base text-base-content/70">{description}</p>
        {action && <div className="mt-6">{action}</div>}
      </div>
    </GridSection>
  );
}
