import { cn } from "~/lib/utils";

interface GridSectionProps extends React.ComponentProps<"section"> {
  borderX?: boolean;
  borderY?: boolean;
  compact?: boolean;
  withPadding?: boolean;
}

export function GridSection({
  className,
  children,
  borderY = true,
  borderX = true,
  compact = false,
  withPadding = true,
  ...props
}: GridSectionProps) {
  return (
    <section
      className={cn(
        "grid-section relative overflow-clip border-grid-border [.grid-section_~_&]:border-t-0",
        { "border-y": borderY },
        className,
      )}
      {...props}
    >
      <div
        className={cn(
          "relative z-0 container border-grid-border",
          { "sm:border-x": borderX },
          { [compact ? "py-6 sm:px-6" : "py-12 sm:px-12"]: withPadding },
          { "!px-0": !withPadding },
        )}
      >
        {children}
      </div>
    </section>
  );
}
