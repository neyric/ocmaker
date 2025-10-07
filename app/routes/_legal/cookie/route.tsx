import { parseMarkdown } from "~/.server/libs/markdown";

import { Legal } from "~/components/pages/legal";
import { createCanonical } from "~/utils/meta";
import type { Route } from "./+types/route";
import content from "./content.md?raw";

export const meta: Route.MetaFunction = ({ matches }) => {
  return [
    { title: "Política de Cookies - FotoProfissional" },
    {
      name: "description",
      content:
        "Descubra como o FotoProfissional usa cookies e tecnologias similares para melhorar sua experiência. Aprenda sobre suas escolhas em relação às configurações e consentimento de cookies.",
    },
    createCanonical("/legal/cookie", matches[0].data.DOMAIN),
  ];
};

export const loader = (_: Route.LoaderArgs) => {
  const { node } = parseMarkdown(content);
  return { node };
};

export default function Page({ loaderData: { node } }: Route.ComponentProps) {
  return <Legal node={node} />;
}
