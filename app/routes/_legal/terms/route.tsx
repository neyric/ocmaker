import { parseMarkdown } from "~/.server/libs/markdown";

import { Legal } from "~/components/pages/legal";
import { createCanonical } from "~/utils/meta";
import type { Route } from "./+types/route";
import content from "./content.md?raw";

export const meta: Route.MetaFunction = ({ matches }) => {
  return [
    { title: "Terms of Use - OC Maker" },
    {
      name: "description",
      content:
        "Review the Terms of Use for OC Maker, outlining the rules, rights, and responsibilities when using our AI-powered character creation platform.",
    },
    createCanonical("/legal/terms", matches[0].loaderData.DOMAIN),
  ];
};

export const loader = (_: Route.LoaderArgs) => {
  const { node } = parseMarkdown(content);
  return { node };
};

export default function Page({ loaderData: { node } }: Route.ComponentProps) {
  return <Legal node={node} />;
}
