import { parseMarkdown } from "~/.server/libs/markdown";

import { Legal } from "~/components/pages/legal";
import { createCanonical } from "~/utils/meta";
import type { Route } from "./+types/route";
import content from "./content.md?raw";

export const meta: Route.MetaFunction = ({ matches }) => {
  return [
    { title: "Termos de Uso - FotoProfissional" },
    {
      name: "description",
      content:
        "Revise os Termos de Uso do FotoProfissional, descrevendo as regras, direitos e responsabilidades ao usar nossa plataforma de transformação de fotos com IA.",
    },
    createCanonical("/legal/terms", matches[0].data.DOMAIN),
  ];
};

export const loader = (_: Route.LoaderArgs) => {
  const { node } = parseMarkdown(content);
  return { node };
};

export default function Page({ loaderData: { node } }: Route.ComponentProps) {
  return <Legal node={node} />;
}
