import React from "react";
import { useRootLoader } from "~/root";

type WsrvPrimitive = string | number | boolean | undefined;
type WsrvParamValue = WsrvPrimitive | WsrvPrimitive[];

interface WsrvParams {
  [key: string]: WsrvParamValue;
}

interface ImageProps extends React.ComponentProps<"img"> {
  proxy?: boolean; // 是否使用 wsrv.nl 代理
  wsrv?: WsrvParams; // 传入 wsrv.nl 的参数
  enableSrcSet?: boolean; // 是否生成响应式 srcSet
}

const WSRV_ENDPOINT = "https://wsrv.nl/";
const DEFAULT_SRCSET_WIDTHS = [320, 480, 640, 768, 1024, 1280, 1536, 1920];

const parseWidth = (value: string | number): number | undefined => {
  if (typeof value === "number") {
    if (!Number.isFinite(value) || value <= 0) {
      return undefined;
    }
    return Math.round(value);
  }

  const trimmed = value.trim();
  if (!trimmed) {
    return undefined;
  }

  const parsed = Number.parseInt(trimmed, 10);
  if (Number.isNaN(parsed) || parsed <= 0) {
    return undefined;
  }

  return parsed;
};

const normalizeParamValue = (value: WsrvParamValue): string | undefined => {
  if (Array.isArray(value)) {
    for (let index = value.length - 1; index >= 0; index -= 1) {
      const candidate = normalizeParamValue(value[index] as WsrvParamValue);
      if (candidate !== undefined) {
        return candidate;
      }
    }
    return undefined;
  }

  if (value === undefined) {
    return undefined;
  }

  if (typeof value === "boolean") {
    return value ? "true" : "false";
  }

  if (typeof value === "number") {
    if (!Number.isFinite(value)) {
      return undefined;
    }
    return String(value);
  }

  const trimmed = value.trim();
  return trimmed === "" ? undefined : trimmed;
};

const resolveWidth = (
  value: WsrvParamValue | undefined
): number | undefined => {
  if (value === undefined) {
    return undefined;
  }

  if (Array.isArray(value)) {
    for (let index = value.length - 1; index >= 0; index -= 1) {
      const resolved = resolveWidth(value[index] as WsrvParamValue);
      if (resolved !== undefined) {
        return resolved;
      }
    }
    return undefined;
  }

  if (typeof value === "number" || typeof value === "string") {
    return parseWidth(value);
  }

  return undefined;
};

const buildProxyUrl = (
  input: string,
  params: WsrvParams | undefined,
  widthOverride: number | undefined
): string => {
  const url = new URL(WSRV_ENDPOINT);
  url.searchParams.set("url", input);

  if (!params) {
    if (widthOverride !== undefined) {
      url.searchParams.set("w", String(widthOverride));
    }
    return url.toString();
  }

  for (const [key, value] of Object.entries(params)) {
    if (value === undefined) {
      continue;
    }

    if (key === "w") {
      continue;
    }

    const normalized = normalizeParamValue(value);
    if (normalized !== undefined) {
      url.searchParams.set(key, normalized);
    }
  }

  if (widthOverride !== undefined) {
    url.searchParams.set("w", String(widthOverride));
  } else {
    const normalizedWidth = normalizeParamValue(params.w);
    if (normalizedWidth !== undefined) {
      url.searchParams.set("w", normalizedWidth);
    }
  }

  return url.toString();
};

export const Image = ({
  src,
  proxy = true,
  wsrv,
  enableSrcSet = false,
  ...rest
}: ImageProps) => {
  const { srcSet: srcSetProp, ...imgProps } = rest;
  const { DOMAIN } = useRootLoader() ?? {};

  let finalSrc = src;
  let computedSrcSet: string | undefined;

  if (typeof src === "string") {
    const isRemote = /^https:\/\//.test(src);
    const isAssets = src.startsWith("/");
    const canProxy = proxy && (isRemote || isAssets);

    let targetUrl: string | undefined;
    if (canProxy) {
      if (isRemote) {
        targetUrl = src;
      } else if (isAssets && import.meta.env.PROD && DOMAIN) {
        targetUrl = new URL(src, DOMAIN).toString();
      }
    }

    const shouldBuildSrcSet =
      enableSrcSet && canProxy && targetUrl !== undefined;

    if (shouldBuildSrcSet && targetUrl) {
      computedSrcSet = DEFAULT_SRCSET_WIDTHS.map((width) => {
        const url = buildProxyUrl(targetUrl, wsrv, width);
        return `${url} ${width}w`;
      }).join(", ");
    }

    const shouldBuildSrc =
      !computedSrcSet &&
      canProxy &&
      targetUrl !== undefined &&
      (isRemote || (isAssets && wsrv));

    if (shouldBuildSrc && targetUrl) {
      const fallbackWidth = resolveWidth(wsrv?.w);
      finalSrc = buildProxyUrl(targetUrl, wsrv, fallbackWidth);
    }
  }

  return (
    <img src={finalSrc} srcSet={srcSetProp ?? computedSrcSet} {...imgProps} />
  );
};
