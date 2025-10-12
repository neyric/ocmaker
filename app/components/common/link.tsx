import { forwardRef, useEffect, useState } from "react";
import type { LinkProps, NavLinkProps } from "react-router";
import {
  Link as LinkComp,
  NavLink as NavLinkComp,
  useParams,
} from "react-router";

interface UseBaseLinkOptions {
  reloadDocument: LinkProps["reloadDocument"];
  target: LinkProps["target"];
}
const useBaseLink = ({ reloadDocument, target }: UseBaseLinkOptions) => {
  const [baseTarget, setBaseTarget] = useState(target);
  const [reload] = useState(reloadDocument ?? import.meta.env.PROD);

  useEffect(() => {
    if (baseTarget) return;
    if (window.self !== window.top) setBaseTarget("_blank");
  }, [baseTarget]);

  return { target: baseTarget, reloadDocument: reload };
};

interface UseToLinkOptions {
  to: LinkProps["to"];
  autoLang?: boolean;
}
const useToLink = ({ to, autoLang = false }: UseToLinkOptions) => {
  const params = useParams();
  const lang = params.lang;

  if (!autoLang) return to;
  if (typeof to !== "string") return to;
  if (!lang) return to;
  if (to.startsWith("http")) return to;
  if (to.startsWith("mailto")) return to;
  if (to.startsWith("#")) return to;
  if (to.startsWith("/legal")) return to;

  const newTo = `/${lang}${to}`;
  return newTo.endsWith("/") ? newTo.slice(0, -1) : newTo;
};

export const Link = forwardRef<
  HTMLAnchorElement,
  LinkProps & { autoLang?: boolean }
>(({ reloadDocument, target, autoLang, to, ...rest }, ref) => {
  const linkTo = useToLink({ to, autoLang });
  const base = useBaseLink({ reloadDocument, target });
  return <LinkComp ref={ref} to={linkTo} {...base} {...rest} />;
});

export const NavLink = forwardRef<
  HTMLAnchorElement,
  NavLinkProps & { autoLang?: boolean }
>(({ reloadDocument, target, autoLang, to, ...rest }, ref) => {
  const linkTo = useToLink({ to, autoLang });

  const base = useBaseLink({ reloadDocument, target });

  return <NavLinkComp ref={ref} to={linkTo} {...base} {...rest} />;
});
