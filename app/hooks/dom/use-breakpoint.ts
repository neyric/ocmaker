import { useEffect, useState } from "react";

// 基于 app.css 中 container 样式实际使用的断点
const breakpoints = {
  xs: 480, // 30rem ≈ 480px
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
} as const;

type Breakpoint = keyof typeof breakpoints;

export function useBreakpoint() {
  const [currentBreakpoint, setCurrentBreakpoint] = useState<Breakpoint>(() => {
    if (typeof window === "undefined") return "xs";
    return getCurrentBreakpoint(window.innerWidth);
  });

  useEffect(() => {
    const handleResize = () => {
      setCurrentBreakpoint(getCurrentBreakpoint(window.innerWidth));
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return [
    currentBreakpoint,
    {
      isMobile: currentBreakpoint === "xs" || currentBreakpoint === "sm",
      isXs: currentBreakpoint === "xs",
      isSm: currentBreakpoint === "sm",
      isMd: currentBreakpoint === "md",
      isLg: currentBreakpoint === "lg",
      isXl: currentBreakpoint === "xl",
    },
  ] as const;
}

function getCurrentBreakpoint(width: number): Breakpoint {
  if (width >= breakpoints.xl) return "xl";
  if (width >= breakpoints.lg) return "lg";
  if (width >= breakpoints.md) return "md";
  if (width >= breakpoints.sm) return "sm";
  return "xs";
}
