import { clsx } from "clsx";
import { Image } from "~/components/common";

type LogoSize = "sm" | "base" | "lg";

interface LogoProps extends React.ComponentProps<"div"> {
  size?: LogoSize;
  iconSize?: LogoSize;
}

export const Logo = ({
  size = "base",
  iconSize,
  className,
  ...rest
}: LogoProps) => {
  const sizeStyles = {
    sm: {
      box: "w-6 h-6",
      text: "text-sm",
    },
    base: {
      box: "w-8 h-8",
      text: "text-lg",
    },
    lg: {
      box: "w-10 h-10",
      text: "text-xl",
    },
  };

  return (
    <div
      className={clsx("flex items-center gap-2 whitespace-nowrap", className)}
      {...rest}
    >
      <Image
        src="/assets/logo.webp"
        alt="Ghost Face AI Logo"
        className={clsx("object-contain", sizeStyles[iconSize ?? size].box)}
        proxy={false}
      />
      <div translate="no" className={clsx("font-bold", sizeStyles[size].text)}>
        <span className="text-primary">GhostFace</span> AI
      </div>
    </div>
  );
};
