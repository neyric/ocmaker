interface OGParams {
  url?: string;
  title?: string;
  description?: string;
  image?: string;
  siteName?: string;
}

export interface OGDescriptor {
  property: string;
  content: string;
}

export const createOpenGraphTags = (params: OGParams) => {
  const tags: OGDescriptor[] = [];

  if (params.url) {
    tags.push({ property: "og:url", content: params.url });
  }
  if (params.title) {
    tags.push({ property: "og:title", content: params.title });
  }
  if (params.description) {
    tags.push({ property: "og:description", content: params.description });
  }
  if (params.image) {
    tags.push({ property: "og:image", content: params.image });
  }
  if (params.siteName) {
    tags.push({ property: "og:site_name", content: params.siteName });
  }

  tags.push({ property: "og:type", content: "website" });

  return tags;
};

export const createTwitterTags = (params: OGParams) => {
  const tags: OGDescriptor[] = [];

  tags.push({ property: "twitter:card", content: "summary_large_image" });

  if (params.title) {
    tags.push({ property: "twitter:title", content: params.title });
  }
  if (params.description) {
    tags.push({ property: "twitter:description", content: params.description });
  }
  if (params.image) {
    tags.push({ property: "twitter:image", content: params.image });
  }
  if (params.url) {
    tags.push({ property: "twitter:url", content: params.url });
  }
  if (params.siteName) {
    tags.push({ property: "twitter:site", content: params.siteName });
  }

  return tags;
};

export const createSocialTags = (params: OGParams, domain: string) => {
  // params.image = !params.image
  //   ? new URL("/assets/og/imgvid.webp", domain).toString()
  //   : params.image;
  params.url =
    params.url && URL.canParse(params.url)
      ? params.url
      : new URL(params.url ?? "/", domain).toString();
  return [...createOpenGraphTags(params), ...createTwitterTags(params)];
};
