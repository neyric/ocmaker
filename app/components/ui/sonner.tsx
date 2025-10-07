import { Toaster as Sonner, type ToasterProps } from "sonner";

const Toaster = ({
  theme,
  ...props
}: ToasterProps & { theme: "light" | "dark" }) => {
  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toast group"
      {...props}
    />
  );
};

export { Toaster };
