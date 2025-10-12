import { parseMarkdown } from "~/.server/libs/markdown";

import { Legal } from "~/components/pages/legal";
import { createCanonical } from "~/utils/meta";
import type { Route } from "./+types/route";
import content from "./content.md?raw";

export const meta: Route.MetaFunction = ({ matches }) => {
  return [
    { title: "Privacy Policy - OC Maker" },
    {
      name: "description",
      content:
        "Learn how OC Maker collects, uses and protects your personal data. Your privacy is important to us—read our policy to understand your rights and our practices.",
    },
    createCanonical("/legal/privacy", matches[0].loaderData.DOMAIN),
  ];
};

export const loader = (_: Route.LoaderArgs) => {
  const { node } = parseMarkdown(content);
  return { node };
};

export default function Page({ loaderData: { node } }: Route.ComponentProps) {
  return <Legal node={node} />;
}
