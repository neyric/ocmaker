import React from "react";

type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

type HeadingProps<T extends HeadingLevel> = {
  order: T;
} & (T extends 1
  ? React.ComponentProps<"h1">
  : T extends 2
    ? React.ComponentProps<"h2">
    : T extends 3
      ? React.ComponentProps<"h3">
      : T extends 4
        ? React.ComponentProps<"h4">
        : T extends 5
          ? React.ComponentProps<"h5">
          : React.ComponentProps<"h6">);

export function Heading<T extends HeadingLevel>({
  order,
  children,
  ...props
}: HeadingProps<T>) {
  switch (order) {
    case 1:
      return <h1 {...props}>{children}</h1>;
    case 2:
      return <h2 {...props}>{children}</h2>;
    case 3:
      return <h3 {...props}>{children}</h3>;
    case 4:
      return <h4 {...props}>{children}</h4>;
    case 5:
      return <h5 {...props}>{children}</h5>;
    case 6:
      return <h6 {...props}>{children}</h6>;
    default:
      return <h1 {...props}>{children}</h1>;
  }
}
