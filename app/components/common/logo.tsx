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
      text: "text-sm mt-1",
    },
    base: {
      box: "w-8 h-8",
      text: "text-lg mt-1",
    },
    lg: {
      box: "w-10 h-10",
      text: "text-xl mt-1",
    },
  };

  return (
    <div
      className={clsx("flex items-center gap-2 whitespace-nowrap", className)}
      {...rest}
    >
      <Image
        src="/assets/logo.webp"
        alt="OC Maker Logo"
        className={clsx("object-contain", sizeStyles[iconSize ?? size].box)}
        wsrv={{ w: 72 }}
        enableSrcSet
      />
      <div
        translate="no"
        className={clsx("font-bold font-title", sizeStyles[size].text)}
      >
        OC Maker
      </div>
    </div>
  );
};
